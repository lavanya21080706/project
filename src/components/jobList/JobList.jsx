import React from "react";
import styles from './JobList.module.css';
import pro from '../../assets/pro.png'
import profile from '../../assets/profile.png'

function JobList({ jobs }) {

    //To generate random numbers for when the job has been posted as there is no data provided in api
    function generateRandomNumber(limit) {
        const randomNumber = Math.random();
        const scaledNumber = randomNumber * limit;
        const randomInteger = Math.floor(scaledNumber);
        return randomInteger + 1;
      }

      //To capitalize the first alphabet
      function capitalize(words){
        const capitalizeWord = words.charAt(0).toUpperCase() + words.slice(1);
        return capitalizeWord;
      }

    return (
        <div className={styles.container}>
            <div className={styles.jobList}>
                {jobs.map(job => (
                    <div key={job.jdUid} className={styles.jobCard}>
                        <div className={styles.postBox}>
                            <div className={styles.postText}>
                                ⏳Posted {generateRandomNumber(20)} days ago
                            </div>
                        </div>
                        <div className={styles.companyInfo}>
                            <img src={job.logoUrl} alt={job.companyName} className={styles.companyLogo} />
                            <div className={styles.companyDet}>
                                <p className={styles.companyName}>{job.companyName}</p>
                                <p className={styles.role}>{capitalize(job.jobRole)}</p>
                                <p className={styles.location}>{capitalize(job.location)}</p>
                            </div>
                        </div>
                            <p className={styles.salary}>Estimated Salary:{job.minJdSalary} - {job.maxJdSalary} {job.salaryCurrencyCode} ✅</p>
                            <p className={styles.aboutCompany}>About Company:</p>
                            <p className={styles.about}>About Us</p>
                            <p className={styles.jobDesc}>{job.jobDetailsFromCompany}</p>               
                            <div className={styles.overlay}>
                                <p className={styles.showMore}>View job</p>
                            <p className={styles.exp}>Minimum Experience: </p>
                            <p className={styles.years}> {job.minExp} years</p>
                            <button className={styles.applyButton}>⚡Easy Apply</button>
                            <div className={styles.referal}>
                                <img src={profile} className={styles.profile}/> <img src={pro} className={styles.profile} />Unlock referal asks
                                </div>
                            </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default JobList