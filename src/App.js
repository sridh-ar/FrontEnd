import './app.css';
import { useEffect, useState } from 'react';
import { fetchAPI } from './utils/commonServices';

// Components
import Footer from './components/Footer';
import LoadingScreen from './commonComponents/LoadingScreen';

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [configValues, setconfigValues] = useState({});

    async function initialDataRetrival() {
        const dashBaoardResult = await fetchAPI('/admin/dashboard');
        const configObject = dashBaoardResult.reduce((accumulator, current) => {
            accumulator[current.config_name] = current.config_value;
            return accumulator;
        }, {});
        if (configObject) {
            configObject['remainingSlots'] = configObject.allowedRegistrationCount - configObject.totalRegisteredPlayers;
        }
        setconfigValues(configObject);
        setIsLoading(false);
    }

    useEffect(() => {
        initialDataRetrival();
    }, []);

    if (isLoading) {
        return (
            <div className="h-screen w-screen">
                <LoadingScreen />
            </div>
        );
    }

    const slotsLeft = configValues.remainingSlots > 0 ? configValues.remainingSlots : 0;
    const isFull = slotsLeft <= 0;

    return (
        <main style={styles.main}>
            {/* Animated background orbs */}
            <div style={styles.orb1} />
            <div style={styles.orb2} />
            <div style={styles.orb3} />

            <div style={styles.content}>
                {/* Logo */}
                <a href="/Dashboard" style={styles.logoLink}>
                    <div style={styles.logoGlow}>
                        <img src={configValues.logo} alt="Tournament Logo" style={styles.logo} />
                    </div>
                </a>

                {/* Title */}
                <h1 style={styles.title}>{configValues.appName}</h1>
                <p style={styles.subtitle}>Compete. Conquer. Champion.</p>

                {/* Slots badge */}
                <div style={{ ...styles.slotsBadge, background: isFull ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)', borderColor: isFull ? '#ef4444' : '#22c55e' }}>
                    <span style={{ ...styles.slotsDot, background: isFull ? '#ef4444' : '#22c55e' }} />
                    <span style={{ ...styles.slotsText, color: isFull ? '#ef4444' : '#22c55e' }}>
                        {isFull ? 'Registration Closed' : `${slotsLeft} Slots Remaining`}
                    </span>
                </div>

                {/* Register Button */}
                <button
                    onClick={() => !isFull && (window.location.href = '/playerRegister')}
                    disabled={isFull}
                    style={{ ...styles.registerBtn, ...(isFull ? styles.registerBtnDisabled : {}) }}
                >
                    <span style={styles.btnIcon}></span>
                    Register Now
                </button>
            </div>

            <Footer />
        </main>
    );
}

const styles = {
    main: {
        height: '100dvh',
        maxHeight: '100dvh',
        overflow: 'hidden',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#0f0c29',
        position: 'relative',
        overflow: 'hidden',
    },
    orb1: {
        position: 'absolute', top: '5%', left: '-80px',
        width: '350px', height: '350px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)',
        animation: 'pulse 6s ease-in-out infinite',
        pointerEvents: 'none',
    },
    orb2: {
        position: 'absolute', bottom: '80px', right: '-60px',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)',
        animation: 'pulse 8s ease-in-out infinite 2s',
        pointerEvents: 'none',
    },
    orb3: {
        position: 'absolute', top: '40%', left: '50%', transform: 'translateX(-50%)',
        width: '500px', height: '200px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        position: 'relative',
        zIndex: 1,
    },
    logoLink: { textDecoration: 'none' },
    logoGlow: {
        padding: '6px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
        boxShadow: '0 0 40px rgba(139,92,246,0.4), 0 0 80px rgba(139,92,246,0.15)',
        border: '1px solid rgba(255,255,255,0.1)',
        marginBottom: '1.5rem',
        transition: 'transform 0.3s ease',
    },
    logo: { width: '160px', height: '160px', objectFit: 'cover', borderRadius: '50%', display: 'block' },
    title: {
        fontSize: 'clamp(1.8rem, 6vw, 2.8rem)',
        fontWeight: '800',
        color: '#ffffff',
        textAlign: 'center',
        margin: '0 0 0.4rem',
        letterSpacing: '-0.5px',
        whiteSpace: 'nowrap',
        background: 'linear-gradient(90deg, #a78bfa, #f472b6, #60a5fa)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    },
    subtitle: {
        fontSize: '0.95rem',
        color: 'rgba(255,255,255,0.45)',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        margin: '0 0 2rem',
    },
    slotsBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 16px',
        borderRadius: '999px',
        border: '1px solid',
        marginBottom: '1.5rem',
    },
    slotsDot: {
        width: '8px', height: '8px', borderRadius: '50%',
        display: 'inline-block',
        boxShadow: '0 0 6px currentColor',
    },
    slotsText: { fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.05em' },
    registerBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 28px',
        fontSize: '0.85rem',
        fontWeight: '700',
        color: '#fff',
        background: 'linear-gradient(135deg, #7c3aed, #db2777)',
        border: 'none',
        borderRadius: '999px',
        cursor: 'pointer',
        boxShadow: '0 4px 30px rgba(124,58,237,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
        letterSpacing: '0.03em',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    registerBtnDisabled: {
        background: 'rgba(255,255,255,0.08)',
        boxShadow: 'none',
        cursor: 'not-allowed',
        color: 'rgba(255,255,255,0.3)',
    },
    btnIcon: { fontSize: '1.1rem' },
};
