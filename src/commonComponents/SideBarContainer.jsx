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
        if (!token) { toast.error('Demo'); window.location.href = '/signin'; }
        else setIsValidToken(true);
    }, []);

    if (!isValidToken) return <main style={{ height: '100vh', background: '#f0f4ff' }} />;

    return (
        <main style={s.root}>
            {/* Sidebar */}
            <aside style={s.sidebar}>
                <div style={s.sidebarAccent} />
                <div style={s.menuList}>
                    {SIDEBAR_MENUS.map((item, index) => {
                        const isActive = url.includes(item.name.toLowerCase());
                        menuName = isActive ? item.name : menuName;
                        return (
                            <Link key={index} to={`/${item.name.toLowerCase()}`} style={{ ...s.menuItem, ...(isActive ? s.menuItemActive : {}) }}>
                                <Icon icon={item.icon} size={5} className={isActive ? 'text-white' : 'text-[#94a3b8]'} />
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
                    <div style={s.navLeft}>
                        <div style={s.navAccent} />
                        <p style={s.navTitle}>{menuName} Dashboard</p>
                    </div>
                    <div style={{ position: 'relative' }}
                        onMouseEnter={() => setOpenUserModal(true)}
                        onMouseLeave={() => setOpenUserModal(false)}>
                        <img src="/profile.jpg" alt="" style={s.avatar} />
                        {openUserModal && <ProfileDropdown />}
                    </div>
                </nav>

                {/* Content */}
                <div style={s.content}>
                    {isLoading ? <LoadingScreen variant="skeleton" /> : children}
                </div>
            </section>
        </main>
    );
}

const s = {
    root: { display: 'flex', height: '100vh', width: '100vw', background: '#f0f4ff', overflow: 'hidden' },
    sidebar: {
        width: '56px', minHeight: '100vh', background: '#1e293b',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'space-between', padding: '1rem 0', flexShrink: 0,
        boxShadow: '4px 0 20px rgba(0,0,0,0.15)',
    },
    sidebarAccent: {
        width: '24px', height: '3px', borderRadius: '999px',
        background: 'linear-gradient(90deg,#7c3aed,#db2777)',
    },
    menuList: { display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'center', width: '100%' },
    menuItem: {
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
        padding: '8px 0', width: '100%', textDecoration: 'none',
        borderLeft: '3px solid transparent', transition: 'all 0.2s',
    },
    menuItemActive: {
        borderLeft: '3px solid #a78bfa',
        background: 'rgba(167,139,250,0.1)',
    },
    menuLabel: { fontSize: '0.55rem', color: '#a78bfa', letterSpacing: '0.05em', textTransform: 'uppercase' },
    main: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
    navbar: {
        height: '48px', background: '#fff', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 1.25rem', flexShrink: 0,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderBottom: '1px solid #e2e8f0',
    },
    navLeft: { display: 'flex', alignItems: 'center', gap: '10px' },
    navAccent: { width: '3px', height: '20px', borderRadius: '999px', background: 'linear-gradient(180deg,#7c3aed,#db2777)' },
    navTitle: { fontSize: '0.95rem', fontWeight: '800', color: '#1e293b', margin: 0, letterSpacing: '-0.3px' },
    avatar: { width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', objectFit: 'cover', border: '2px solid #e2e8f0' },
    content: { flex: 1, overflow: 'auto', padding: '1rem', background: '#f0f4ff' },
};
