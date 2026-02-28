import { useEffect, useState } from 'react';
import { newTeamPlayer } from '../../utils/constants';
import ModalWrapper from '../../commonComponents/ModalWrapper';
import { fetchAPI } from '../../utils/commonServices';
import toast from 'react-hot-toast';

export default function NewTeamPlayerModal({ closeFunction, selectedTeam }) {
    const [isLoading, setisLoading] = useState(false);
    const [closing, setClosing] = useState(false);
    const [playerData, setPlayerData] = useState(null);
    const [playersList, setplayersList] = useState([]);
    const [teamPlayerData, setTeamPlayerData] = useState({
        team_name: selectedTeam.team_name,
        player_no: '', player_name: '', points: '',
        team_id: selectedTeam.id,
    });

    useEffect(() => {
        setisLoading(true);
        fetchAPI('/player').then((data) => { setplayersList(data); setisLoading(false); }).catch(console.error);
    }, []);

    function handleClose() { setClosing(true); setTimeout(closeFunction, 220); }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'player_no') {
            setPlayerData(value.length > 0 ? playersList.find(i => i.id === value || i.name.toLowerCase().includes(value.toLowerCase())) : null);
        }
        setTeamPlayerData({ ...teamPlayerData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setisLoading(true);
        try {
            await fetchAPI('/teamPlayer/create', 'POST', teamPlayerData);
            setisLoading(false);
            closeFunction();
            window.location.reload();
        } catch (error) {
            if (error.message) { toast.error(error.message); setisLoading(false); }
            else closeFunction();
        }
    };

    return (
        <ModalWrapper closing={closing}>
            <style>{`
                @keyframes modalIn{from{opacity:0;transform:scale(0.92) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
                @keyframes modalOut{from{opacity:1;transform:scale(1) translateY(0)}to{opacity:0;transform:scale(0.92) translateY(16px)}}
            `}</style>
            <div style={{ ...s.card, animation: `${closing ? 'modalOut' : 'modalIn'} 0.22s ease both` }}>
                {isLoading && (
                    <div style={s.loader}>
                        <img src="/loading.gif" alt="" style={{ width: 80 }} />
                    </div>
                )}

                <div style={s.topBar}>
                    <div style={s.titleRow}>
                        <div style={s.dot} />
                        <span style={s.title}>Add Player to {selectedTeam.team_name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={s.pointsBadge}>
                            <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: '600' }}>Available Pts</span>
                            <span style={{ fontSize: '1rem', fontWeight: '900', color: '#7c3aed', lineHeight: 1 }}>{selectedTeam.remaining_points_available}</span>
                        </div>
                        <button style={s.closeBtn} onClick={handleClose}>✕</button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={s.form}>
                    <div style={s.grid}>
                        {newTeamPlayer.inputColumns.map((input) => (
                            <div key={input.name} style={{ ...s.field, position: 'relative' }}>
                                <label style={s.label}>{input.label}</label>
                                <input
                                    name={input.name} type={input.type}
                                    required={input.required} disabled={input.disabled}
                                    value={teamPlayerData[input.name]}
                                    onChange={handleInputChange}
                                    placeholder={input.name === 'player_no' ? 'Search by name or ID' : ''}
                                    autoComplete="off"
                                    style={{ ...s.input, ...(input.disabled ? s.inputDim : {}) }}
                                />
                                {input.name === 'player_no' && playerData && (
                                    <div style={s.suggestion} onClick={() => {
                                        setTeamPlayerData({ ...teamPlayerData, player_name: playerData.name, player_no: playerData.id });
                                        setPlayerData(null);
                                    }}>
                                        <img src={playerData.player_photo} alt="" style={s.suggImg} />
                                        <div>
                                            <p style={s.suggName}>{playerData.name}</p>
                                            <p style={s.suggSub}>
                                                <span style={s.suggBadge}>{playerData.player_role}</span>
                                                {playerData.area}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <button type="submit" style={s.submit}>Add Player</button>
                </form>
            </div>
        </ModalWrapper>
    );
}

const s = {
    card: {
        position: 'relative', width: '560px', maxWidth: '95vw',
        background: '#fff', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        overflow: 'hidden',
    },
    loader: {
        position: 'absolute', inset: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.85)', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
    },
    topBar: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 20px 12px', borderBottom: '1px solid #f1f5f9',
    },
    titleRow: { display: 'flex', alignItems: 'center', gap: '10px' },
    dot: { width: '4px', height: '20px', borderRadius: '999px', background: 'linear-gradient(180deg,#7c3aed,#db2777)' },
    title: { fontSize: '0.95rem', fontWeight: '800', color: '#1e293b' },
    closeBtn: {
        background: '#f1f5f9', border: 'none', color: '#64748b',
        width: '28px', height: '28px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem',
    },
    pointsBadge: {
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        background: '#ede9fe', borderRadius: '8px', padding: '4px 12px',
    },
    form: { padding: '16px 20px' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' },
    field: { display: 'flex', flexDirection: 'column', gap: '4px' },
    label: { fontSize: '0.65rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' },
    input: {
        padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #e2e8f0',
        fontSize: '0.88rem', color: '#1e293b', background: '#fff', outline: 'none',
        transition: 'border-color 0.15s', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    },
    inputDim: { background: '#f8fafc', color: '#94a3b8', boxShadow: 'none' },
    suggestion: {
        position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
        background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0',
        boxShadow: '0 12px 32px rgba(0,0,0,0.12)', padding: '12px',
        display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer',
        marginTop: '6px', transition: 'background 0.15s',
    },
    suggImg: {
        width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover',
        flexShrink: 0, border: '2px solid #f1f5f9',
    },
    suggName: { margin: 0, fontWeight: '800', fontSize: '0.9rem', color: '#1e293b' },
    suggSub: { margin: '3px 0 0', fontSize: '0.72rem', color: '#64748b', display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'nowrap', overflow: 'hidden' },
    suggBadge: {
        display: 'inline-block', padding: '1px 7px', borderRadius: '999px',
        background: '#ede9fe', color: '#7c3aed', fontSize: '0.68rem', fontWeight: '700',
        whiteSpace: 'nowrap', flexShrink: 0,
    },
    submit: {
        width: '100%', padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer',
        background: 'linear-gradient(135deg,#7c3aed,#db2777)',
        color: '#fff', fontWeight: '700', fontSize: '0.88rem',
        boxShadow: '0 4px 14px rgba(124,58,237,0.3)',
    },
};
