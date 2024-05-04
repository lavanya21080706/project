// import React, { useState,useEffect } from 'react';

// function Filters({ applyFilters }) {
//   const [role, setRole] = useState('');
//   const [location, setLocation] = useState('');
//   const [minSalary, setMinSalary] = useState(0);
//   const [experience, setExperience] = useState(0);
//   const [companyName, setCompanyName] = useState('');

// const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     switch (name) {
//       case 'role':
//         setRole(value);
//         break;
//       case 'location':
//         setLocation(value);
//         break;
//       case 'minSalary':
//         setMinSalary(value);
//         break;
//       case 'experience':
//         setExperience(value);
//         break;
//       case 'companyName':
//         setCompanyName(value);
//         break;
//       default:
//         break;
//     }

//     // Apply filters live
//     if (value === '') {
//       // If input is cleared, clear the results
//       applyFilters({
//         role: '',
//         location: '',
//         minBasePay: 0,
//         minExperience: 0,
//         companyName: ''
//       });
//     } else {
//       // If input is not empty, apply filters with new values
//       applyFilters({
//         role: name === 'role' ? value : role,
//         location: name === 'location' ? value : location,
//         minBasePay: name === 'minSalary' ? value : minSalary,
//         minExperience: name === 'experience' ? value : experience,
//         companyName: name === 'companyName' ? value : companyName
//       });
//     }
//   };


//   return (
//     <div>
//       <input
//         type="text"
//         name="role"
//         placeholder="Role"
//         value={role}
//         onChange={handleInputChange}
//       />
//       <input
//         type="text"
//         name="location"
//         placeholder="Location"
//         value={location}
//         onChange={handleInputChange}
//       />
//       <input
//         type="number"
//         name="minSalary"
//         placeholder="Minimum Salary"
//         value={minSalary}
//         onChange={handleInputChange}
//       />
//       <input
//         type="number"
//         name="experience"
//         placeholder="Minimum Experience"
//         value={experience}
//         onChange={handleInputChange}
//       />
//       <input
//         type="text"
//         name="companyName"
//         placeholder="Company Name"
//         value={companyName}
//         onChange={handleInputChange}
//       />
//     </div>
//   );
// }

// export default Filters;

import React, { useState, useEffect } from 'react';
import styles from './Filters.module.css'
import down from '../../assets/downArrow.png';

function Filters({ applyFilters }) {
    const [showRoles, setShowRoles] = useState(false);
    const [showExp, setShowExp] = useState(false);
    const [showLoc, setShowLoc] = useState(false);
    const [showRem, setShowRem] = useState(false);
    const [showPay, setShowPay] = useState(false);


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


    return (
        <div className={styles.container}>
            <div className={styles.roleBox}>
                <input type="text" placeholder='Roles' className={styles.input} onChange={()=>{handleDropdown("roles")}}/>
                <span> | </span>
                <img src={down} className={styles.down} onClick={()=>handleDropdown("roles")} />
                {showRoles && (
                    <div className={styles.dropDown}>
                        <span className={styles.options}>hello</span>
                        <span className={styles.options}>hello</span>
                        <span className={styles.options}>hello</span>
                    </div>
                )
                }
            </div>
            <div className={styles.expBox}>
                <input type="text" placeholder='Experience' className={styles.input} onChange={()=>{handleDropdown("exp")}}/>
                <span> | </span>
                <img src={down} className={styles.down} onClick={()=>handleDropdown("exp")} />
                {showExp && (
                    <div className={styles.dropDown}>
                        <span className={styles.options}>hello</span>
                        <span className={styles.options}>hello</span>
                        <span className={styles.options}>hello</span>
                    </div>
                )
                }
            </div>
            <div className={styles.locBox}>
                <input type="text" placeholder='Location' className={styles.input} onChange={()=>{handleDropdown("loc")}}/>
                <span> | </span>
                <img src={down} className={styles.down} onClick={()=>handleDropdown("loc")} />
                {showLoc && (
                    <div className={styles.dropDown}>
                        <span className={styles.options}>hello</span>
                        <span className={styles.options}>hello</span>
                        <span className={styles.options}>hello</span>
                    </div>
                )
                }
            </div>
            <div className={styles.remBox}>
                <input type="text" placeholder='Remote' className={styles.input} onChange={()=>{handleDropdown("rem")}}/>
                <span> | </span>
                <img src={down} className={styles.down} onClick={()=>handleDropdown("rem")} />
                {showRem && (
                    <div className={styles.dropDown}>
                        <span className={styles.options}>hello</span>
                        <span className={styles.options}>hello</span>
                        <span className={styles.options}>hello</span>
                    </div>
                )
                }
            </div>
            <div className={styles.payBox}>
                <input type="text" placeholder='Minimum Base Pay Salary' className={styles.input} onChange={()=>{handleDropdown("pay")}}/>
                <span> | </span>
                <img src={down} className={styles.down} onClick={()=>handleDropdown("pay")} />
                {showPay && (
                    <div className={styles.dropDown}>
                        <span className={styles.options}>hello</span>
                        <span className={styles.options}>hello</span>
                        <span className={styles.options}>hello</span>
                    </div>
                )
                }
            </div>
            <div className={styles.name}>
                <input type="text" placeholder='Search Company Name' className={styles.input} />
            </div>
        </div>
    );
};

export default Filters;



