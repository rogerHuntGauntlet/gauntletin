"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Navigation } from '@/components/shared/Navigation';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Avatar } from '@/components/shared/Avatar';
import { messagesService } from '@/lib/firestore';
import styles from './Messaging.module.css';

// Mock data for conversations as fallback
const MOCK_CONVERSATIONS = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'Sarah Johnson',
      avatar: null,
      title: 'Product Manager at Gauntlet AI'
    },
    lastMessage: {
      text: 'Looking forward to our meeting tomorrow!',
      timestamp: '10:23 AM',
      isRead: true,
      sender: 'user1'
    },
    unread: 0
  },
  {
    id: '2',
    user: {
      id: 'user2',
      name: 'Michael Chen',
      avatar: null,
      title: 'Software Engineer at Gauntlet AI'
    },
    lastMessage: {
      text: 'Can you share the specs for that new feature?',
      timestamp: 'Yesterday',
      isRead: false,
      sender: 'user2'
    },
    unread: 2
  },
  {
    id: '3',
    user: {
      id: 'user3',
      name: 'Alex Rodriguez',
      avatar: null,
      title: 'UX Designer at Gauntlet AI'
    },
    lastMessage: {
      text: 'I just sent you the design files!',
      timestamp: 'Yesterday',
      isRead: true,
      sender: 'user3'
    },
    unread: 0
  }
];

// Mock messages for conversation
const MOCK_MESSAGES: Record<string, Array<{
  id: string;
  text: string;
  timestamp: string;
  sender: string;
  isSelf: boolean;
}>> = {
  '1': [
    {
      id: 'm1',
      text: 'Hi there! How\'s the project coming along?',
      timestamp: '10:01 AM',
      sender: 'user1',
      isSelf: false
    },
    {
      id: 'm2',
      text: 'Hey Sarah! It\'s going well. We\'re on track to hit our milestone next week.',
      timestamp: '10:05 AM',
      sender: 'self',
      isSelf: true
    },
    {
      id: 'm3',
      text: 'That\'s great to hear! Do you need any resources from my end?',
      timestamp: '10:10 AM',
      sender: 'user1',
      isSelf: false
    },
    {
      id: 'm4',
      text: 'We\'re good for now, but I\'ll let you know if anything comes up.',
      timestamp: '10:15 AM',
      sender: 'self',
      isSelf: true
    },
    {
      id: 'm5',
      text: 'Perfect. Looking forward to our meeting tomorrow!',
      timestamp: '10:23 AM',
      sender: 'user1',
      isSelf: false
    }
  ]
};

// Chat conversation component
const Conversation = ({ 
  conversation, 
  isActive, 
  onClick 
}: { 
  conversation: typeof MOCK_CONVERSATIONS[0]; 
  isActive: boolean; 
  onClick: () => void;
}) => {
  return (
    <div 
      className={`${styles.conversation} ${isActive ? styles.activeConversation : ''}`}
      onClick={onClick}
    >
      <div className={styles.conversationAvatar}>
        <Avatar 
          src={conversation.user.avatar || undefined} 
          alt={conversation.user.name} 
          size="md" 
        />
        {conversation.unread > 0 && (
          <span className={styles.unreadBadge}>{conversation.unread}</span>
        )}
      </div>
      <div className={styles.conversationInfo}>
        <div className={styles.conversationHeader}>
          <h3 className={styles.conversationName}>{conversation.user.name}</h3>
          <span className={styles.conversationTime}>{conversation.lastMessage.timestamp}</span>
        </div>
        <p className={styles.conversationPreview}>
          {conversation.lastMessage.text}
        </p>
      </div>
    </div>
  );
};

// Message component
const Message = ({ message }: { message: any }) => {
  return (
    <div className={`${styles.message} ${message.isSelf ? styles.messageSelf : ''}`}>
      <div className={styles.messageContent}>
        <p className={styles.messageText}>{message.text}</p>
        <span className={styles.messageTime}>{message.timestamp}</span>
      </div>
    </div>
  );
};

