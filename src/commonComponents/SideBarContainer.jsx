import { useEffect, useState } from 'react';
import ProfileDropdown from '../pages/Dashboard/ProfileDropdown';
import { SIDEBAR_MENUS } from '../utils/constants';
import Icon from './Icon';
import LoadingScreen from './LoadingScreen';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function SidebarContainer({ children, isLoading = true }) {
    const [openUserModal, setOpenUserModal] = useState(false);
    const [isValidToken, setIsValidToken] = useState(false);
    let menuName = '';
    const url = window.location.href.toLowerCase();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Demo');
            window.location.href = '/signin';
        } else {
            setIsValidToken(true);
        }
    }, []);

    if (!isValidToken) return <main style={{ ...s.root, background: '#0f0c29' }} />;

    return (
        <main style={s.root}>
            {/* Orbs */}
            <div style={s.orb1} /><div style={s.orb2} />

            {/* Sidebar */}
            <aside style={s.sidebar}>
                <div />
                <div style={s.menuList}>
                    {SIDEBAR_MENUS.map((item, index) => {
                        const isActive = url.includes(item.name.toLowerCase());
                        menuName = isActive ? item.name : menuName;
                        return (
                            <Link key={index} to={`/${item.name.toLowerCase()}`} style={s.menuItem}>
                                <div style={{ ...s.menuDot, ...(isActive ? s.menuDotActive : {}) }} />
                                <Icon icon={item.icon} size={5} className={isActive ? 'text-[#a78bfa]' : 'text-[rgba(255,255,255,0.3)]'} />
                            </Link>
                        );
                    })}
                </div>
                <div />
            </aside>

            {/* Main */}
            <section style={s.main}>
                {/* Navbar */}
                <nav style={s.navbar}>
                    <p style={s.navTitle}>{menuName}</p>
                    <div style={{ position: 'relative' }}
                        onMouseEnter={() => setOpenUserModal(true)}
                        onMouseLeave={() => setOpenUserModal(false)}>
                        <img src="/profile.jpg" alt="" style={s.avatar} />
                        {openUserModal && <ProfileDropdown />}
                    </div>
                </nav>

                {/* Content */}
                <div style={s.content}>
                    {isLoading ? <LoadingScreen /> : children}
                </div>
            </section>
        </main>
    );
}

const s = {
    root: {
        display: 'flex', height: '100vh', width: '100vw',
        background: '#0f0c29', position: 'relative', overflow: 'hidden',
    },
    orb1: {
        position: 'fixed', top: '5%', left: '-60px', width: '300px', height: '300px',
        borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
    },
    orb2: {
        position: 'fixed', bottom: '5%', right: '-60px', width: '300px', height: '300px',
        borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
    },
    sidebar: {
        width: '56px', minHeight: '100vh', flexShrink: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'space-between', paddingTop: '1rem', paddingBottom: '1rem',
        borderRight: '1px solid rgba(255,255,255,0.06)', zIndex: 1,
    },
    menuList: { display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' },
    menuItem: { position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px' },
    menuDot: {
        position: 'absolute', left: '-8px', width: '3px', height: '20px',
        borderRadius: '999px', background: 'transparent', transition: 'background 0.2s',
    },
    menuDotActive: { background: 'linear-gradient(180deg,#7c3aed,#db2777)' },
    main: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', zIndex: 1 },
    navbar: {
        height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0,
    },
    navTitle: {
        color: '#fff', fontWeight: '700', fontSize: '0.95rem',
        letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0,
    },
    avatar: { width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.15)' },
    content: { flex: 1, overflow: 'auto', padding: '1.25rem' },
};
