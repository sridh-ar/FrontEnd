import { useState } from 'react';

const css = `
@keyframes backdropIn { from { opacity:0 } to { opacity:1 } }
@keyframes backdropOut { from { opacity:1 } to { opacity:0 } }
@keyframes cardIn { from { opacity:0; transform:scale(0.92) translateY(24px) } to { opacity:1; transform:scale(1) translateY(0) } }
@keyframes cardOut { from { opacity:1; transform:scale(1) translateY(0) } to { opacity:0; transform:scale(0.92) translateY(24px) } }
`;

const ROLE_COLORS = {
    'All Rounder': '#7c3aed',
    'Batsman': '#1d4ed8',
    'Bowler': '#059669',
};

export default function PlayersCardFull({ playerDetails, closeModal }) {
    const [closing, setClosing] = useState(false);
    function handleClose() { setClosing(true); setTimeout(closeModal, 220); }
    const { name, id, player_role, team_name, contact_number, batting_style, bowling_style, area, jersey_name, jersey_no, jersey_size, player_photo } = playerDetails;
    const roleColor = ROLE_COLORS[player_role] || '#475569';

    const stats = [
        { label: 'Serial No', value: `#${id}` },
        { label: 'Team', value: team_name },
        { label: 'Area', value: area },
        { label: 'Contact', value: contact_number },
        { label: 'Jersey', value: `${jersey_name} · #${jersey_no} · ${jersey_size}` },
        { label: 'Batting', value: batting_style },
        { label: 'Bowling', value: bowling_style },
    ];

    return (
        <>
        <style>{css}</style>
        <div style={{ ...s.backdrop, animation: closing ? 'backdropOut 0.22s ease forwards' : 'backdropIn 0.22s ease forwards' }} onClick={handleClose}>
            <div style={{ ...s.card, animation: closing ? 'cardOut 0.22s ease forwards' : 'cardIn 0.25s ease forwards' }} onClick={e => e.stopPropagation()}>
                {/* Close */}
                <button style={s.closeBtn} onClick={handleClose}>✕</button>

                {/* Left — photo */}
                <div style={s.photoSide}>
                    <img src={player_photo} alt={name} style={s.photo} />
                    <div style={s.photoOverlay} />
                </div>

                {/* Right — info */}
                <div style={s.infoSide}>
                    <div>
                        <p style={s.name}>{name}</p>
                        <span style={{ ...s.roleBadge, background: roleColor }}>{player_role}</span>
                    </div>

                    <div style={s.divider} />

                    <div style={s.statsList}>
                        {stats.map(({ label, value }) => value && value !== 'N/A' && (
                            <div key={label} style={s.statRow}>
                                <span style={s.statLabel}>{label}</span>
                                <span style={s.statValue}>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

const s = {
    backdrop: {
        position: 'fixed', inset: 0, zIndex: 50,
        background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    card: {
        background: '#fff', borderRadius: '20px', overflow: 'hidden',
        display: 'flex', width: '720px', maxWidth: '95vw', maxHeight: '90vh',
        boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
        position: 'relative',
    },
    closeBtn: {
        position: 'absolute', top: '14px', right: '14px', zIndex: 10,
        background: 'rgba(0,0,0,0.35)', border: 'none', color: '#fff',
        width: '32px', height: '32px', borderRadius: '50%',
        cursor: 'pointer', fontSize: '0.85rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    photoSide: {
        width: '380px', flexShrink: 0, position: 'relative', background: '#0f172a',
    },
    photo: {
        width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top',
        display: 'block', opacity: 0.92,
    },
    photoOverlay: {
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, transparent 60%, rgba(255,255,255,0.08))',
    },
    infoSide: {
        flex: 1, padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column',
        gap: '1rem', overflowY: 'auto', background: '#fff',
    },
    name: {
        margin: '0 0 8px', fontSize: '1.6rem', fontWeight: '900',
        color: '#0f172a', lineHeight: 1.1,
    },
    roleBadge: {
        display: 'inline-block', color: '#fff', fontSize: '0.75rem',
        fontWeight: '700', padding: '3px 12px', borderRadius: '999px',
    },
    divider: {
        height: '1px', background: '#f1f5f9',
    },
    statsList: {
        display: 'flex', flexDirection: 'column', gap: '0.5rem',
    },
    statRow: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0.55rem 0.75rem', borderRadius: '10px', background: '#f1f5f9',
        border: '1px solid #e2e8f0', gap: '1rem',
    },
    statLabel: {
        fontSize: '0.78rem', color: '#475569', fontWeight: '700', flexShrink: 0,
    },
    statValue: {
        fontSize: '0.85rem', color: '#0f172a', fontWeight: '700',
        textAlign: 'right', wordBreak: 'break-word',
    },
};
