// Slide1.js
import React, { useEffect, useRef, useState } from "react";
import SeedPhraseGenerator from '../SeedPhraseGenerator'
import { gsap } from "gsap";
import SplitType from 'split-type'
import styles from '../../styles/Onboarding.module.scss'
import { createHash } from 'crypto';

const HashGenerator = ({ handleNext, preSavedHash, setConfirmed }) => {
    const [textInput, setTextInput] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [imageInput, setImageInput] = useState(null);
    const [generatedHash, setGeneratedHash] = useState(null);
    const [savedSeed, setSavedSeed] = useState(null);

    const generateHash = () => {
        // Create a buffer from the concatenated text and image inputs
        const inputData = Buffer.from(textInput + imageInput);

        // Use the SHA256 algorithm to generate the hash
        const hash = createHash('sha256');
        hash.update(inputData);
        const generatedHash = hash.digest('hex');

        // Store the generated hash in state
        setGeneratedHash(generatedHash);
        if (preSavedHash == generatedHash) {
            setConfirmed(true);
        }
    };

    // Handle Image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImageInput(file)
        const reader = new FileReader();

        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
            generateHash();
        }
    };
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setPreviewImage(event.target.result);
            generateHash();
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };


    useEffect(() => {
        const storedSeed = localStorage.getItem('secureSeedPhrase');
        if (storedSeed) {
            setSavedSeed(storedSeed);
        }
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setTextInput(storedUsername);
        }
    }, []);

    return (
        <div>
            <div>
                <p>Your seed phrase:</p>
                <div className='grid grid-col-3'>
                    {savedSeed != null && savedSeed.split(",").map((word, index) => (
                        <div key={index}>
                            <span>{index + 1}</span>{word}</div>
                    ))}
                </div>
            </div>

            <button className='btn-primary mt-16' onClick={handleNext}>Continue To Game</button>
        </div>
    );
};

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
        }).from(paragraphRef.current.children, {
            duration: 1.5,
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
        <div className={styles.onboarding_container}>
            <div className={styles.onboarding_meta}>
                <h6 className={styles.onboarding__overline}>4. JUST ONE LAST STEP</h6>
                <h1 ref={headingRef} className={styles.onboarding_header}>
                    <span>Great Job!</span>
                </h1>
                <p ref={paragraphRef}>You can now continue to the game, but make sure you keep your Seed Phrase safe.</p>
            </div>
            <div className={styles.onboarding_form}>
                <HashGenerator preSavedHash={secureHash} handleNext={handleNext} setConfirmed={setConfirmed} />
            </div>
        </div>

    );
};

export default Slide1;
