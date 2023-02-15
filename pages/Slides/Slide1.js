// Slide1.js
import React, { useState, useEffect, useRef } from "react";
import HashGenerator from '../HashGenerator'
import { gsap } from "gsap";
import SplitType from 'split-type'
import styles from '../../styles/Onboarding.module.scss'

function InputFields({ handleNext }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    useEffect(() => {
        // Load data from local storage on mount
        const savedUsername = localStorage.getItem('username');
        const savedPassword = localStorage.getItem('password');
        if (savedUsername) {
            setUsername(savedUsername);
        }
        if (savedPassword) {
            setPassword(savedPassword);
        }
    }, []);

    const handleUsernameChange = (event) => {
        const newUsername = event.target.value;
        // Validate username
        if (newUsername.length < 7) {
            setUsernameError('Username must be at least 7 characters long');
        } else {
            setUsernameError(null);
        }
        setUsername(newUsername);
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        // Validate password
        if (newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
        } else {
            setPasswordError(null);
        }
        setPassword(newPassword);
    };

    useEffect(() => {
        // Save data to local storage on change
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
    }, [username, password]);

    return (
        <div className={styles.formContainer}>
            <div className={styles.formField}>
                <label>
                    Username:

                </label>
                <input type="text" value={username} onChange={handleUsernameChange} />
                {usernameError && <div class={styles.formError}>{usernameError}</div>}
            </div>
            <div className={styles.formField}>
                <label>
                    Password:

                </label>
                <input type="password" value={password} onChange={handlePasswordChange} />
                {passwordError && <div class={styles.formError}>{passwordError}</div>}
            </div>
            <div className={styles.formField}>

                {!passwordError && !usernameError ?
                    <button className='btn-primary mt-16' onClick={handleNext}>Next</button>
                    :
                    <button className='btn-primary mt-16' disabled >Next</button>}
            </div>

        </div>
    );
}

const Slide1 = ({ currentSlide, handlePrev, handleNext }) => {
    const paragraphRef = useRef(null);
    const headingRef = useRef(null);

    useEffect(() => {
        const splitType = new SplitType(paragraphRef.current);
        const splitHeader = new SplitType(headingRef.current);
        splitType.split({ type: "lines" });
        splitHeader.split({ type: "lines" });
        var tl = gsap.timeline();
        tl.from(headingRef.current.children, {
            duration: 1,
            skewY: -15,
            opacity: 0,
            stagger: 0.1,
            ease: "power3.inOut"
        }).from(paragraphRef.current.children, {
            duration: 1.5,
            opacity: 0,
            stagger: 0.1,
            ease: "power3.inOut"
        });
    }, []);

    return (
        <div className={styles.onboarding_container}>
            <div className={styles.onboarding_meta}>
                <h6 className={styles.onboarding__overline}>1. Setup Profile</h6>
                <h1 ref={headingRef} className={styles.onboarding_header}><span>Setup your</span> <span>Balathazar Profile</span></h1>
                <p ref={paragraphRef}>
                    The authentication phrase and image at the top of this page were added by you the first time you visited this site. They are unique to you and can help recover your gaming wallet and the items you own.
                </p>
            </div>
            <div className={styles.onboarding_form}>
                <InputFields handleNext={handleNext} />

            </div>
        </div>

    );
};

export default Slide1;



