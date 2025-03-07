"use client";

import React, { useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Navigation } from '@/components/shared/Navigation';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Avatar } from '@/components/shared/Avatar';
import { TextField } from '@/components/shared/TextField';
import styles from './Network.module.css';

// Mock data for connections
const MOCK_CONNECTIONS = [
  {
    id: '1',
    name: 'Jane Doe',
    headline: 'Product Manager at Gauntlet AI',
    avatar: '/images/sample-user.jpg',
    mutualConnections: 12
  },
  {
    id: '2',
    name: 'John Smith',
    headline: 'Software Engineer at Gauntlet AI',
    avatar: undefined,
    mutualConnections: 8
  },
  {
    id: '3',
    name: 'Emily Johnson',
    headline: 'Data Scientist at Gauntlet AI',
    avatar: undefined,
    mutualConnections: 5
  },
  {
    id: '4',
    name: 'Michael Brown',
    headline: 'UX Designer at Gauntlet AI',
    avatar: undefined,
    mutualConnections: 3
  }
];

// Mock data for connection requests
const MOCK_REQUESTS = [
  {
    id: '5',
    name: 'Sarah Wilson',
    headline: 'Marketing Manager at Gauntlet AI',
    avatar: undefined,
    mutualConnections: 7
  },
  {
    id: '6',
    name: 'David Lee',
    headline: 'Frontend Developer at Gauntlet AI',
    avatar: undefined,
    mutualConnections: 4
  }
];

// Mock data for suggestions
const MOCK_SUGGESTIONS = [
  {
    id: '7',
    name: 'Alex Chen',
    headline: 'AI Researcher at Gauntlet AI',
    avatar: undefined,
    mutualConnections: 15
  },
  {
    id: '8',
    name: 'Jessica Taylor',
    headline: 'Product Designer at Gauntlet AI',
    avatar: undefined,
    mutualConnections: 9
  },
  {
    id: '9',
    name: 'Ryan Garcia',
    headline: 'Backend Engineer at Gauntlet AI',
    avatar: undefined,
    mutualConnections: 6
  },
  {
    id: '10',
    name: 'Olivia Martinez',
    headline: 'Data Engineer at Gauntlet AI',
    avatar: undefined,
    mutualConnections: 3
  }
];

interface ConnectionCardProps {
  name: string;
  headline: string;
  avatar?: string;
  mutualConnections: number;
  isPending?: boolean;
  isSuggestion?: boolean;
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({
  name,
  headline,
  avatar,
  mutualConnections,
  isPending = false,
  isSuggestion = false
}) => {
  return (
    <Card className={styles.connectionCard}>
      <div className={styles.connectionAvatar}>
        <Avatar 
          src={avatar} 
          alt={name} 
          size="lg" 
        />
      </div>
      <div className={styles.connectionInfo}>
        <h3 className={styles.connectionName}>{name}</h3>
        <p className={styles.connectionHeadline}>{headline}</p>
        <p className={styles.mutualConnections}>
          {mutualConnections} mutual connection{mutualConnections !== 1 ? 's' : ''}
        </p>
      </div>
      <div className={styles.connectionActions}>
        {isPending ? (
          <>
            <Button 
              label="Accept" 
              variant="primary" 
              size="small" 
              className={styles.acceptButton}
            />
            <Button 
              label="Ignore" 
              variant="secondary" 
              size="small" 
              className={styles.ignoreButton}
            />
          </>
        ) : isSuggestion ? (
          <Button 
            label="Connect" 
            variant="secondary" 
            size="small" 
            className={styles.connectButton}
          />
        ) : (
          <Button 
            label="Message" 
            variant="secondary" 
            size="small" 
            className={styles.messageButton}
          />
        )}
      </div>
    </Card>
  );
};

export default function Network() {
  const { user } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('connections');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredConnections = MOCK_CONNECTIONS.filter(connection => 
    connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.headline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <div className={styles.network}>
        <Navigation />
        
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.sidebar}>
              <Card className={styles.statsCard}>
                <h2 className={styles.statsTitle}>Your Network</h2>
                <ul className={styles.statsList}>
                  <li className={styles.statsItem}>
                    <span className={styles.statsLabel}>Connections</span>
                    <span className={styles.statsValue}>{MOCK_CONNECTIONS.length}</span>
                  </li>
                  <li className={styles.statsItem}>
                    <span className={styles.statsLabel}>Invitations</span>
                    <span className={styles.statsValue}>{MOCK_REQUESTS.length}</span>
                  </li>
                </ul>
                <div className={styles.statsDivider}></div>
                <ul className={styles.statsLinks}>
                  <li className={styles.statsLinkItem}>
                    <button 
                      className={`${styles.statsLink} ${activeTab === 'connections' ? styles.activeLink : ''}`}
                      onClick={() => setActiveTab('connections')}
                    >
                      Connections
                    </button>
                  </li>
                  <li className={styles.statsLinkItem}>
                    <button 
                      className={`${styles.statsLink} ${activeTab === 'pending' ? styles.activeLink : ''}`}
                      onClick={() => setActiveTab('pending')}
                    >
                      Pending Invitations
                    </button>
                  </li>
                  <li className={styles.statsLinkItem}>
                    <button 
                      className={`${styles.statsLink} ${activeTab === 'suggestions' ? styles.activeLink : ''}`}
                      onClick={() => setActiveTab('suggestions')}
                    >
                      People You May Know
                    </button>
                  </li>
                </ul>
              </Card>
            </div>
            
            <div className={styles.content}>
              <Card className={styles.searchCard}>
                <div className={styles.searchContainer}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.searchIcon}>
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search connections"
                    value={searchQuery}
                    onChange={handleSearch}
                    className={styles.searchInput}
                  />
                </div>
              </Card>
              
              <div className={styles.connectionsContainer}>
                <h2 className={styles.connectionsTitle}>
                  {activeTab === 'connections' && 'Your Connections'}
                  {activeTab === 'pending' && 'Pending Invitations'}
                  {activeTab === 'suggestions' && 'People You May Know'}
                </h2>
                
                <div className={styles.connectionsList}>
                  {activeTab === 'connections' && filteredConnections.map(connection => (
                    <ConnectionCard
                      key={connection.id}
                      name={connection.name}
                      headline={connection.headline}
                      avatar={connection.avatar}
                      mutualConnections={connection.mutualConnections}
                    />
                  ))}
                  
                  {activeTab === 'pending' && MOCK_REQUESTS.map(request => (
                    <ConnectionCard
                      key={request.id}
                      name={request.name}
                      headline={request.headline}
                      avatar={request.avatar}
                      mutualConnections={request.mutualConnections}
                      isPending
                    />
                  ))}
                  
                  {activeTab === 'suggestions' && MOCK_SUGGESTIONS.map(suggestion => (
                    <ConnectionCard
                      key={suggestion.id}
                      name={suggestion.name}
                      headline={suggestion.headline}
                      avatar={suggestion.avatar}
                      mutualConnections={suggestion.mutualConnections}
                      isSuggestion
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 