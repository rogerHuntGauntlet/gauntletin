"use client";

import React, { useState } from 'react';
// import { useAuthContext } from '@/context/AuthContext'; // Removed as it's not being used
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Navigation } from '@/components/shared/Navigation';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import styles from './Jobs.module.css';

// Mock data for jobs
const MOCK_JOBS = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'Gauntlet AI',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$150,000 - $180,000',
    posted: '2 days ago',
    description: 'We are looking for a Senior Software Engineer to join our team and help build cutting-edge AI products.',
    skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python']
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Gauntlet AI',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    posted: '3 days ago',
    description: 'Join our design team to create beautiful and intuitive user experiences for our AI products.',
    skills: ['UI/UX', 'Figma', 'Design Systems', 'Prototyping']
  },
  {
    id: '3',
    title: 'Data Scientist',
    company: 'Gauntlet AI',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$140,000 - $170,000',
    posted: '1 week ago',
    description: 'Help us build and improve our machine learning models and data pipelines.',
    skills: ['Python', 'Machine Learning', 'SQL', 'Data Analysis']
  },
  {
    id: '4',
    title: 'Frontend Developer',
    company: 'Gauntlet AI',
    location: 'Remote',
    type: 'Contract',
    salary: '$100,000 - $130,000',
    posted: '2 weeks ago',
    description: 'We are seeking a talented Frontend Developer to join our team and help build responsive web applications.',
    skills: ['JavaScript', 'React', 'CSS', 'HTML']
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'Gauntlet AI',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$130,000 - $160,000',
    posted: '3 weeks ago',
    description: 'Join our infrastructure team to help build and maintain our cloud infrastructure and CI/CD pipelines.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD']
  }
];

// Mock data for saved jobs
const MOCK_SAVED_JOBS = ['1', '3'];

// Mock data for applied jobs
const MOCK_APPLIED_JOBS = ['2'];

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
  skills: string[];
  isSaved: boolean;
  isApplied: boolean;
  onSave: (id: string) => void;
  onApply: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  company,
  location,
  type,
  salary,
  posted,
  description,
  skills,
  isSaved,
  isApplied,
  onSave,
  onApply
}) => {
  return (
    <Card variant="job" className={styles.jobCard}>
      <div className={styles.jobHeader}>
        <div className={styles.jobCompanyLogo}>
          <span>G</span>
        </div>
        <div className={styles.jobInfo}>
          <h3 className={styles.jobTitle}>{title}</h3>
          <p className={styles.jobCompany}>{company}</p>
          <p className={styles.jobMeta}>
            {location} • {type} • {posted}
          </p>
          <p className={styles.jobSalary}>{salary}</p>
        </div>
      </div>
      
      <div className={styles.jobDescription}>
        <p>{description}</p>
      </div>
      
      <div className={styles.jobSkills}>
        {skills.map((skill, index) => (
          <span key={index} className={styles.skillTag}>{skill}</span>
        ))}
      </div>
      
      <div className={styles.jobActions}>
        {isApplied ? (
          <Button 
            label="Applied" 
            variant="primary" 
            disabled 
            className={styles.appliedButton}
          />
        ) : (
          <Button 
            label="Apply Now" 
            variant="primary" 
            onClick={() => onApply(id)} 
            className={styles.applyButton}
          />
        )}
        
        <Button 
          label={isSaved ? "Saved" : "Save"} 
          variant="secondary" 
          onClick={() => onSave(id)} 
          className={styles.saveButton}
        />
      </div>
    </Card>
  );
};

