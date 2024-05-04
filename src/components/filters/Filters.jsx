import React, { useState, useEffect, useCallback } from 'react';
import styles from './Filters.module.css'
import down from '../../assets/downArrow.png';

function Filters({ applyFilters, jobs }) {
    const [showRoles, setShowRoles] = useState(false);
    const [showExp, setShowExp] = useState(false);
    const [showLoc, setShowLoc] = useState(false);
    const [showRem, setShowRem] = useState(false);
    const [showPay, setShowPay] = useState(false);
    const [categories, setCategories] = useState(null);
    const [filters, setFilters] = useState({
        minExperience: 0,
        companyName: '',
        location: '',
        role: '',
        minBasePay: '',
        remote: false
    });
    const [filteredRoles, setFilteredRoles] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [expOptions, setExpOptions] = useState([]);
    const [salaryOptions, setSalaryOptions] = useState([]);
    const memoizedApplyFilters = useCallback(applyFilters, []);



    useEffect(() => {
        memoizedApplyFilters(filters);
    }, [filters, memoizedApplyFilters]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const categoriesData = {
                    role: [...new Set(jobs.map(job => job.jobRole))],
                    companyName: [...new Set(jobs.map(job => job.companyName))],
                    location: [...new Set(jobs.map(job => job.location))],
                    minBasePay: [...new Set(jobs.map(job => job.minJdSalary))],
                };
                // Sort minimum base pay salary options in ascending order
                const sortedSalaryOptions = categoriesData.minBasePay.sort((a, b) => a - b);
                setSalaryOptions(sortedSalaryOptions);
                //   setCategories(categoriesData);
                setCategories(categoriesData); // Set categories after fetching jobs
            } catch (error) {
                console.error('Error fetching job data:', error);
            }
        };

        fetchJobs();
    }, [jobs]);



    useEffect(() => {
        if (categories) {
            setFilteredRoles(categories.role);
            setFilteredLocations(categories.location);
        }
    }, [categories]);

    useEffect(() => {
        const experienceOptions = Array.from({ length: 10 }, (_, i) => i + 1);
        setExpOptions(experienceOptions);
    }, []);

    //Function to handle visibility of DropDown
    const handleDropdown = (name) => {

        switch (name) {
            case "roles":
                setShowRoles(!showRoles)
                break;
            case "exp":
                setShowExp(!showExp)
                break;
            case "loc":
                setShowLoc(!showLoc)
                break;
            case "rem":
                setShowRem(!showRem)
                break;
            case "pay":
                setShowPay(!showPay)
                break;
        }
    }

    const handleRemoteSelection = (isRemote) => {
        setFilters({ ...filters, remote: isRemote });
        setShowRem(false);
        if (!isRemote) {
            // Filter out "Remote" location if on-site is selected
            const filtered = categories.location.filter(loc => loc.toLowerCase() !== 'remote');
            setFilteredLocations(filtered);
            applyFilters({ ...filters, location: '' });
        } else {
            // If "Remote" is selected, filter jobs for remote locations
            applyFilters({ ...filters, location: 'Remote' });
        }
    };

    const handleRoleSelection = (role) => {
        const newRole = role !== filters.role ? role : ''; // Reset role if already selected
        setFilters({ ...filters, role: newRole });
        setShowRoles(false);
        applyFilters({ ...filters, role: newRole });
    };

    const handleInputChange = (e, name) => {
        const { value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
        applyFilters({
            ...filters,
            [name]: value
        });
    };

    // Function to handle selection of experience option
    const handleExperienceSelection = (option) => {
        setFilters({ ...filters, minExperience: option });
        console.log("Filters after experience selection:", { ...filters, minExperience: option }); // Log current filters
        setShowExp(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.roleBox}>
                <input
                    type="text"
                    placeholder='Roles'
                    className={styles.input}
                    value={filters.role}
                    onChange={(e) => handleInputChange(e, 'role')}
                    onFocus={() => handleDropdown("roles")}
                />
                <span> | </span>
                <img src={down} className={styles.down} onClick={() => handleDropdown("roles")} />
                {showRoles && (
                    <div className={styles.dropDown}>
                        {filteredRoles.map((role, index) => (
                            <span key={index} className={styles.options} onClick={() => handleRoleSelection(role)}>{role}</span>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.expBox}>
                <input
                    type="text"
                    placeholder='Experience'
                    className={styles.input}
                    value={filters.minExperience || ''}
                    onChange={() => handleDropdown("exp")}
                    onFocus={() => handleDropdown("exp")}
                />
                <span> | </span>
                <img src={down} className={styles.down} onClick={() => handleDropdown("exp")} />
                {showExp && (
                    <div className={styles.dropDown}>
                        {expOptions.map((option, index) => (
                            <span key={index} className={styles.options} onClick={() => handleExperienceSelection(option)}>{option}</span>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.locBox}>
                <input
                    type="text"
                    placeholder='Location'
                    className={styles.input}
                    value={filters.location}
                    onChange={(e) => handleInputChange(e, 'location')}
                    onFocus={() => handleDropdown("loc")}
                />
                <span> | </span>
                <img src={down} className={styles.down} onClick={() => handleDropdown("loc")} />
                {showLoc && (
                    <div className={styles.dropDown}>
                        {filteredLocations.map((location, index) => (
                            <span key={index} className={styles.options} onClick={() => handleInputChange({ target: { value: location } }, 'location')}>{location}</span>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.remBox}>
                <input
                    type="text"
                    placeholder='Remote'
                    className={styles.input}
                    onChange={() => handleDropdown("rem")}
                    onFocus={() => handleDropdown("rem")}
                />
                <span> | </span>
                <img src={down} className={styles.down} onClick={() => handleDropdown("rem")} />
                {showRem && (
                    <div className={styles.dropDown}>
                        <span className={styles.options} onClick={() => handleRemoteSelection(true)}>Remote</span>
                        <span className={styles.options} onClick={() => handleRemoteSelection(false)}>On-site</span>
                    </div>
                )}
            </div>
            <div className={styles.payBox}>
                <input
                    type="text"
                    placeholder='Minimum Base Pay Salary'
                    className={styles.input}
                    value={filters.minBasePay}
                    onChange={() => handleDropdown("pay")}
                    onFocus={() => handleDropdown("pay")}
                />
                <span> | </span>
                <img src={down} className={styles.down} onClick={() => setShowPay(!showPay)} />
                {showPay && (
                    <div className={styles.dropDown}>
                        {salaryOptions.map((option, index) => (
                            <span key={index} className={styles.options} onClick={() => handleInputChange({ target: { value: option } }, 'minBasePay')}>{option}USD</span>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.name}>
                <input
                    type="text"
                    placeholder="Search Company Name"
                    className={styles.input}
                    value={filters.companyName}
                    onChange={(e) => handleInputChange(e, 'companyName')}
                />
            </div>
        </div>
    );
};

export default Filters;


