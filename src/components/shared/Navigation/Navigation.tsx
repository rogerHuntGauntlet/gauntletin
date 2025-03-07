import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { Avatar } from '../Avatar';
import styles from './Navigation.module.css';

interface NavigationItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export const Navigation: React.FC = () => {
  const pathname = usePathname();
  const { user, signOut } = useAuthContext();
  
  // Navigation items
  const navigationItems: NavigationItem[] = [
    {
      label: 'Home',
      path: '/dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      )
    },
    {
      label: 'My Network',
      path: '/network',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      label: 'Jobs',
      path: '/jobs',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      )
    },
    {
      label: 'Messaging',
      path: '/messaging',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      )
    },
    {
      label: 'Notifications',
      path: '/notifications',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
      )
    }
  ];

  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/dashboard">
            <span className={styles.logoText}>GauntletIn</span>
          </Link>
        </div>
        
        <div className={styles.navItems}>
          {navigationItems.map((item) => (
            <Link 
              href={item.path} 
              key={item.path}
              className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
            >
              {item.icon}
              <span className={styles.navLabel}>{item.label}</span>
            </Link>
          ))}
        </div>
        
        <div className={styles.profile}>
          {user && (
            <Link href="/profile" className={styles.profileLink}>
              <Avatar 
                src={user.photoURL || undefined} 
                alt={user.displayName || user.email || 'User'} 
                size="sm" 
              />
              <span className={styles.profileLabel}>Me</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}; 