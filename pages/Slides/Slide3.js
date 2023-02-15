// Slide1.js
import React, { useEffect, useRef } from "react";
import SeedPhraseGenerator from '../SeedPhraseGenerator'
import { gsap } from "gsap";
import SplitType from 'split-type'
import styles from '../../styles/Onboarding.module.scss'

const Slide3 = ({ currentSlide, handleNext }) => {
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
                <h6 className={styles.onboarding__overline}>3. Your SEED PHRASE</h6>
                <h1 ref={headingRef} className={styles.onboarding_header}><span>Your secure</span> <span>recovery phrase</span></h1>
                <p ref={paragraphRef}>The 12 word below are your recovery phrase. They are the only thing needed to access your wallet. A seedphrase can never be regenerated for the same wallet. Remember to write these down somewhere.</p>
            </div>
            <div className={styles.onboarding_form}>
                <SeedPhraseGenerator handleNext={handleNext} />

            </div>
        </div>

    );
};

export default Slide3;
