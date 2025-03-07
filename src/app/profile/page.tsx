"use client";

import React, { useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Navigation } from '@/components/shared/Navigation';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Avatar } from '@/components/shared/Avatar';
import { TextField } from '@/components/shared/TextField';
import styles from './Profile.module.css';

export default function Profile() {
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    headline: 'Software Engineer at Gauntlet AI',
    about: 'Passionate software engineer with expertise in AI and machine learning. I love building products that make a difference.',
    experience: [
      {
        id: '1',
        title: 'Software Engineer',
        company: 'Gauntlet AI',
        location: 'San Francisco, CA',
        startDate: 'Jan 2022',
        endDate: 'Present',
        description: 'Working on cutting-edge AI products.'
      }
    ],
    education: [
      {
        id: '1',
        school: 'Stanford University',
        degree: 'M.S. Computer Science',
        startDate: 'Sep 2019',
        endDate: 'Jun 2021'
      }
    ],
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Machine Learning', 'AI']
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    setIsEditing(false);
  };

  return (
    <ProtectedRoute>
      <div className={styles.profile}>
        <Navigation />
        
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.profileHeader}>
              <Card className={styles.profileHeaderCard}>
                <div className={styles.coverPhoto}>
                  {/* Cover photo would go here */}
                </div>
                <div className={styles.profileInfo}>
                  <div className={styles.avatarContainer}>
                    <Avatar 
                      src={user?.photoURL || undefined} 
                      alt={user?.displayName || user?.email || 'User'} 
                      size="xl" 
                    />
                  </div>
                  <div className={styles.profileDetails}>
                    {isEditing ? (
                      <TextField
                        id="headline"
                        label="Headline"
                        value={profileData.headline}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    ) : (
                      <>
                        <h1 className={styles.profileName}>
                          {user?.displayName || user?.email?.split('@')[0] || 'User'}
                        </h1>
                        <p className={styles.profileHeadline}>{profileData.headline}</p>
                        <p className={styles.profileLocation}>San Francisco Bay Area</p>
                        <p className={styles.profileConnections}>48 connections</p>
                      </>
                    )}
                  </div>
                  <div className={styles.profileActions}>
                    {isEditing ? (
                      <Button 
                        label="Save" 
                        onClick={handleSave} 
                        variant="primary"
                      />
                    ) : (
                      <Button 
                        label="Edit Profile" 
                        onClick={handleEditToggle} 
                        variant="secondary"
                      />
                    )}
                  </div>
                </div>
              </Card>
            </div>
            
            <div className={styles.profileContent}>
              <div className={styles.mainColumn}>
                <Card className={styles.aboutCard}>
                  <h2 className={styles.sectionTitle}>About</h2>
                  {isEditing ? (
                    <TextField
                      id="about"
                      label="About"
                      value={profileData.about}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  ) : (
                    <p className={styles.aboutText}>{profileData.about}</p>
                  )}
                </Card>
                
                <Card className={styles.experienceCard}>
                  <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Experience</h2>
                    {!isEditing && (
                      <button className={styles.addButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.addIcon}>
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  <div className={styles.experienceList}>
                    {profileData.experience.map((exp) => (
                      <div key={exp.id} className={styles.experienceItem}>
                        <div className={styles.experienceIcon}>
                          <div className={styles.companyLogo}>
                            <span>G</span>
                          </div>
                        </div>
                        <div className={styles.experienceDetails}>
                          <h3 className={styles.experienceTitle}>{exp.title}</h3>
                          <p className={styles.experienceCompany}>{exp.company}</p>
                          <p className={styles.experienceDates}>
                            {exp.startDate} - {exp.endDate}
                          </p>
                          <p className={styles.experienceLocation}>{exp.location}</p>
                          <p className={styles.experienceDescription}>{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
                
                <Card className={styles.educationCard}>
                  <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Education</h2>
                    {!isEditing && (
                      <button className={styles.addButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.addIcon}>
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  <div className={styles.educationList}>
                    {profileData.education.map((edu) => (
                      <div key={edu.id} className={styles.educationItem}>
                        <div className={styles.educationIcon}>
                          <div className={styles.schoolLogo}>
                            <span>S</span>
                          </div>
                        </div>
                        <div className={styles.educationDetails}>
                          <h3 className={styles.educationSchool}>{edu.school}</h3>
                          <p className={styles.educationDegree}>{edu.degree}</p>
                          <p className={styles.educationDates}>
                            {edu.startDate} - {edu.endDate}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
                
                <Card className={styles.skillsCard}>
                  <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Skills</h2>
                    {!isEditing && (
                      <button className={styles.addButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.addIcon}>
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  <div className={styles.skillsList}>
                    {profileData.skills.map((skill, index) => (
                      <div key={index} className={styles.skillItem}>
                        <span className={styles.skillName}>{skill}</span>
                        <div className={styles.endorsements}>
                          <span className={styles.endorsementCount}>5</span>
                          <span className={styles.endorsementLabel}>endorsements</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
              
              <div className={styles.sideColumn}>
                <Card className={styles.networkCard}>
                  <h3 className={styles.networkTitle}>Your Network</h3>
                  <div className={styles.networkStats}>
                    <div className={styles.networkStat}>
                      <span className={styles.statValue}>48</span>
                      <span className={styles.statLabel}>Connections</span>
                    </div>
                    <div className={styles.networkStat}>
                      <span className={styles.statValue}>12</span>
                      <span className={styles.statLabel}>Mutual Connections</span>
                    </div>
                  </div>
                  <Button 
                    label="Grow your network" 
                    variant="secondary" 
                    fullWidth 
                    className={styles.networkButton}
                  />
                </Card>
                
                <Card className={styles.resourcesCard}>
                  <h3 className={styles.resourcesTitle}>Resources</h3>
                  <ul className={styles.resourcesList}>
                    <li className={styles.resourceItem}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.resourceIcon}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      <span>Creator mode</span>
                    </li>
                    <li className={styles.resourceItem}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.resourceIcon}>
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                      </svg>
                      <span>My items</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 