export default function Jobs() {
  // const { user } = useAuthContext(); // Removed as it's not being used
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [savedJobs, setSavedJobs] = useState<string[]>(MOCK_SAVED_JOBS);
  const [appliedJobs, setAppliedJobs] = useState<string[]>(MOCK_APPLIED_JOBS);
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    datePosted: ''
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSaveJob = (id: string) => {
    if (savedJobs.includes(id)) {
      setSavedJobs(savedJobs.filter(jobId => jobId !== id));
    } else {
      setSavedJobs([...savedJobs, id]);
    }
  };

  const handleApplyJob = (id: string) => {
    if (!appliedJobs.includes(id)) {
      setAppliedJobs([...appliedJobs, id]);
    }
  };

  const filteredJobs = MOCK_JOBS.filter(job => {
    // Search query filter
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Tab filter
    const matchesTab = 
      (activeTab === 'all') ||
      (activeTab === 'saved' && savedJobs.includes(job.id)) ||
      (activeTab === 'applied' && appliedJobs.includes(job.id));
    
    // Additional filters
    const matchesLocation = !filters.location || job.location.includes(filters.location);
    const matchesJobType = !filters.jobType || job.type === filters.jobType;
    
    // Date posted filter would be implemented with actual date comparison
    // This is a simplified version
    const matchesDatePosted = !filters.datePosted || true;
    
    return matchesSearch && matchesTab && matchesLocation && matchesJobType && matchesDatePosted;
  });

  return (
    <ProtectedRoute bypassAuth={true}>
      <div className={styles.jobs}>
        <Navigation />
        
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.sidebar}>
              <Card className={styles.filtersCard}>
                <h2 className={styles.filtersTitle}>Job Search</h2>
                
                <div className={styles.searchContainer}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.searchIcon}>
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search jobs"
                    value={searchQuery}
                    onChange={handleSearch}
                    className={styles.searchInput}
                  />
                </div>
                
                <div className={styles.filtersDivider}></div>
                
                <div className={styles.filterSection}>
                  <h3 className={styles.filterSectionTitle}>Filters</h3>
                  
                  <div className={styles.filterGroup}>
                    <label htmlFor="location" className={styles.filtersLabel}>Location</label>
                    <select
                      id="location"
                      name="location"
                      value={filters.location}
                      onChange={handleFilterChange}
                      className={styles.filtersSelect}
                    >
                      <option value="">All Locations</option>
                      <option value="San Francisco">San Francisco</option>
                      <option value="Remote">Remote</option>
                      <option value="New York">New York</option>
                      <option value="Seattle">Seattle</option>
                    </select>
                  </div>
                  
                  <div className={styles.filterGroup}>
                    <label htmlFor="jobType" className={styles.filtersLabel}>Job Type</label>
                    <select
                      id="jobType"
                      name="jobType"
                      value={filters.jobType}
                      onChange={handleFilterChange}
                      className={styles.filtersSelect}
                    >
                      <option value="">All Types</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  
                  <div className={styles.filterGroup}>
                    <label htmlFor="datePosted" className={styles.filtersLabel}>Date Posted</label>
                    <select
                      id="datePosted"
                      name="datePosted"
                      value={filters.datePosted}
                      onChange={handleFilterChange}
                      className={styles.filtersSelect}
                    >
                      <option value="">Any Time</option>
                      <option value="today">Today</option>
                      <option value="week">Past Week</option>
                      <option value="month">Past Month</option>
                    </select>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className={styles.content}>
              <div className={styles.tabsContainer}>
                <button 
                  className={`${styles.tab} ${activeTab === 'all' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('all')}
                >
                  All Jobs
                </button>
                <button 
                  className={`${styles.tab} ${activeTab === 'saved' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('saved')}
                >
                  Saved Jobs ({savedJobs.length})
                </button>
                <button 
                  className={`${styles.tab} ${activeTab === 'applied' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('applied')}
                >
                  Applied Jobs ({appliedJobs.length})
                </button>
              </div>
              
              <div className={styles.jobsContainer}>
                <div className={styles.jobsHeader}>
                  <h2 className={styles.jobsTitle}>
                    {activeTab === 'all' && 'All Jobs'}
                    {activeTab === 'saved' && 'Saved Jobs'}
                    {activeTab === 'applied' && 'Applied Jobs'}
                  </h2>
                  <p className={styles.jobsCount}>{filteredJobs.length} jobs found</p>
                </div>
                
                <div className={styles.jobsList}>
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                      <JobCard
                        key={job.id}
                        id={job.id}
                        title={job.title}
                        company={job.company}
                        location={job.location}
                        type={job.type}
                        salary={job.salary}
                        posted={job.posted}
                        description={job.description}
                        skills={job.skills}
                        isSaved={savedJobs.includes(job.id)}
                        isApplied={appliedJobs.includes(job.id)}
                        onSave={handleSaveJob}
                        onApply={handleApplyJob}
                      />
                    ))
                  ) : (
                    <div className={styles.noJobsFound}>
                      <p>No jobs found matching your criteria.</p>
                      <p>Try adjusting your search or filters.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
} 