import React, { useState, useEffect } from 'react';
import { fetchData } from '../../api/FetchData';
import Filters from '../filters/Filters';
import JobList from '../jobList/JobList'
import styles from "./DashBoard.module.css"


function DashBoard(){ 
  // State for filters
  const [filters, setFilters] = useState({
    minExperience: 0,
    companyName: '',
    location: '',
    remote: false,
    techStack: '',
    role: '',
    minBasePay: 0
  });

  // State for job data
  const [jobs, setJobs] = useState([]);

  // Function to fetch job data
  const fetchJobs = async () => {
    try {
      const response = await fetchData(); 
      setJobs(response.jdList); 
    } catch (error) {
      console.error('Error fetching job data:', error);
    }
  };

  // Function to apply filters
  const applyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    fetchJobs(); // Fetch initial job data when component mounts
  }, []);

  useEffect(() => {
    fetchJobs(); // Refetch job data whenever filters change
  }, [filters]);

  return (
    <div className={styles.container}>
      <Filters applyFilters={applyFilters} />
      <JobList jobs={jobs} />
    </div>
  );
};

export default DashBoard;
