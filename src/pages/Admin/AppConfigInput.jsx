import { useState } from 'react';
import { fetchAPI } from '../../utils/commonServices';
import toast from 'react-hot-toast';

export default function AppConfigInput({ config = {}, addConfig = false }) {
    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState(config.config_value || '');
    const [newConfig, setNewConfig] = useState({ config_name: '', config_value: '' });

    const [saving, setSaving] = useState(false);

    async function handleSave() {
        try {
            setSaving(true);
            if (addConfig) {
                if (!newConfig.config_name || !newConfig.config_value) { toast.error('Invalid Config Name/Value'); return; }
                await fetchAPI('/admin/create', 'POST', newConfig);
                window.location.reload();
            } else if (!editMode) {
                setInputValue(config.config_value);
                setEditMode(true);
            } else if (inputValue !== config.config_value) {
                await fetchAPI(`/admin/update/${config.config_name}`, 'PUT', { config_value: inputValue });
                window.location.reload();
            } else {
                setEditMode(false);
            }
        } catch (error) {
            setEditMode(false);
            toast.error(error.message);
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete() {
        try {
            await fetchAPI(`/admin/delete/${config.config_name}`, 'PUT');
            window.location.reload();
        } catch (error) {
            toast.error(error.message);
        }
    }

    if (addConfig) {
        return (
            <div style={s.row}>
                <input style={s.input} placeholder="Config name" value={newConfig.config_name}
                    onChange={e => setNewConfig({ ...newConfig, config_name: e.target.value })} />
                <input style={s.input} placeholder="Config value" value={newConfig.config_value}
                    onChange={e => setNewConfig({ ...newConfig, config_value: e.target.value })} />
                <button style={s.saveBtn} onClick={handleSave}>+ Add</button>
                <button style={s.ghostBtn} onClick={() => setNewConfig({ config_name: '', config_value: '' })}>Clear</button>
            </div>
        );
    }

    return (
        <div style={s.row}>
            <input style={{ ...s.input, ...s.inputDim }} value={config.config_name} disabled />
            <input style={{ ...s.input, ...(editMode ? s.inputActive : s.inputDim) }}
                value={inputValue} disabled={!editMode}
                onChange={e => setInputValue(e.target.value)} />
            <button style={s.saveBtn} disabled={saving} onClick={handleSave}>
                {saving ? '⏳' : editMode ? 'Save' : 'Edit'}
            </button>
            {editMode && <button style={s.ghostBtn} onClick={() => { setEditMode(false); setInputValue(config.config_value); }}>Cancel</button>}
            {!editMode && <button style={s.deleteBtn} onClick={handleDelete}>Delete</button>}
        </div>
    );
}

const s = {
    row: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' },
    input: {
        flex: 1, padding: '0.5rem 0.75rem', borderRadius: '6px',
        border: '1.5px solid #e2e8f0', fontSize: 'clamp(0.75rem, 1.2vmin, 1rem)', color: '#1e293b',
        background: '#fff', outline: 'none',
    },
    inputDim: { background: '#f8fafc', color: '#94a3b8' },
    inputActive: { borderColor: '#7c3aed', boxShadow: '0 0 0 3px rgba(124,58,237,0.1)' },
    saveBtn: {
        padding: '0.45rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer',
        background: 'linear-gradient(135deg,#7c3aed,#db2777)', color: '#fff',
        fontWeight: '700', fontSize: 'clamp(0.75rem, 1.1vmin, 0.95rem)', whiteSpace: 'nowrap',
    },
    deleteBtn: {
        padding: '0.45rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer',
        background: '#fee2e2', color: '#dc2626', fontWeight: '700', fontSize: 'clamp(0.75rem, 1.1vmin, 0.95rem)', whiteSpace: 'nowrap',
    },
    ghostBtn: {
        padding: '0.45rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer',
        background: '#f1f5f9', color: '#64748b', fontWeight: '700', fontSize: 'clamp(0.75rem, 1.1vmin, 0.95rem)', whiteSpace: 'nowrap',
    },
};
