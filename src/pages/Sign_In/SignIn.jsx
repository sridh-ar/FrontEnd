import { fetchAPI } from '../../utils/commonServices';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function SignIn() {
    const [buttonLoading, setButtonLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setButtonLoading(true);
        const payload = {
            email: event.target[0].value,
            password: event.target[1].value,
        };
        try {
            const authResponse = await fetchAPI('/auth/login', 'POST', payload);
            localStorage.setItem('token', authResponse);
            window.location.href = '/dashboard';
        } catch (error) {
            toast.error(error.message);
        } finally {
            setButtonLoading(false);
        }
    }

    return (
        <div style={s.page}>
            <div style={s.orb1} />
            <div style={s.orb2} />

            <div style={s.card}>
                <div style={s.logoWrap}>🔐</div>
                <p style={s.title}>Administrator Login</p>

                <form onSubmit={handleSubmit} style={s.form} autoComplete="off">
                    <div style={s.inputWrap}>
                        <span style={s.inputIcon}>✉</span>
                        <input type="email" name="email" required placeholder="Email"
                            style={s.input} autoComplete="off" />
                    </div>

                    <div style={s.inputWrap}>
                        <span style={s.inputIcon}>🔒</span>
                        <input type={showPassword ? 'text' : 'password'} name="password" required
                            placeholder="Password" style={s.input} autoComplete="off" />
                        <span style={s.eyeIcon} onClick={() => setShowPassword(p => !p)}>
                            {showPassword ? '🙈' : '👁'}
                        </span>
                    </div>

                    <button type="submit" disabled={buttonLoading} style={{ ...s.btn, ...(buttonLoading ? s.btnDisabled : {}) }}>
                        {buttonLoading ? <img src="/loading.gif" alt="Loading" style={{ width: 20 }} /> : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}

const s = {
    page: {
        minHeight: '100dvh', width: '100%', background: '#0f0c29',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden', boxSizing: 'border-box',
    },
    orb1: {
        position: 'fixed', top: '5%', left: '-80px', width: '350px', height: '350px',
        borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
    },
    orb2: {
        position: 'fixed', bottom: '80px', right: '-60px', width: '300px', height: '300px',
        borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)',
    },
    card: {
        position: 'relative', width: '100%', maxWidth: '360px',
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px', backdropFilter: 'blur(16px)', padding: '2rem 1.5rem',
        boxSizing: 'border-box', display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '1rem', margin: '1rem',
    },
    logoWrap: {
        width: '64px', height: '64px', borderRadius: '50%',
        background: 'linear-gradient(135deg,#7c3aed,#db2777)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.75rem', boxShadow: '0 0 24px rgba(124,58,237,0.4)',
    },
    title: { color: '#fff', fontWeight: '700', fontSize: '1rem', margin: 0, letterSpacing: '0.04em' },
    form: { width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    inputWrap: {
        display: 'flex', alignItems: 'center', gap: '8px',
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '12px', padding: '0 14px', height: '48px',
    },
    inputIcon: { fontSize: '0.9rem', flexShrink: 0, color: 'rgba(255,255,255,0.5)' },
    input: {
        flex: 1, background: 'transparent', border: 'none', outline: 'none',
        color: '#fff', fontSize: '16px',
    },
    eyeIcon: { cursor: 'pointer', fontSize: '0.9rem', flexShrink: 0 },
    btn: {
        width: '100%', padding: '12px', borderRadius: '999px', border: 'none',
        background: 'linear-gradient(135deg,#7c3aed,#db2777)', color: '#fff',
        fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    btnDisabled: { opacity: 0.6, cursor: 'not-allowed' },
};
