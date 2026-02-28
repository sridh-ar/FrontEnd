import Icon from '../../commonComponents/Icon';

const COLS = '2fr 1fr 1fr 0.7fr 0.9fr 1fr 1fr 1fr';

const fadeIn = `@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`;

export default function TeamTable({ tableData = [], openTeamDetails, handleNewTeamPlayer, handleTeamDelete, editTeamData }) {
    return (
        <div style={{ ...s.wrap, animation: 'fadeUp 0.4s ease both', animationDelay: '0.3s' }}>
            <style>{fadeIn}</style>
            <div style={s.header}>
                {['Team Name', 'Captain', 'Owner', 'Slots', 'Rem. Slots', 'Total Pts', 'Rem. Pts', 'Actions'].map((col, i) => (
                    <span key={col} style={{ ...s.hCell, textAlign: i === 0 ? 'left' : 'center', paddingLeft: i === 0 ? '1rem' : undefined }}>{col}</span>
                ))}
            </div>

            <div style={s.body}>
                {tableData.map((item, index) => (
                    <div key={index} style={{ ...s.row, background: index % 2 === 0 ? '#fff' : '#f8fafc' }}>
                        <span style={{ ...s.cell, justifyContent: 'flex-start', gap: '12px', paddingLeft: '1rem', cursor: 'pointer' }}
                            onClick={() => openTeamDetails(item.id)}>
                            <img src={item.team_photo} style={s.teamImg} alt="" />
                            <span style={s.teamName}>{item.team_name}</span>
                        </span>
                        <span style={s.cell}>{item.captain?.length > 14 ? `${item.captain.slice(0, 14)}…` : item.captain}</span>
                        <span style={s.cell}>{item.owner?.length > 12 ? `${item.owner.slice(0, 12)}…` : item.owner}</span>
                        <span style={{ ...s.cell, ...s.badge, background: '#ede9fe', color: '#7c3aed' }}>{item.slots}</span>
                        <span style={{ ...s.cell, ...s.badge, background: item.remaining_slots > 0 ? '#d1fae5' : '#fee2e2', color: item.remaining_slots > 0 ? '#059669' : '#dc2626' }}>{item.remaining_slots}</span>
                        <span style={s.cell}>{item.total_points_available}</span>
                        <span style={s.cell}>{item.remaining_points_available}</span>
                        <span style={{ ...s.cell, gap: '14px' }}>
                            <Icon icon="UserPlusIcon" size={5} className="text-emerald-600 cursor-pointer hover:scale-110" onClick={() => handleNewTeamPlayer(item)} />
                            <Icon icon="PencilSquareIcon" size={5} className="text-sky-600 cursor-pointer hover:scale-110" onClick={() => editTeamData(item)} />
                            <Icon icon="TrashIcon" size={5} className="text-red-500 cursor-pointer hover:scale-110" onClick={() => handleTeamDelete(item.id)} />
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

const s = {
    wrap: {
        background: '#fff', borderRadius: '16px', overflow: 'hidden',
        height: '100%', display: 'flex', flexDirection: 'column',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0',
    },
    header: {
        display: 'grid', gridTemplateColumns: COLS,
        background: '#1e293b', padding: '0 0.5rem', flexShrink: 0,
    },
    hCell: {
        padding: '0.9rem 0.5rem', fontSize: '0.72rem', fontWeight: '700',
        color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase',
    },
    body: { overflowY: 'auto', flex: 1 },
    row: {
        display: 'grid', gridTemplateColumns: COLS,
        padding: '0 0.5rem', alignItems: 'center',
        borderBottom: '1px solid #f1f5f9',
    },
    cell: {
        padding: '0.85rem 0.5rem', fontSize: '0.9rem', color: '#334155',
        textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: '500',
    },
    teamImg: { width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0, border: '1px solid #e2e8f0' },
    teamName: { fontWeight: '700', fontSize: '0.95rem', color: '#1e293b' },
    badge: { borderRadius: '999px', padding: '4px 10px', fontSize: '0.8rem', fontWeight: '700', display: 'inline-flex', margin: '0 8px'  },
};
