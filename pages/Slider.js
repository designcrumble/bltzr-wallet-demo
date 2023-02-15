import React, { useState, useEffect } from "react";
import { gsap, Power2, Power3, Back } from "gsap";
import Slide1 from "./Slides/Slide1";
import Slide2 from "./Slides/Slide2";
import Slide3 from "./Slides/Slide3";
import Slide4 from "./Slides/Slide4";
import Slide5 from "./Slides/Slide5";
import Slide6 from "./Slides/Slide6";

const Slider = ({ }) => {
    const [currentSlide, setCurrentSlide] = useState(1);
    const slides = [<Slide1 />, <Slide2 />, <Slide3 />, <Slide4 />, <Slide5 />, <Slide6 />];
    useEffect(() => {
        gsap.fromTo(
            ".slide",
            { x: "100%", opacity: 0 },
            { x: "0%", opacity: 1, duration: 1, ease: "power2.inOut" }
        );
    }, [currentSlide]);

    const prevSlide = () => {
        setCurrentSlide((currentSlide + slides.length - 1) % slides.length);
    };

    const nextSlide = () => {
        setCurrentSlide((currentSlide + 1) % slides.length);
    };
    const handlePrevClick = () => {
        setCurrentSlide(currentSlide - 1);
        gsap.to(`.slide-${currentSlide}`, {
            opacity: 0,
            duration: 0.5,
            display: "none",
        });
        gsap.fromTo(
            `.slide-${currentSlide - 1}`,
            {
                opacity: 0,
                display: "block",
            },
            {
                opacity: 1,
                duration: 0.5,
            }
        );
    };

    const handleNextClick = () => {
        setCurrentSlide(currentSlide + 1);
        gsap.to(`.slide-${currentSlide}`, {
            opacity: 0,
            duration: 0.5,
            display: "none",
        });
        gsap.fromTo(
            `.slide-${currentSlide + 1}`,
            {
                opacity: 0,
                display: "block",
            },
            {
                opacity: 1,
                duration: 0.5,
            }
        );
    };

    const totalSlides = 6;

    const handlePrev = () => {
        if (currentSlide > 1) {
            setCurrentSlide(currentSlide - 1);
            gsap.to(`.slide-${currentSlide}`, {
                duration: 1,
                opacity: 0,
                ease: Power2.easeInOut,
                onComplete: () => {
                    gsap.set(`.slide-${currentSlide - 1}`, { opacity: 1 });
                }
            });
        }
    };

    const handleNext = () => {
        if (currentSlide < totalSlides) {
            setCurrentSlide(currentSlide + 1);
            gsap.to(`.slide-${currentSlide - 1}`, {
                duration: 1,
                opacity: 0,
                ease: Power2.easeInOut,
                onComplete: () => {
                    gsap.set(`.slide-${currentSlide}`, { opacity: 1 });
                }
            });
        }
    };

    return (
        <div className="slider-container">
            {currentSlide === 1 && <Slide1 className="slide-1" currentSlide={currentSlide} handlePrev={handlePrev} handleNext={handleNext} />}
            {currentSlide === 2 && <Slide2 className="slide-2" currentSlide={currentSlide} handlePrev={handlePrev} handleNext={handleNext} />}
            {currentSlide === 3 && <Slide3 className="slide-3" currentSlide={currentSlide} handlePrev={handlePrev} handleNext={handleNext} />}
            {currentSlide === 4 && <Slide4 className="slide-4" currentSlide={currentSlide} handlePrev={handlePrev} handleNext={handleNext} />}
            {currentSlide === 5 && <Slide5 className="slide-5" currentSlide={currentSlide} handlePrev={handlePrev} handleNext={handleNext} />}
            {currentSlide === 6 && <Slide6 className="slide-6" currentSlide={currentSlide} handlePrev={handlePrev} handleNext={handleNext} />}
            <div className="slider-nav">
                {currentSlide === 1 ?
                    null
                    :
                    <button onClick={handlePrev} className="slider-prev">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 20L20 12L12 4L10.95 5.05L17.15 11.25H4V12.75H17.15L10.95 18.95L12 20Z" fill="white" />
                        </svg>

                    </button>
                }


                {currentSlide === 6 ?
                    null
                    :
                    <button onClick={handleNext} className="slider-next">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 20L20 12L12 4L10.95 5.05L17.15 11.25H4V12.75H17.15L10.95 18.95L12 20Z" fill="white" />
                        </svg>

                    </button>
                }

            </div>

        </div>
    );
};

export default Slider;
