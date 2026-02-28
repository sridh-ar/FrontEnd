import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchAPI } from '../../utils/commonServices';
import SidebarContainer from '../../commonComponents/SideBarContainer';
import AppConfigInput from './AppConfigInput';

export default function AdminDashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [appConfig, setAppConfig] = useState([]);
    const [logoData, setLogoData] = useState('');

    useEffect(() => {
        async function getConfigValues() {
            try {
                const result = await fetchAPI('/admin');
                const logo = result.find(c => c.config_name === 'logo');
                setAppConfig(result.filter(c => c.config_name !== 'logo'));
                setLogoData(logo?.config_value || '');
            } catch {
                toast.error('Unable to fetch App Config');
            } finally {
                setIsLoading(false);
            }
        }
        getConfigValues();
    }, []);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = async () => {
            await fetchAPI('/admin/update/logo', 'PUT', { config_value: reader.result });
            window.location.reload();
        };
        reader.readAsDataURL(file);
    };

    const handleReset = async (onlyId) => {
        try {
            await fetchAPI(onlyId ? '/admin/resetid' : '/admin/resetapplication');
            toast.success('Reset Completed');
        } catch {
            toast.error('Unable to Reset.');
        }
    };

    return (
        <SidebarContainer isLoading={isLoading}>
            {isSaving && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="/loading.gif" alt="" style={{ width: 80 }} />
                </div>
            )}
            <div style={s.page}>

                <div style={s.card}>
                    <div style={s.cardTop}>
                        <div style={s.titleRow}>
                            <div style={s.dot} />
                            <span style={s.title}>App Configurations</span>
                        </div>
                        <span style={s.desc}>Manage tournament config values used across the app.</span>
                    </div>
                    <div style={s.cardBody}>
                        {appConfig.map((config, i) => <AppConfigInput config={config} key={i} />)}
                        <AppConfigInput addConfig />
                    </div>
                </div>

                <div style={s.row}>
                    {/* Avatar */}
                    <div style={{ ...s.card, flex: 1 }}>
                        <div style={s.cardTop}>
                            <div style={s.titleRow}>
                                <div style={s.dot} />
                                <span style={s.title}>App Logo</span>
                            </div>
                            <span style={s.desc}>Click the logo to upload a new one.</span>
                        </div>
                        <div style={{ ...s.cardBody, alignItems: 'center', justifyContent: 'center', padding: '2vmin' }}>
                            <label htmlFor="logoInput" style={{ cursor: 'pointer' }}>
                                <img src={logoData} alt="Logo" style={s.logo} />
                            </label>
                            <input id="logoInput" type="file" style={{ display: 'none' }} onChange={handleLogoChange} />
                            <span style={{ ...s.desc, marginTop: '1vmin', textAlign: 'center' }}>Max 1MB recommended</span>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div style={{ ...s.card, flex: 2 }}>
                        <div style={s.cardTop}>
                            <div style={s.titleRow}>
                                <div style={{ ...s.dot, background: '#ef4444' }} />
                                <span style={s.title}>Danger Zone</span>
                            </div>
                            <span style={s.desc}>These actions are irreversible. Proceed with caution.</span>
                        </div>
                        <div style={{ ...s.cardBody, gap: '1.5vmin' }}>
                            <DangerRow
                                label="Reset IDs"
                                sub="Resets the primary key IDs in all tables."
                                onConfirm={() => handleReset(true)}
                            />
                            <DangerRow
                                label="Reset Application"
                                sub="Clears all Players and Team data from the database."
                                onConfirm={() => handleReset(false)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </SidebarContainer>
    );
}

function DangerRow({ label, sub, onConfirm }) {
    const [confirm, setConfirm] = useState(false);
    return (
        <div style={s.dangerRow}>
            <div>
                <p style={s.dangerLabel}>{label}</p>
                <p style={s.dangerSub}>{sub}</p>
            </div>
            {confirm
                ? <div style={{ display: 'flex', gap: '0.8vmin' }}>
                    <button style={s.confirmBtn} onClick={() => { onConfirm(); setConfirm(false); }}>Confirm</button>
                    <button style={s.cancelBtn} onClick={() => setConfirm(false)}>Cancel</button>
                  </div>
                : <button style={s.resetBtn} onClick={() => setConfirm(true)}>Reset</button>
            }
        </div>
    );
}

const s = {
    page: { display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' },
    row: { display: 'flex', gap: '1rem' },
    card: {
        background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)', overflow: 'hidden',
    },
    cardTop: { padding: '1rem 1.25rem', borderBottom: '1px solid #f1f5f9' },
    cardBody: { padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column' },
    titleRow: { display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' },
    dot: { width: '4px', height: '20px', borderRadius: '999px', background: 'linear-gradient(180deg,#7c3aed,#db2777)', flexShrink: 0 },
    title: { fontSize: 'clamp(0.9rem, 1.6vmin, 1.4rem)', fontWeight: '800', color: '#1e293b' },
    desc: { fontSize: 'clamp(0.75rem, 1.1vmin, 1rem)', color: '#64748b' },
    logo: { width: 'clamp(56px, 8vmin, 96px)', height: 'clamp(56px, 8vmin, 96px)', borderRadius: '50%', objectFit: 'cover', border: '3px solid #e2e8f0' },
    dangerRow: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.85rem 1rem', borderRadius: '8px', background: '#fff5f5', border: '1px solid #fee2e2',
    },
    dangerLabel: { margin: 0, fontSize: 'clamp(0.8rem, 1.3vmin, 1.1rem)', fontWeight: '700', color: '#1e293b' },
    dangerSub: { margin: '2px 0 0', fontSize: 'clamp(0.7rem, 1vmin, 0.9rem)', color: '#64748b' },
    resetBtn: {
        padding: '0.45rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer',
        background: '#fee2e2', color: '#dc2626', fontWeight: '700', fontSize: 'clamp(0.75rem, 1.1vmin, 0.95rem)', flexShrink: 0,
    },
    confirmBtn: {
        padding: '0.45rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer',
        background: '#dc2626', color: '#fff', fontWeight: '700', fontSize: 'clamp(0.75rem, 1.1vmin, 0.95rem)',
    },
    cancelBtn: {
        padding: '0.45rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer',
        background: '#f1f5f9', color: '#64748b', fontWeight: '700', fontSize: 'clamp(0.75rem, 1.1vmin, 0.95rem)',
    },
};
