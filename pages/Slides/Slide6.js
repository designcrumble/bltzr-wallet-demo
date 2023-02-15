// Slide1.js
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitType from 'split-type'
import styles from '../../styles/Onboarding.module.scss'
import { createHash } from 'crypto';

const Slide1 = ({ currentSlide, handleNext }) => {
    const paragraphRef = useRef(null);
    const headingRef = useRef(null);
    const [secureHash, setSecureHash] = useState(null);
    const [confirmed, setConfirmed] = useState(false);

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
        });
    }, []);

    useEffect(() => {
        // Load data from local storage on mount
        const savedHash = localStorage.getItem('secureHash');
        if (savedHash) {
            setSecureHash(savedHash);
        }
    }, []);


    return (
        <div className={styles.loading}>
            <div className={styles.onboarding_meta}>
                <h6 className={styles.onboarding__overline}>Game Name</h6>
                <h1 ref={headingRef} className={styles.onboarding_header}>
                    <span>Loading...!</span>
                </h1>
            </div>
        </div>

    );
};

export default Slide1;
