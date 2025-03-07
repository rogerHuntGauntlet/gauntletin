import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp, 
  Timestamp,
  DocumentData,
  writeBatch,
  FieldValue
} from 'firebase/firestore';
import { db } from './firebase';

// Types for Firestore data
interface Post {
  id?: string;
  userId: string;
  userName: string;
  userTitle: string;
  userAvatar: string | null;
  content: string;
  timestamp: Timestamp | FieldValue | null;
  timestampString?: string;
  likes: number;
  comments: number;
  likedBy?: string[];
}

interface Message {
  id?: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: Timestamp | null;
  isRead: boolean;
}

interface Conversation {
  id?: string;
  participants: string[];
  lastMessage: {
    text: string;
    timestamp: Timestamp | null;
    senderId: string;
  };
  updatedAt: Timestamp | null;
}

interface Job {
  id?: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: Timestamp | null;
  postedString?: string;
  description: string;
  skills: string[];
  savedBy?: string[];
  appliedBy?: string[];
}

// Posts Service
export const postsService = {
  // Get all posts
  getPosts: async (): Promise<Post[]> => {
    try {
      const postsQuery = query(
        collection(db, 'posts'),
        orderBy('timestamp', 'desc')
      );
      const snapshot = await getDocs(postsQuery);
      
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          timestampString: formatTimestamp(data.timestamp as Timestamp),
        } as Post;
      });
    } catch (error) {
      console.error('Error getting posts:', error);
      throw error;
    }
  },

  // Add a new post
  createPost: async (postData: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'likedBy'>): Promise<Post> => {
    try {
      const post = {
        ...postData,
        timestamp: serverTimestamp(),
        likes: 0,
        comments: 0,
        likedBy: [],
      };
      
      const docRef = await addDoc(collection(db, 'posts'), post);
      
      return {
        ...post,
        id: docRef.id,
        timestampString: 'Just now',
      };
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  // Like/unlike a post
  toggleLikePost: async (postId: string, userId: string): Promise<boolean> => {
    try {
      const postRef = doc(db, 'posts', postId);
      const postSnap = await getDoc(postRef);
      
      if (!postSnap.exists()) {
        throw new Error('Post not found');
      }
      
      const postData = postSnap.data() as Post;
      const likedBy = postData.likedBy || [];
      const isLiked = likedBy.includes(userId);
      
      // Toggle like status
      if (isLiked) {
        await updateDoc(postRef, {
          likes: postData.likes - 1,
          likedBy: likedBy.filter(id => id !== userId),
        });
        return false; // Not liked anymore
      } else {
        await updateDoc(postRef, {
          likes: postData.likes + 1,
          likedBy: [...likedBy, userId],
        });
        return true; // Liked now
      }
    } catch (error) {
      console.error('Error toggling post like:', error);
      throw error;
    }
  },

  // Get user's liked posts
  getLikedPosts: async (userId: string): Promise<string[]> => {
    try {
      const postsQuery = query(
        collection(db, 'posts'),
        where('likedBy', 'array-contains', userId)
      );
      const snapshot = await getDocs(postsQuery);
      
      return snapshot.docs.map(doc => doc.id);
    } catch (error) {
      console.error('Error getting liked posts:', error);
      throw error;
    }
  }
};

// Messages Service
export const messagesService = {
  // Get user conversations
  getConversations: async (userId: string): Promise<any[]> => {
    try {
      const conversationsQuery = query(
        collection(db, 'conversations'),
        where('participants', 'array-contains', userId),
        orderBy('updatedAt', 'desc')
      );
      const snapshot = await getDocs(conversationsQuery);
      
      return Promise.all(snapshot.docs.map(async doc => {
        const data = doc.data();
        // Get the other participant's info
        const otherParticipantId = data.participants.find((id: string) => id !== userId);
        const userDoc = await getDoc(docRef(db, 'users', otherParticipantId));
        const userData = userDoc.data() || {};
        
        // Count unread messages
        const unreadQuery = query(
          collection(db, 'messages'),
          where('conversationId', '==', doc.id),
          where('senderId', '==', otherParticipantId),
          where('isRead', '==', false)
        );
        const unreadSnapshot = await getDocs(unreadQuery);
        
        return {
          id: doc.id,
          user: {
            id: otherParticipantId,
            name: userData.displayName || 'User',
            avatar: userData.photoURL || null,
            title: userData.title || 'User at Gauntlet AI'
          },
          lastMessage: {
            text: data.lastMessage.text,
            timestamp: formatTimestamp(data.lastMessage.timestamp as Timestamp),
            isRead: true,
            sender: data.lastMessage.senderId
          },
          unread: unreadSnapshot.docs.length
        };
      }));
    } catch (error) {
      console.error('Error getting conversations:', error);
      throw error;
    }
  },

  // Get messages for a conversation
  getMessages: async (conversationId: string, userId: string): Promise<any[]> => {
    try {
      const messagesQuery = query(
        collection(db, 'messages'),
        where('conversationId', '==', conversationId),
        orderBy('timestamp', 'asc')
      );
      const snapshot = await getDocs(messagesQuery);
      
      // Mark messages as read
      const batchUpdate = writeBatch(db);
      snapshot.docs.forEach(document => {
        const data = document.data();
        if (data.senderId !== userId && !data.isRead) {
          batchUpdate.update(document.ref, { isRead: true });
        }
      });
      await batchUpdate.commit();
      
      return snapshot.docs.map(document => {
        const data = document.data();
        return {
          id: document.id,
          text: data.text,
          timestamp: formatTimestamp(data.timestamp as Timestamp),
          sender: data.senderId,
          isSelf: data.senderId === userId
        };
      });
    } catch (error) {
      console.error('Error getting messages:', error);
      throw error;
    }
  },

  // Send a message
  sendMessage: async (conversationId: string, senderId: string, receiverId: string, text: string): Promise<any> => {
    try {
      let convoId = conversationId;
      
      // If no conversation exists, create one
      if (!convoId) {
        const conversationRef = await addDoc(collection(db, 'conversations'), {
          participants: [senderId, receiverId],
          lastMessage: {
            text,
            timestamp: serverTimestamp(),
            senderId
          },
          updatedAt: serverTimestamp()
        });
        convoId = conversationRef.id;
      } else {
        // Update existing conversation
        const conversationRef = doc(db, 'conversations', convoId);
        await updateDoc(conversationRef, {
          lastMessage: {
            text,
            timestamp: serverTimestamp(),
            senderId
          },
          updatedAt: serverTimestamp()
        });
      }
      
      // Add the message
      const messageRef = await addDoc(collection(db, 'messages'), {
        conversationId: convoId,
        senderId,
        text,
        timestamp: serverTimestamp(),
        isRead: false
      });
      
      return {
        id: messageRef.id,
        text,
        timestamp: 'Just now',
        sender: senderId,
        isSelf: true
      };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
};

// Jobs Service
export const jobsService = {
  // Get all jobs
  getJobs: async (): Promise<Job[]> => {
    try {
      const jobsQuery = query(
        collection(db, 'jobs'),
        orderBy('posted', 'desc')
      );
      const snapshot = await getDocs(jobsQuery);
      
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          postedString: formatTimestamp(data.posted as Timestamp),
        } as Job;
      });
    } catch (error) {
      console.error('Error getting jobs:', error);
      throw error;
    }
  },

  // Save/unsave a job
  toggleSaveJob: async (jobId: string, userId: string): Promise<boolean> => {
    try {
      const jobRef = doc(db, 'jobs', jobId);
      const jobSnap = await getDoc(jobRef);
      
      if (!jobSnap.exists()) {
        throw new Error('Job not found');
      }
      
      const jobData = jobSnap.data() as Job;
      const savedBy = jobData.savedBy || [];
      const isSaved = savedBy.includes(userId);
      
      // Toggle saved status
      if (isSaved) {
        await updateDoc(jobRef, {
          savedBy: savedBy.filter(id => id !== userId),
        });
        return false; // Not saved anymore
      } else {
        await updateDoc(jobRef, {
          savedBy: [...savedBy, userId],
        });
        return true; // Saved now
      }
    } catch (error) {
      console.error('Error toggling job save:', error);
      throw error;
    }
  },

  // Apply for a job
  applyForJob: async (jobId: string, userId: string): Promise<boolean> => {
    try {
      const jobRef = doc(db, 'jobs', jobId);
      const jobSnap = await getDoc(jobRef);
      
      if (!jobSnap.exists()) {
        throw new Error('Job not found');
      }
      
      const jobData = jobSnap.data() as Job;
      const appliedBy = jobData.appliedBy || [];
      
      // Check if already applied
      if (appliedBy.includes(userId)) {
        return false; // Already applied
      }
      
      // Add to applied list
      await updateDoc(jobRef, {
        appliedBy: [...appliedBy, userId],
      });
      return true; // Applied successfully
    } catch (error) {
      console.error('Error applying for job:', error);
      throw error;
    }
  },

  // Get user's saved jobs
  getSavedJobs: async (userId: string): Promise<string[]> => {
    try {
      const jobsQuery = query(
        collection(db, 'jobs'),
        where('savedBy', 'array-contains', userId)
      );
      const snapshot = await getDocs(jobsQuery);
      
      return snapshot.docs.map(doc => doc.id);
    } catch (error) {
      console.error('Error getting saved jobs:', error);
      throw error;
    }
  },

  // Get user's applied jobs
  getAppliedJobs: async (userId: string): Promise<string[]> => {
    try {
      const jobsQuery = query(
        collection(db, 'jobs'),
        where('appliedBy', 'array-contains', userId)
      );
      const snapshot = await getDocs(jobsQuery);
      
      return snapshot.docs.map(doc => doc.id);
    } catch (error) {
      console.error('Error getting applied jobs:', error);
      throw error;
    }
  }
};

// Helper function to format Firestore timestamps
function formatTimestamp(timestamp: Timestamp | null): string {
  if (!timestamp) return 'Just now';
  
  const now = new Date();
  const date = timestamp.toDate();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffSec < 60) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
}

// Helper reference function
const docRef = (db: any, collection: string, id: string) => doc(db, collection, id); 