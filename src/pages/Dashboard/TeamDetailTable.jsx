import Button from '../../commonComponents/Button';
import { TEAM_TABLE_ROWS } from '../../utils/constants';
import TeamImage from './TeamImage';
import { useState } from 'react';
import Icon from '../../commonComponents/Icon';
import { fetchAPI } from '../../utils/commonServices';
import toast from 'react-hot-toast';

export default function TeamDetailScreen({ playersData = [], closeFunction }) {
    const [openTeamImage, setOpenTeamImage] = useState(false);

    async function handleTeamPlayerDelete(playerId) {
        try {
            await fetchAPI(`/teamPlayer/delete/${playerId}`, 'PUT');
            toast.success('Record Deleted Successfully.');
            window.location.reload();
        } catch (error) {
            toast.error('Unable to delete the record.');
        }
    }

    return (
        <div style={s.wrap}>
            {/* Header bar */}
            <div style={s.topBar}>
                <div style={s.teamInfo}>
                    <div style={s.teamInfoItem}>
                        <span style={s.teamInfoLabel}>Team</span>
                        <span style={s.teamInfoValue}>{playersData[0]?.team_name}</span>
                    </div>
                    <div style={s.divider} />
                    <div style={s.teamInfoItem}>
                        <span style={s.teamInfoLabel}>Owner</span>
                        <span style={s.teamInfoValue}>{playersData[0]?.owner}</span>
                    </div>
                </div>
                <div style={s.btnGroup}>
                    <button style={s.btnSecondary} onClick={() => setOpenTeamImage(true)}>📷 Team Image</button>
                    <button style={s.btnPrimary} onClick={closeFunction}>← Back to Teams</button>
                </div>
            </div>

            {/* Table header */}
            <div style={s.header}>
                {TEAM_TABLE_ROWS.map((row) => (
                    <span key={row} style={s.headerCell}>{row}</span>
                ))}
            </div>

            {/* Table body */}
            <div style={s.body}>
                {playersData.map((player, index) => (
                    <div key={index} style={{ ...s.row, background: index % 2 === 0 ? '#fff' : '#f8fafc' }}>
                        <span style={s.cell}>{player.id}</span>
                        <span style={{ ...s.cell, fontWeight: '700', color: '#1e293b' }}>{player.name}</span>
                        <span style={s.cell}>{player.contact_number}</span>
                        <span style={s.cell}>{player.jersey_name}</span>
                        <span style={s.cell}>{player.jersey_size}</span>
                        <span style={{ ...s.cell, gap: '12px' }}>
                            <span style={{ flex: 1, textAlign: 'center' }}>{player.jersey_no}</span>
                            <Icon icon="TrashIcon" size={5} className="text-red-500 cursor-pointer" onClick={() => handleTeamPlayerDelete(player.id)} />
                        </span>
                    </div>
                ))}
            </div>

            {openTeamImage && <TeamImage teamData={playersData} closeModal={() => setOpenTeamImage(false)} />}
        </div>
    );
}

const s = {
    wrap: { height: '100%', display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' },
    topBar: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 1.5rem', background: '#1e293b', flexShrink: 0,
    },
    teamInfo: { display: 'flex', alignItems: 'center', gap: '1.5rem' },
    teamInfoItem: { display: 'flex', flexDirection: 'column', gap: '2px' },
    teamInfoLabel: { fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' },
    teamInfoValue: { fontSize: '1rem', fontWeight: '800', color: '#fff', textTransform: 'capitalize' },
    divider: { width: '1px', height: '32px', background: 'rgba(255,255,255,0.15)' },
    btnGroup: { display: 'flex', gap: '0.75rem' },
    btnPrimary: {
        padding: '8px 20px', borderRadius: '999px', border: 'none', cursor: 'pointer',
        background: 'linear-gradient(135deg,#7c3aed,#db2777)', color: '#fff',
        fontWeight: '700', fontSize: '0.85rem',
    },
    btnSecondary: {
        padding: '8px 20px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.2)',
        background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: '0.85rem',
    },
    header: {
        display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)',
        background: '#f8fafc', borderBottom: '2px solid #e2e8f0', flexShrink: 0,
    },
    headerCell: {
        padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '700',
        color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center',
    },
    body: { overflowY: 'auto', flex: 1 },
    row: {
        display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)',
        borderBottom: '1px solid #f1f5f9', alignItems: 'center',
    },
    cell: {
        padding: '0.875rem 1rem', fontSize: '0.9rem', color: '#334155',
        textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '500',
    },
};
