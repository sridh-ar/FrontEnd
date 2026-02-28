export default function AnalysticsDiv({ totalRegisteredPlayers, totalTeams, totalTeamPlayers }) {
    const stats = [
        { label: 'Registered Players', value: totalRegisteredPlayers, icon: '👥', color: '#7c3aed' },
        { label: 'Total Teams', value: totalTeams, icon: '🏏', color: '#db2777' },
        { label: 'Assigned to Team', value: totalTeamPlayers, icon: '✅', color: '#059669' },
    ];

    return (
        <div style={s.row}>
            {stats.map((stat, i) => (
                <div key={i} style={s.card}>
                    <div style={{ ...s.iconWrap, boxShadow: `0 0 16px ${stat.color}55`, background: `${stat.color}22` }}>
                        <span style={{ fontSize: '1.2rem' }}>{stat.icon}</span>
                    </div>
                    <div>
                        <p style={s.value}>{stat.value ?? '—'}</p>
                        <p style={s.label}>{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

const s = {
    row: { display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' },
    card: {
        flex: 1, minWidth: '140px', display: 'flex', alignItems: 'center', gap: '0.75rem',
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px', padding: '0.875rem 1rem', backdropFilter: 'blur(10px)',
    },
    iconWrap: {
        width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    value: { color: '#fff', fontWeight: '800', fontSize: '1.3rem', margin: 0, lineHeight: 1 },
    label: { color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', margin: '4px 0 0', letterSpacing: '0.04em' },
};