export default function Messaging() {
  const { user } = useAuthContext();
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);
  const [activeConversation, setActiveConversation] = useState<string | null>('1');
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch conversations from Firestore
  useEffect(() => {
    async function fetchConversations() {
      if (!user?.uid) return;
      
      setIsLoading(true);
      try {
        // Fetch conversations from Firestore
        const fetchedConversations = await messagesService.getConversations(user.uid);
        if (fetchedConversations.length > 0) {
          setConversations(fetchedConversations);
          // Set the first conversation as active if none is selected
          if (!activeConversation) {
            setActiveConversation(fetchedConversations[0].id);
          }
        }
      } catch (err) {
        console.error('Error fetching conversations:', err);
        setError('Failed to load conversations. Please try again later.');
        // Fall back to mock data
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchConversations();
  }, [user, activeConversation]);

  // Fetch messages for active conversation
  useEffect(() => {
    async function fetchMessages() {
      if (!user?.uid || !activeConversation) return;
      
      try {
        // Fetch messages from Firestore
        const fetchedMessages = await messagesService.getMessages(activeConversation, user.uid);
        setMessages(fetchedMessages || []);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages. Please try again later.');
        // Fall back to mock data if available
        setMessages(MOCK_MESSAGES[activeConversation] || []);
      }
    }
    
    fetchMessages();
  }, [user, activeConversation]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeConversation || !user?.uid) return;

    try {
      // Find the receiver ID from the active conversation
      const activeConvo = conversations.find(c => c.id === activeConversation);
      if (!activeConvo) return;
      
      // Send message to Firestore
      const sentMessage = await messagesService.sendMessage(
        activeConversation,
        user.uid,
        activeConvo.user.id,
        newMessage
      );
      
      // Update UI
      setMessages(prev => [...prev, sentMessage]);
      
      // Update conversation in the list
      setConversations(prev =>
        prev.map(conv =>
          conv.id === activeConversation
            ? {
                ...conv,
                lastMessage: {
                  text: newMessage,
                  timestamp: 'Just now',
                  isRead: true,
                  sender: 'self'
                }
              }
            : conv
        )
      );
      
      // Clear input
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const createNewConversation = () => {
    // This would typically open a user selection modal
    alert('This feature would allow you to select a user to message');
  };

  return (
    <ProtectedRoute bypassAuth={true}>
      <div className={styles.messaging}>
        <Navigation />
        
        <main className={styles.main}>
          <div className={styles.container}>
            <Card className={styles.messagingCard}>
              <div className={styles.conversationsColumn}>
                <div className={styles.conversationsHeader}>
                  <h2 className={styles.conversationsTitle}>Messages</h2>
                  <button className={styles.newMessageButton} onClick={createNewConversation}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.newMessageIcon}>
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
                <div className={styles.conversationsSearch}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.searchIcon}>
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search messages"
                    className={styles.searchInput}
                  />
                </div>
                
                {isLoading ? (
                  <div className={styles.loadingContainer}>
                    <div className={styles.loadingSpinner}></div>
                    <p className={styles.loadingText}>Loading conversations...</p>
                  </div>
                ) : (
                  <div className={styles.conversationsList}>
                    {conversations.length > 0 ? (
                      conversations.map(conversation => (
                        <Conversation
                          key={conversation.id}
                          conversation={conversation}
                          isActive={activeConversation === conversation.id}
                          onClick={() => setActiveConversation(conversation.id)}
                        />
                      ))
                    ) : (
                      <div className={styles.emptyState}>
                        <p>No conversations yet</p>
                        <Button
                          label="Start a conversation"
                          variant="primary"
                          onClick={createNewConversation}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className={styles.chatColumn}>
                {activeConversation ? (
                  <>
                    <div className={styles.chatHeader}>
                      <div className={styles.chatUserInfo}>
                        <Avatar 
                          src={conversations.find(c => c.id === activeConversation)?.user.avatar || undefined} 
                          alt={conversations.find(c => c.id === activeConversation)?.user.name || ''} 
                          size="sm" 
                        />
                        <div>
                          <h3 className={styles.chatUserName}>
                            {conversations.find(c => c.id === activeConversation)?.user.name}
                          </h3>
                          <p className={styles.chatUserTitle}>
                            {conversations.find(c => c.id === activeConversation)?.user.title}
                          </p>
                        </div>
                      </div>
                      <div className={styles.chatActions}>
                        <button className={styles.chatAction}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.actionIcon}>
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className={styles.chatMessages}>
                      {error && (
                        <div className={styles.errorMessage}>
                          <p>{error}</p>
                          <Button 
                            label="Retry" 
                            variant="primary"
                            onClick={() => window.location.reload()}
                          />
                        </div>
                      )}
                      
                      {messages.length > 0 ? (
                        messages.map(message => (
                          <Message key={message.id} message={message} />
                        ))
                      ) : (
                        <div className={styles.emptyMessages}>
                          <p>No messages yet</p>
                          <p>Start the conversation with a message</p>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                    
                    <div className={styles.chatInputContainer}>
                      <textarea
                        className={styles.chatInput}
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                      ></textarea>
                      <div className={styles.chatInputActions}>
                        <button className={styles.inputAction}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.actionIcon}>
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                          </svg>
                        </button>
                        <button className={styles.inputAction}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.actionIcon}>
                            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                            <polyline points="13 2 13 9 20 9"></polyline>
                          </svg>
                        </button>
                        <button 
                          className={styles.sendButton} 
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.sendIcon}>
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className={styles.emptyChat}>
                    <div className={styles.emptyChatContent}>
                      <div className={styles.emptyChatIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.messageIcon}>
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </div>
                      <h3 className={styles.emptyChatTitle}>Your Messages</h3>
                      <p className={styles.emptyChatDescription}>
                        Select a conversation or start a new one
                      </p>
                      <Button 
                        label="New Message" 
                        variant="primary"
                        onClick={createNewConversation}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 