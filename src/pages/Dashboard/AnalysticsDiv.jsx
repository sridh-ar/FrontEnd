export default function AnalysticsDiv({ totalRegisteredPlayers, totalTeams, totalTeamPlayers, onNewTeam }) {
    const stats = [
        { label: 'Registered Players', value: totalRegisteredPlayers, icon: '👥', bg: '#7c3aed', light: '#ede9fe' },
        { label: 'Total Teams', value: totalTeams, icon: '🏏', bg: '#db2777', light: '#fce7f3' },
        { label: 'Assigned to Team', value: totalTeamPlayers, icon: '✅', bg: '#059669', light: '#d1fae5' },
    ];

    return (
        <>
            <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
            <div style={s.row}>
                {stats.map((stat, i) => (
                    <div key={i} style={{ ...s.card, animation: 'fadeUp 0.4s ease both', animationDelay: `${i * 0.1}s` }}>
                        <div style={{ ...s.iconWrap, background: stat.light }}>
                            <span style={{ fontSize: '1.1rem' }}>{stat.icon}</span>
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ ...s.value, color: stat.bg }}>{stat.value ?? '—'}</p>
                            <p style={s.label}>{stat.label}</p>
                        </div>
                        {stat.label === 'Total Teams' && onNewTeam && (
                            <button style={s.addBtn} onClick={onNewTeam}>
                                <span style={{ fontSize: '1rem', lineHeight: 1 }}>＋</span> New Team
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

const s = {
    row: { display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' },
    card: {
        flex: 1, minWidth: '140px', display: 'flex', alignItems: 'center', gap: '0.75rem',
        background: '#fff', borderRadius: '12px', padding: '0.85rem 1.1rem',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0',
    },
    iconWrap: {
        width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    value: { fontWeight: '900', fontSize: '1.4rem', margin: 0, lineHeight: 1 },
    label: { color: '#64748b', fontSize: '0.85rem', margin: '3px 0 0', fontWeight: '600' },
    addBtn: {
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '7px 14px', borderRadius: '10px', border: 'none', cursor: 'pointer',
        background: 'linear-gradient(135deg,#7c3aed,#db2777)', color: '#fff',
        fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.03em',
        boxShadow: '0 4px 14px rgba(124,58,237,0.45)', flexShrink: 0,
        whiteSpace: 'nowrap',
    },
};
