import { useEffect, useState, useRef } from 'react';
import { fetchAPI, uploadToGit } from '../../utils/commonServices';
import makePayment from './RazorPay_Gateway';
import toast from 'react-hot-toast';
import ImageCropper from '../../commonComponents/ImageCropper';
import LoadingScreen from '../../commonComponents/LoadingScreen';

const STEPS = ['Personal', 'Cricket', 'Photo & Terms'];

const initialData = {
    name: '', age: '', contact_number: '', team_name: '', area: '',
    jersey_name: '', jersey_no: '', jersey_size: 'Small',
    player_role: 'All Rounder', batting_style: 'N/A', bowling_style: 'N/A',
    player_photo: '', approved: false,
};

function FloatInput({ label, name, type = 'text', value, onChange, required, disabled }) {
    const [focused, setFocused] = useState(false);
    const filled = value !== '' && value !== undefined;
    return (
        <div style={s.fieldWrap}>
            <input
                style={{ ...s.input, ...(focused ? s.inputFocused : {}) }}
                type={type}
                name={name}
                value={value}
                required={required}
                disabled={disabled}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                autoComplete="off"
                placeholder=" "
            />
            <label style={{ ...s.floatLabel, ...((focused || filled) ? s.floatLabelUp : {}) }}>
                {label}{required && <span style={{ color: '#f87171' }}> *</span>}
            </label>
        </div>
    );
}

function FloatSelect({ label, name, value, onChange, required, options, hidden }) {
    if (hidden) return null;
    return (
        <div style={s.fieldWrap}>
            <select style={s.select} name={name} value={value} required={required} onChange={onChange}>
                {options.map(o => <option key={o} value={o} style={{ background: '#1a1a2e' }}>{o}</option>)}
            </select>
            <label style={{ ...s.floatLabel, ...s.floatLabelUp }}>{label}</label>
            <span style={s.chevron}>▾</span>
        </div>
    );
}

