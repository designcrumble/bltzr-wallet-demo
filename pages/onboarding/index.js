import Head from 'next/head'
import Image from 'next/image'
import Slider from '../Slider'
import styles from '../../styles/Home.module.scss'

export default function Onboarding() {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.app_bg}>
                    <svg width="1440" height="1024" viewBox="0 0 1440 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M-186 -340V-176.126L33.7624 -340H-69.6987L-136.375 -296.281L-111.754 -340H-186ZM-48.8116 649.529L449.714 -340H600.951L590.886 -290.113L666.954 -340H698.16L-48.8116 649.529ZM1706.19 -131.823L1218.21 844.625L1920 -77.0007L1765.99 5.63972L1920 -220.689V-340H1881.55L1262.19 87.3237L1706.19 -131.823ZM1415.58 -340L1382.83 -274.754L1479.52 -340H1415.58ZM333.625 751.584L960.012 -313.272L580.709 486.371L1109.6 224.047L333.625 751.584ZM-186 559.006V618.152L276.721 -176.124L-186 117.755V173.523L37.1971 65.5479L-186 559.006ZM-186 1262.54L80.6058 805.441L-105.964 929.028L677.12 -98.0043L107.962 967.475L633.836 658.47L29.6143 1100.48L-186 1262.54ZM1256.86 1420.01L1476.24 819.554L1205.46 1030.78L1881.8 163.936L1256.86 1420.01ZM1044.5 844.625L1268.07 323.005L740.042 583.816L1497.5 65.5479L1044.5 844.625ZM1920 495.01V391.677L1535.19 1057.49L1920 772.81V691.915L1797.44 751.683L1920 495.01Z" fill="#6DE3A4" />
                    </svg>

                </div>
                <div className={styles.app_content}>
                    <Slider />
                </div>
            </main>

        </div>
    )
}

