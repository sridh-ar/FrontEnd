import { jwtDecode } from 'jwt-decode';

export default function ProfileDropdown() {
    const token = localStorage.getItem('token') || '';
    const userDetail = jwtDecode(token);

    return (
        <div style={s.wrap}>
            <div style={s.section}>
                <p style={s.name}>{userDetail.name}</p>
                <p style={s.email}>{userDetail.email}</p>
            </div>
            <div style={s.divider} />
            <div style={s.section}>
                <p style={s.item}>Your Profile</p>
                <p style={s.item} onClick={() => { localStorage.removeItem('token'); window.location.replace('/signin'); }}>
                    Sign Out
                </p>
            </div>
        </div>
    );
}

const s = {
    wrap: {
        position: 'absolute', right: 0, top: '44px', zIndex: 50,
        minWidth: '200px', background: '#fff', borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid #e2e8f0',
        overflow: 'hidden',
    },
    section: { padding: '0.75rem 1rem' },
    divider: { height: '1px', background: '#f1f5f9' },
    name: { fontWeight: '700', color: '#1e293b', fontSize: '0.9rem', margin: '0 0 2px', textTransform: 'capitalize' },
    email: { color: '#64748b', fontSize: '0.75rem', margin: 0 },
    item: {
        padding: '6px 8px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.875rem',
        color: '#334155', margin: '2px 0', transition: 'background 0.15s',
    },
};