export default function PlayerRegistration({ editData, closeModal }) {
    const [step, setStep] = useState(0);
    const [dir, setDir] = useState(1);
    const [animating, setAnimating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [isTermAccepted, setIsTermAccepted] = useState(false);
    const [photoError, setPhotoError] = useState(false);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [playerData, setPlayerData] = useState(editData || initialData);
    const formRef = useRef(null);

    useEffect(() => { setTimeout(() => setIsLoading(false), 500); }, []);

    const handleChange = (e) => setPlayerData(p => ({ ...p, [e.target.name]: e.target.value }));

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file || !['jpg', 'jpeg', 'png'].includes(file.name.split('.').pop().toLowerCase())) {
            toast.error('Please upload jpg, jpeg or png'); return;
        }
        const reader = new FileReader();
        reader.addEventListener('load', () => { setUploadedFile(reader.result?.toString() || ''); setPhotoError(false); });
        reader.readAsDataURL(file);
    };

    const goTo = (next) => {
        if (animating) return;
        setDir(next > step ? 1 : -1);
        setAnimating(true);
        setTimeout(() => { setStep(next); setAnimating(false); }, 300);
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (step < STEPS.length - 1) goTo(step + 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!playerData.player_photo && !photoPreview) { setPhotoError(true); return; }
        setIsLoading(true);
        localStorage.removeItem('playerData');
        try {
            fetchAPI('/player/createorupdate', 'POST', playerData).then((data) => {
                localStorage.setItem('playerData', JSON.stringify(playerData));
                const uniqueId = data['id'];
                setIsLoading(false);
                if (editData) { closeModal(); window.location.reload(); }
                else makePayment(playerData.name, playerData.contact_number, 111, uniqueId);
            });
        } catch (error) {
            alert(error.message);
            if (editData) window.location.reload();
            else window.location.replace('/');
        }
    };

    if (isLoading) return <div style={s.page}><LoadingScreen /></div>;

    const showBatting = ['All Rounder', 'Batsman'].includes(playerData.player_role);
    const showBowling = ['All Rounder', 'Bowler'].includes(playerData.player_role);

    const stepContent = [
        // Step 1 — Personal
        <>
            <FloatInput label="Player Name" name="name" value={playerData.name} onChange={handleChange} required />
            <FloatInput label="Age" name="age" type="number" value={playerData.age} onChange={handleChange} required />
            <FloatInput label="Contact Number" name="contact_number" type="number" value={playerData.contact_number} onChange={handleChange} required />
            <FloatInput label="Team Name" name="team_name" value={playerData.team_name} onChange={handleChange} required />
            <FloatInput label="Area" name="area" value={playerData.area} onChange={handleChange} required />
        </>,
        // Step 2 — Cricket
        <>
            <FloatInput label="Jersey Name" name="jersey_name" value={playerData.jersey_name} onChange={handleChange} required />
            <FloatInput label="Jersey No" name="jersey_no" type="number" value={playerData.jersey_no} onChange={handleChange} required />
            <FloatSelect label="Jersey Size" name="jersey_size" value={playerData.jersey_size} onChange={handleChange} required
                options={['Small', 'Medium', 'Large', 'Extra Large(XL)', 'XXL', 'XXXL']} />
            <FloatSelect label="Player Role" name="player_role" value={playerData.player_role} onChange={handleChange} required
                options={['All Rounder', 'Batsman', 'Bowler']} />
            <FloatSelect label="Batting Style" name="batting_style" value={playerData.batting_style} onChange={handleChange}
                options={['N/A', 'Right', 'Left']} hidden={!showBatting} />
            <FloatSelect label="Bowling Style" name="bowling_style" value={playerData.bowling_style} onChange={handleChange}
                options={['N/A', 'Fast', 'Medium', 'Spin']} hidden={!showBowling} />
        </>,
        // Step 3 — Photo & Terms
        <>
            {/* Photo upload */}
            <div style={s.photoUploadWrap}>
                <label style={s.photoLabel}>Player Photo {!editData && <span style={{ color: '#f87171' }}>*</span>}</label>
                <label style={{ ...s.photoBox, ...(photoError ? s.photoBoxError : {}) }}>
                    {(photoPreview || playerData.player_photo)
                        ? <>
                            <img src={photoPreview || playerData.player_photo} alt="preview" style={s.photoPreview} />
                            {isUploading && <div style={s.photoSpinnerOverlay}><div style={s.spinner} /></div>}
                          </>
                        : isUploading
                            ? <div style={s.spinner} />
                            : <div style={s.photoPlaceholder}>
                                <span style={{ fontSize: '2rem' }}>📷</span>
                                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem' }}>Tap to upload</span>
                              </div>
                    }
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
                </label>
            </div>

            {!editData && (
                <div style={s.termsBox}>
                    <p style={s.termsTitle}>Terms & Conditions</p>
                    <ul style={s.termsList}>
                        <li>Registration fee: <span style={{ color: '#facc15' }}>₹111/-</span></li>
                        <li>Must be available for the entire tournament</li>
                        <li>Absence without reason = 2 season ban</li>
                        <li>Chucking = banned from bowling for the tournament</li>
                    </ul>
                    <label style={s.checkRow}>
                        <input type="checkbox" checked={isTermAccepted} required onChange={() => setIsTermAccepted(p => !p)}
                            style={{ accentColor: '#7c3aed', width: 16, height: 16 }} />
                        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
                            I agree to the <a href="/terms" style={{ color: '#a78bfa' }}>terms and conditions</a>
                        </span>
                    </label>
                </div>
            )}
        </>,
    ];

    const isLastStep = step === STEPS.length - 1;

    return (
        <div style={s.page}>
            <div style={s.orb1} /><div style={s.orb2} />
            <div style={s.card}>
                {/* Header */}
                <p style={s.heading}>{editData ? '📝 Edit Player' : '🎭 Player Registration'}</p>

                {/* Step indicators */}
                <div style={s.stepRow}>
                    {STEPS.map((label, i) => (
                        <div key={i} style={s.stepItem}>
                            <div style={{ ...s.stepDot, ...(i <= step ? s.stepDotActive : {}), ...(i === step ? s.stepDotCurrent : {}) }}>
                                {i < step ? '✓' : i + 1}
                            </div>
                            <span style={{ ...s.stepLabel, ...(i === step ? { color: '#a78bfa' } : {}) }}>{label}</span>
                            {i < STEPS.length - 1 && <div style={{ ...s.stepLine, ...(i < step ? s.stepLineActive : {}) }} />}
                        </div>
                    ))}
                </div>

                {/* Animated step content */}
                <form ref={formRef} autoComplete="off" onSubmit={isLastStep ? handleSubmit : handleNext}>
                    <div style={{ ...s.stepContent, ...(animating ? { opacity: 0, transform: `translateX(${dir * 30}px)` } : {}) }}>
                        {stepContent[step]}
                    </div>

                    {/* Navigation */}
                    <div style={s.btnRow}>
                        {step > 0 && (
                            <button type="button" onClick={() => goTo(step - 1)} style={s.btnBack}>← Back</button>
                        )}
                        {!isLastStep && (
                            <button type="submit" style={s.btnNext}>Next →</button>
                        )}
                        {isLastStep && (
                            <button type="submit" disabled={isUploading} style={{ ...s.btnNext, ...s.btnSubmit, ...(isUploading ? { opacity: 0.5, cursor: 'not-allowed' } : {}) }}>
                                Register
                            </button>
                        )}
                        <button type="button" style={s.btnCancel}
                            onClick={() => editData ? closeModal() : window.history.back()}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            {uploadedFile && (
                <ImageCropper
                    uploadedFile={uploadedFile}
                    onChange={async (e) => {
                        const file = e.target.files[0];
                        const imageName = `Player_${Math.floor(Math.random() * 90000) + 10000}.jpg`;
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = async () => {
                            setPhotoPreview(reader.result);
                            setIsUploading(true);
                            try {
                                const downloadUrl = await uploadToGit(imageName, reader.result);
                                setPlayerData(p => ({ ...p, player_photo: downloadUrl }));
                            } catch (err) { toast.error(err.message); }
                            setIsUploading(false);
                        };
                    }}
                    closeModal={() => setUploadedFile(null)}
                />
            )}
        </div>
    );
}

