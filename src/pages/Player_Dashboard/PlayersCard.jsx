import { useState } from 'react';
import { fetchAPI } from '../../utils/commonServices';
import toast from 'react-hot-toast';
import PlayerRegistration from '../Player_Registeration/PlayerRegistration';

const ROLE_COLORS = {
    'All Rounder': { bg: '#ede9fe', color: '#7c3aed' },
    'Batsman':     { bg: '#dbeafe', color: '#1d4ed8' },
    'Bowler':      { bg: '#d1fae5', color: '#059669' },
};

export default function PlayersCard({ playerData, onClick, fromRegisterMenu = false }) {
    const { name, contact_number, player_role, team_name, player_photo, id } = playerData;
    const [deleting, setDeleting] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const roleStyle = ROLE_COLORS[player_role] || { bg: '#f1f5f9', color: '#475569' };

    async function handleDelete(e) {
        e.stopPropagation();
        if (!window.confirm('Delete this player?')) return;
        setDeleting(true);
        try {
            await fetchAPI(`/player/delete/${id}`, 'PUT');
            window.location.reload();
        } catch { toast.error('Unable to delete player.'); }
        setDeleting(false);
    }

    return (
        <>
            <div style={s.card} onClick={onClick}>
                {/* Photo */}
                <div style={s.imgWrap}>
                    <div style={s.imgInner}>
                    <img src={player_photo} alt={name} style={s.img} />
                    <span style={{ ...s.roleBadge, background: roleStyle.bg, color: roleStyle.color }}>
                        {player_role}
                    </span>
                    </div>
                </div>

                {/* Info */}
                <div style={s.info}>
                    <p style={s.name}>{name}</p>
                    <div style={s.badgeRow}>
                        <span style={s.teamBadge}>🏏 {team_name}</span>
                        <span style={s.phoneBadge}>📞 {contact_number}</span>
                    </div>
                </div>

                {/* Actions */}
                {!fromRegisterMenu && (
                    <div style={s.actions} onClick={e => e.stopPropagation()}>
                        <button style={s.editBtn} onClick={e => { e.stopPropagation(); setEditMode(true); }}>✏️</button>
                        <button style={s.deleteBtn} onClick={handleDelete} disabled={deleting}>
                            {deleting ? '…' : '🗑️'}
                        </button>
                    </div>
                )}
            </div>

            {editMode && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 50, overflowY: 'auto' }}>
                    <PlayerRegistration editData={playerData} closeModal={() => setEditMode(false)} />
                </div>
            )}
        </>
    );
}

const s = {
    card: {
        background: '#fff', borderRadius: '14px', overflow: 'hidden',
        border: '1px solid #e2e8f0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        cursor: 'pointer', display: 'flex', flexDirection: 'column',
        animation: 'fadeUp 0.4s ease both',
    },
    imgWrap: { position: 'relative', width: '100%', paddingTop: '75%', background: '#f8fafc', flexShrink: 0 },
    imgInner: { position: 'absolute', inset: 0 },
    img: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
    roleBadge: {
        position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)',
        padding: '2px 10px', borderRadius: '999px', fontSize: '0.72rem',
        fontWeight: '700', whiteSpace: 'nowrap',
    },
    info: { padding: '0.4rem 0.6rem', flex: 1 },
    name: { margin: '0 0 4px', fontWeight: '800', fontSize: '0.85rem', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
    badgeRow: { display: 'flex', gap: '4px', flexWrap: 'wrap' },
    teamBadge: { background: '#ede9fe', color: '#7c3aed', fontSize: '0.65rem', fontWeight: '700', padding: '2px 6px', borderRadius: '999px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '55%' },
    phoneBadge: { background: '#e0f2fe', color: '#0369a1', fontSize: '0.65rem', fontWeight: '600', padding: '2px 6px', borderRadius: '999px', whiteSpace: 'nowrap' },
    actions: {
        display: 'flex', borderTop: '1px solid #f1f5f9',
    },
    editBtn: {
        flex: 1, padding: '0.4rem', background: 'none', border: 'none',
        cursor: 'pointer', fontSize: 'clamp(0.7rem, 1.1vmin, 0.9rem)',
        borderRight: '1px solid #f1f5f9',
    },
    deleteBtn: {
        flex: 1, padding: '0.4rem', background: 'none', border: 'none',
        cursor: 'pointer', fontSize: 'clamp(0.7rem, 1.1vmin, 0.9rem)',
    },
};
