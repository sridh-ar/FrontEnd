import { useState } from 'react';
import { newTeam } from '../../utils/constants';
import { fetchAPI, uploadToGit } from '../../utils/commonServices';
import toast from 'react-hot-toast';
import ModalWrapper from '../../commonComponents/ModalWrapper';
import LoadingScreen from '../../commonComponents/LoadingScreen';

export default function NewTeamModal({ closeFunction, editTeamData }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [closing, setClosing] = useState(false);

    function handleClose() {
        setClosing(true);
        setTimeout(closeFunction, 220);
    }
    const [teamData, setteamData] = useState(
        editTeamData || {
            team_name: '', captain: '', owner: '',
            slots: '15', remaining_slots: '15',
            total_points_available: '6000', remaining_points_available: '6000',
            team_photo: '', owner_photo: '', captain_photo: '',
        }
    );

    const handleInputChange = async (e) => {
        let { name, value } = e.target;
        if (['team_photo', 'owner_photo', 'captain_photo'].includes(name)) {
            setIsImageUploading(true);
            const imageResult = e.target.files[0];
            const imageName = `Team_${Math.floor(Math.random() * 90000) + 10000}.jpg`;
            value = `https://github.com/sridh-ar/Images/blob/main/${imageName}?raw=true`;
            const reader = new FileReader();
            reader.readAsDataURL(imageResult);
            reader.onload = async () => { await uploadToGit(imageName, reader.result); setIsImageUploading(false); };
        }
        setteamData({ ...teamData, [name]: value });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            await fetchAPI('/team/createorupdate', 'POST', teamData);
            toast.success('Team Added Successfully', { duration: 5000 });
            setIsLoading(false);
            closeFunction();
            window.location.reload();
        } catch (error) {
            toast.error('Unable to add New Team.');
            closeFunction();
        }
    }

    return (
        <ModalWrapper closing={closing}>
            <style>{`
                @keyframes modalIn{from{opacity:0;transform:scale(0.92) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}
                @keyframes modalOut{from{opacity:1;transform:scale(1) translateY(0)}to{opacity:0;transform:scale(0.92) translateY(16px)}}
            `}</style>
            <div style={{ ...s.card, animation: `${closing ? 'modalOut' : 'modalIn'} 0.22s ease both` }}>
                {isLoading && (
                    <div style={{ position: 'absolute', inset: 0, zIndex: 100, background: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'inherit' }}>
                        <img src="/loading.gif" alt="" style={{ width: 80 }} />
                    </div>
                )}

                <div style={s.topBar}>
                    <div style={s.titleRow}>
                        <div style={s.dot} />
                        <span style={s.title}>{editTeamData ? 'Edit Team' : 'New Team'}</span>
                    </div>
                    <button style={s.closeBtn} onClick={handleClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit} style={s.form}>
                    <div style={s.grid}>
                        {newTeam.inputColumns.map((input) => (
                            <div key={input.name} style={s.field}>
                                <label style={s.label}>{input.label}</label>
                                <input
                                    name={input.name} type={input.type}
                                    required={input.required} disabled={input.disabled}
                                    value={teamData[input.name]} onChange={handleInputChange}
                                    autoComplete="off"
                                    style={{ ...s.input, ...(input.disabled ? s.inputDim : {}) }}
                                />
                            </div>
                        ))}
                    </div>

                    <p style={s.sectionLabel}>Photos</p>
                    <div style={s.photoRow}>
                        {newTeam.fileUploadInputs.map((input) => (
                            <label key={input.name} style={{ ...s.photoBox, borderColor: teamData[input.name] ? '#10b981' : '#e2e8f0' }}>
                                <span style={{ fontSize: '1.3rem' }}>📷</span>
                                <span style={s.photoName}>{input.label}</span>
                                <span style={{ fontSize: '0.7rem', color: teamData[input.name] ? '#10b981' : '#94a3b8', fontWeight: 600 }}>
                                    {teamData[input.name] ? '✓ Done' : 'Upload'}
                                </span>
                                <input type="file" name={input.name} onChange={handleInputChange} style={{ display: 'none' }} />
                            </label>
                        ))}
                    </div>

                    <button type="submit" disabled={isImageUploading} style={{ ...s.submit, opacity: isImageUploading ? 0.6 : 1 }}>
                        {isImageUploading ? 'Uploading…' : editTeamData ? 'Save Changes' : 'Create Team'}
                    </button>
                </form>
            </div>
        </ModalWrapper>
    );
}

const s = {
    card: {
        position: 'relative', width: '580px', maxWidth: '95vw',
        background: '#fff', borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        overflow: 'hidden',
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
    form: { padding: '14px 20px' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '14px' },
    field: { display: 'flex', flexDirection: 'column', gap: '4px' },
    label: { fontSize: '0.65rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' },
    input: {
        padding: '8px 10px', borderRadius: '8px', border: '1.5px solid #e2e8f0',
        fontSize: '0.85rem', color: '#1e293b', background: '#fff', outline: 'none',
        transition: 'border-color 0.15s', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    },
    inputDim: { background: '#f8fafc', color: '#94a3b8', boxShadow: 'none' },
    sectionLabel: { fontSize: '0.65rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 8px' },
    photoRow: { display: 'flex', gap: '8px', marginBottom: '14px' },
    photoBox: {
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
        padding: '10px 8px', borderRadius: '10px', border: '1.5px dashed',
        cursor: 'pointer', background: '#fafafa',
    },
    photoName: { fontSize: '0.68rem', fontWeight: '600', color: '#475569', textAlign: 'center' },
    submit: {
        width: '100%', padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer',
        background: 'linear-gradient(135deg,#7c3aed,#db2777)',
        color: '#fff', fontWeight: '700', fontSize: '0.88rem',
        boxShadow: '0 4px 14px rgba(124,58,237,0.3)',
    },
};
