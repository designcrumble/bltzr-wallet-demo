import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitType from 'split-type'
import Slider from './Slider'
import styles from '../styles/Home.module.scss'
import stylesOnboarding from '../styles/Onboarding.module.scss'

export default function Home() {
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
    <div className={styles.container}>
      <Head>
        <title>Bltzr.gg Wallet Demo</title>
        <meta name="description" content="Wallet Experiment for Bltzr" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bltzr-wallet-demo-131n.vercel.app/" />
        <meta property="og:title" content="Wallet Experiment for Bltzr by KC" />
        <meta property="og:description" content="New way to onboard the next million users to Web3" />
        <meta property="og:image" content="https://bltzr-wallet-demo-131n.vercel.app/social.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://bltzr-wallet-demo-131n.vercel.app/" />
        <meta property="twitter:title" content="Wallet Experiment for Bltzr by KC" />
        <meta property="twitter:description" content="New way to onboard the next million users to Web3" />
        <meta property="twitter:image" content="https://bltzr-wallet-demo-131n.vercel.app/social.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.app_bg}>
          <svg width="1440" height="1024" viewBox="0 0 1440 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M-186 -340V-176.126L33.7624 -340H-69.6987L-136.375 -296.281L-111.754 -340H-186ZM-48.8116 649.529L449.714 -340H600.951L590.886 -290.113L666.954 -340H698.16L-48.8116 649.529ZM1706.19 -131.823L1218.21 844.625L1920 -77.0007L1765.99 5.63972L1920 -220.689V-340H1881.55L1262.19 87.3237L1706.19 -131.823ZM1415.58 -340L1382.83 -274.754L1479.52 -340H1415.58ZM333.625 751.584L960.012 -313.272L580.709 486.371L1109.6 224.047L333.625 751.584ZM-186 559.006V618.152L276.721 -176.124L-186 117.755V173.523L37.1971 65.5479L-186 559.006ZM-186 1262.54L80.6058 805.441L-105.964 929.028L677.12 -98.0043L107.962 967.475L633.836 658.47L29.6143 1100.48L-186 1262.54ZM1256.86 1420.01L1476.24 819.554L1205.46 1030.78L1881.8 163.936L1256.86 1420.01ZM1044.5 844.625L1268.07 323.005L740.042 583.816L1497.5 65.5479L1044.5 844.625ZM1920 495.01V391.677L1535.19 1057.49L1920 772.81V691.915L1797.44 751.683L1920 495.01Z" fill="#6DE3A4" />
          </svg>

        </div>
        <div className={styles.app_content}>
          <div className={stylesOnboarding.onboarding_container}>
            <div className={stylesOnboarding.onboarding_meta}>
              <h6 className={stylesOnboarding.onboarding__overline}>Welcome to BLTZR.GG</h6>
              <h1 ref={headingRef} className={stylesOnboarding.onboarding_header}><span>Let&lsquo;s get</span> <span>you started</span></h1>
              <p ref={paragraphRef}>Let&lsquo;s setup your username and authentication image to help you secure your [X] Wallet. They are unique to you and can help you recover your Seed Phrase later on.</p>
              <Link href="/onboarding"><button className='btn-primary'>Get Started</button></Link>
            </div>
            <span className={styles.onboarding_image}>
              <Image
                src="/robot.png"
                fill
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              />
            </span>
          </div>

        </div>
      </main>

    </div>
  )
}