const s = {
    page: {
        minHeight: '100dvh', width: '100%',
        background: '#0f0c29',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem 1rem', boxSizing: 'border-box', position: 'relative', overflow: 'auto',
    },
    orb1: {
        position: 'fixed', top: '5%', left: '-80px', width: '350px', height: '350px',
        borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
    },
    orb2: {
        position: 'fixed', bottom: '80px', right: '-60px', width: '300px', height: '300px',
        borderRadius: '50%', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)',
    },
    card: {
        position: 'relative', width: '100%', maxWidth: '520px',
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '24px', backdropFilter: 'blur(16px)', padding: '1.75rem 1.5rem',
        boxSizing: 'border-box',
    },
    heading: {
        textAlign: 'center', fontSize: '1.15rem', fontWeight: '700',
        color: '#fff', letterSpacing: '0.04em', margin: '0 0 1.5rem',
    },
    stepRow: {
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        marginBottom: '1.75rem', gap: 0,
    },
    stepItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', flex: 1 },
    stepDot: {
        width: '28px', height: '28px', borderRadius: '50%', fontSize: '0.75rem', fontWeight: '700',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)',
        border: '1px solid rgba(255,255,255,0.15)', transition: 'all 0.3s ease', zIndex: 1,
    },
    stepDotActive: { background: 'rgba(124,58,237,0.3)', color: '#a78bfa', border: '1px solid #7c3aed' },
    stepDotCurrent: { background: 'linear-gradient(135deg,#7c3aed,#db2777)', color: '#fff', border: 'none', boxShadow: '0 0 12px rgba(124,58,237,0.6)' },
    stepLabel: { fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', marginTop: '4px', textAlign: 'center' },
    stepLine: {
        position: 'absolute', top: '14px', left: '50%', width: '100%', height: '1px',
        background: 'rgba(255,255,255,0.1)', zIndex: 0,
    },
    stepLineActive: { background: 'linear-gradient(90deg,#7c3aed,#db2777)' },
    stepContent: { transition: 'opacity 0.3s ease, transform 0.3s ease', display: 'flex', flexDirection: 'column', gap: '1rem' },
    // Floating input
    fieldWrap: { position: 'relative', width: '100%' },
    input: {
        width: '100%', height: '52px', background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px',
        color: '#fff', fontSize: '16px', padding: '18px 14px 6px',
        outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
        WebkitAppearance: 'none',
    },
    inputFocused: { borderColor: '#7c3aed', boxShadow: '0 0 0 2px rgba(124,58,237,0.2)' },
    floatLabel: {
        position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
        color: 'rgba(255,255,255,0.35)', fontSize: '0.95rem', pointerEvents: 'none',
        transition: 'all 0.2s ease',
    },
    floatLabelUp: { top: '10px', transform: 'none', fontSize: '0.7rem', color: '#a78bfa' },
    select: {
        width: '100%', height: '52px', background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px',
        color: '#fff', fontSize: '16px', padding: '18px 14px 6px',
        outline: 'none', boxSizing: 'border-box', appearance: 'none', WebkitAppearance: 'none',
    },
    chevron: { position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', pointerEvents: 'none' },
    // Photo
    photoUploadWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' },
    photoLabel: { color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', alignSelf: 'flex-start' },
    photoBox: {
        width: '120px', height: '120px', borderRadius: '50%', cursor: 'pointer',
        border: '2px dashed rgba(124,58,237,0.5)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', overflow: 'hidden', background: 'rgba(124,58,237,0.08)',
        transition: 'border-color 0.2s', position: 'relative',
    },
    photoBoxError: { border: '2px dashed #f87171', background: 'rgba(248,113,113,0.08)' },
    photoPreview: { width: '100%', height: '100%', objectFit: 'cover' },
    photoPlaceholder: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    photoSpinnerOverlay: {
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'rgba(0,0,0,0.45)', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
    },
    spinner: {
        width: '36px', height: '36px', borderRadius: '50%',
        border: '3px solid rgba(255,255,255,0.15)',
        borderTop: '3px solid #a78bfa',
        animation: 'spin 0.8s linear infinite',
    },
    // Terms
    termsBox: {
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px', padding: '1rem',
    },
    termsTitle: { color: '#fff', fontWeight: '700', fontSize: '0.9rem', margin: '0 0 0.5rem' },
    termsList: { color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', paddingLeft: '1.5rem', margin: '0 0 0.75rem', lineHeight: 1.8, listStyleType: 'disc' },
    checkRow: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' },
    // Buttons
    btnRow: { display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'center' },
    btnNext: {
        flex: 1, padding: '12px', borderRadius: '999px', border: 'none', cursor: 'pointer',
        background: 'linear-gradient(135deg,#7c3aed,#db2777)', color: '#fff',
        fontWeight: '700', fontSize: '0.95rem', boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
    },
    btnSubmit: { background: 'linear-gradient(135deg,#059669,#7c3aed)', boxShadow: '0 4px 20px rgba(5,150,105,0.4)' },
    btnBack: {
        padding: '12px 20px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.15)',
        background: 'transparent', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '0.9rem',
    },
    btnCancel: {
        padding: '12px 20px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.1)',
        background: 'transparent', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '0.9rem',
    },
};
