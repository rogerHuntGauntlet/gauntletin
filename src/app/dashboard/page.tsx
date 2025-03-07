"use client";

import React from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Navigation } from '@/components/shared/Navigation';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Avatar } from '@/components/shared/Avatar';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { user } = useAuthContext();
  
  return (
    <ProtectedRoute>
      <div className={styles.dashboard}>
        <Navigation />
        
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.leftColumn}>
              <Card variant="profile" className={styles.profileCard}>
                <div className={styles.profileCover}>
                  <div className={styles.profileAvatarContainer}>
                    <Avatar 
                      src={user?.photoURL || undefined} 
                      alt={user?.displayName || user?.email || 'User'} 
                      size="lg" 
                    />
                  </div>
                </div>
                <div className={styles.profileInfo}>
                  <h2 className={styles.profileName}>
                    {user?.displayName || user?.email?.split('@')[0] || 'User'}
                  </h2>
                  <p className={styles.profileHeadline}>
                    Software Engineer at Gauntlet AI
                  </p>
                  <div className={styles.profileStats}>
                    <div className={styles.profileStat}>
                      <span className={styles.statLabel}>Profile views</span>
                      <span className={styles.statValue}>142</span>
                    </div>
                    <div className={styles.profileStat}>
                      <span className={styles.statLabel}>Connections</span>
                      <span className={styles.statValue}>48</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className={styles.centerColumn}>
              <Card className={styles.createPostCard}>
                <div className={styles.createPostHeader}>
                  <Avatar 
                    src={user?.photoURL || undefined} 
                    alt={user?.displayName || user?.email || 'User'} 
                    size="sm" 
                  />
                  <Button 
                    label="Start a post" 
                    variant="secondary" 
                    fullWidth 
                    className={styles.createPostButton}
                  />
                </div>
                <div className={styles.createPostActions}>
                  <button className={styles.postAction}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.actionIcon}>
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <span>Photo</span>
                  </button>
                  <button className={styles.postAction}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.actionIcon}>
                      <polygon points="23 7 16 12 23 17 23 7"></polygon>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                    </svg>
                    <span>Video</span>
                  </button>
                  <button className={styles.postAction}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.actionIcon}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>Event</span>
                  </button>
                  <button className={styles.postAction}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.actionIcon}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <span>Article</span>
                  </button>
                </div>
              </Card>
              
              <div className={styles.feedDivider}>
                <span className={styles.dividerText}>Recent posts</span>
              </div>
              
              <Card className={styles.feedCard}>
                <div className={styles.feedHeader}>
                  <Avatar 
                    src="/images/sample-user.jpg" 
                    alt="Jane Doe" 
                    size="sm" 
                  />
                  <div className={styles.feedAuthor}>
                    <h3 className={styles.authorName}>Jane Doe</h3>
                    <p className={styles.authorHeadline}>Product Manager at Gauntlet AI</p>
                    <p className={styles.postTime}>2h ago</p>
                  </div>
                </div>
                <div className={styles.feedContent}>
                  <p>Excited to announce that we&apos;ve just launched our new AI-powered feature! Check it out and let me know what you think.</p>
                </div>
                <div className={styles.feedActions}>
                  <button className={styles.feedAction}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.actionIcon}>
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                    <span>Like</span>
                  </button>
                  <button className={styles.feedAction}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.actionIcon}>
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>Comment</span>
                  </button>
                  <button className={styles.feedAction}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.actionIcon}>
                      <circle cx="18" cy="5" r="3"></circle>
                      <circle cx="6" cy="12" r="3"></circle>
                      <circle cx="18" cy="19" r="3"></circle>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                    <span>Share</span>
                  </button>
                </div>
              </Card>
            </div>
            
            <div className={styles.rightColumn}>
              <Card className={styles.newsCard}>
                <h3 className={styles.newsTitle}>Gauntlet AI News</h3>
                <ul className={styles.newsList}>
                  <li className={styles.newsItem}>
                    <div className={styles.newsDot}></div>
                    <div>
                      <p className={styles.newsHeadline}>New AI model released</p>
                      <p className={styles.newsTime}>2d ago • 1,284 readers</p>
                    </div>
                  </li>
                  <li className={styles.newsItem}>
                    <div className={styles.newsDot}></div>
                    <div>
                      <p className={styles.newsHeadline}>Quarterly results exceed expectations</p>
                      <p className={styles.newsTime}>3d ago • 2,567 readers</p>
                    </div>
                  </li>
                  <li className={styles.newsItem}>
                    <div className={styles.newsDot}></div>
                    <div>
                      <p className={styles.newsHeadline}>Gauntlet AI opens new office in London</p>
                      <p className={styles.newsTime}>5d ago • 3,421 readers</p>
                    </div>
                  </li>
                </ul>
              </Card>
              
              <Card className={styles.jobsCard}>
                <h3 className={styles.jobsTitle}>Jobs for you</h3>
                <ul className={styles.jobsList}>
                  <li className={styles.jobItem}>
                    <h4 className={styles.jobTitle}>Senior Software Engineer</h4>
                    <p className={styles.jobCompany}>Gauntlet AI</p>
                    <p className={styles.jobLocation}>San Francisco, CA</p>
                    <Button label="Apply" variant="secondary" size="small" className={styles.jobButton} />
                  </li>
                  <li className={styles.jobItem}>
                    <h4 className={styles.jobTitle}>Product Designer</h4>
                    <p className={styles.jobCompany}>Gauntlet AI</p>
                    <p className={styles.jobLocation}>Remote</p>
                    <Button label="Apply" variant="secondary" size="small" className={styles.jobButton} />
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 