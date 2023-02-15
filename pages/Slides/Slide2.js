// Slide1.js
import React, { useEffect, useRef } from "react";
import HashGenerator from '../HashGenerator'
import { gsap } from "gsap";
import SplitType from 'split-type'
import styles from '../../styles/Onboarding.module.scss'

const Slide1 = ({ currentSlide, handleNext }) => {
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
                <h6 className={styles.onboarding__overline}>2. Setup Profile Picture</h6>
                <h1 ref={headingRef} className={styles.onboarding_header}><span>Setup your</span> <span>Unique Profile</span> <span>Picture</span></h1>
                <p ref={paragraphRef}>The authentication phrase and image at the top of this page were added by you the first time you visited this site. They are unique to you and can help recover your gaming wallet and the items you own.</p>
            </div>
            <div className={styles.onboarding_form}>
                <HashGenerator handleNext={handleNext} />
            </div>
        </div>

    );
};

export default Slide1;
