import Icon from '../../commonComponents/Icon';
import { TEAM_DASHBOARD_ROWS } from '../../utils/constants';

export default function TeamTable({ tableData = [], openTeamDetails, handleNewTeamPlayer, handleTeamDelete, editTeamData }) {
    return (
        <div style={s.wrap}>
            {/* Header */}
            <div style={s.header}>
                {TEAM_DASHBOARD_ROWS.map((row) => (
                    <span key={row} style={{ ...s.headerCell, ...(row === 'Team Name' ? { gridColumn: 'span 2' } : {}) }}>
                        {row}
                    </span>
                ))}
            </div>

            {/* Rows */}
            <div style={s.body}>
                {tableData.map((item, index) => (
                    <div key={index} style={s.row}>
                        <span style={{ ...s.cell, gridColumn: 'span 2', justifyContent: 'flex-start', gap: '10px', cursor: 'pointer' }}
                            onClick={() => openTeamDetails(item.id)}>
                            <img src={item.team_photo} style={s.teamImg} alt="" />
                            <span style={{ color: '#fff', fontWeight: '600' }}>{item.team_name}</span>
                        </span>
                        <span style={s.cell}>{item.captain?.length > 12 ? `${item.captain.slice(0, 12)}…` : item.captain}</span>
                        <span style={s.cell}>{item.owner?.length > 10 ? `${item.owner.slice(0, 10)}…` : item.owner}</span>
                        <span style={s.cell}>{item.slots}</span>
                        <span style={s.cell}>{item.remaining_slots}</span>
                        <span style={s.cell}>{item.total_points_available}</span>
                        <span style={s.cell}>{item.remaining_points_available}</span>
                        <span style={{ ...s.cell, gap: '12px' }}>
                            <Icon icon="UserPlusIcon" size={4} className="text-emerald-400 cursor-pointer" onClick={() => handleNewTeamPlayer(item)} />
                            <Icon icon="PencilSquareIcon" size={4} className="text-sky-400 cursor-pointer" onClick={() => editTeamData(item)} />
                            <Icon icon="TrashIcon" size={4} className="text-red-400 cursor-pointer" onClick={() => handleTeamDelete(item.id)} />
                        </span>
                        <div style={s.divider} />
                    </div>
                ))}
            </div>
        </div>
    );
}

const s = {
    wrap: {
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column',
    },
    header: {
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        padding: '0 1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0,
    },
    headerCell: {
        padding: '0.75rem 0.5rem', fontSize: '0.7rem', fontWeight: '600',
        color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase',
        textAlign: 'center',
    },
    body: { overflowY: 'auto', flex: 1 },
    row: {
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        padding: '0 1rem', position: 'relative', alignItems: 'center',
        transition: 'background 0.15s',
    },
    cell: {
        padding: '0.6rem 0.5rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)',
        textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    teamImg: { width: '28px', height: '28px', borderRadius: '6px', objectFit: 'cover', flexShrink: 0 },
    divider: { position: 'absolute', bottom: 0, left: '1rem', right: '1rem', height: '1px', background: 'rgba(255,255,255,0.05)' },
};
