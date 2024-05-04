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


  //Function to filter jobs based on current filters
  const filterJobs = () => {
    return jobs.filter(job => {
        return (
            job.minExp >= filters.minExperience &&
            job.companyName.toLowerCase().includes(filters.companyName.toLowerCase()) &&
            job.location.toLowerCase().includes(filters.location.toLowerCase()) &&
            job.jobRole.toLowerCase().includes(filters.role.toLowerCase()) &&
            (job.minJdSalary >= filters.minBasePay || job.maxJdSalary >= filters.minBasePay)
            // Add more conditions for other filters if needed
        );
    });
};



  // Function to apply filters
  const applyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    fetchJobs(); // Fetch initial job data when component mounts
  }, []);

  useEffect(() => {
    // Filter the jobs based on the current filters
    const filteredJobs = filterJobs();
    setJobs(filteredJobs);
  }, [filters]);

  return (
    <div className={styles.container}>
      <Filters applyFilters={applyFilters} jobs={jobs}/>

      <JobList jobs={jobs} />
    </div>
  );
};

export default DashBoard;
