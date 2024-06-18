import { useState } from 'react';
import Icon from '../../commonComponents/Icon';
import { fetchAPI } from '../../utils/commonServices';
import toast from 'react-hot-toast';

export default function AppConfigInput({ config = {}, addConfig = false }) {
    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState(config.config_value);
    const [configDetails, setConfigDetails] = useState({ config_name: '', config_value: '' });

    // Functions
    async function handleEditSave() {
        try {
            if (addConfig) {
                if (configDetails.config_name.length < 1 || configDetails.config_value.length < 1) {
                    toast.error('Invalid Config Name/Value');
                    return;
                }
                await fetchAPI('/admin/create', 'POST', configDetails);
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
            console.log('[AppConfigInput] Error - ', error.stack);
        }
    }

    async function handleDelete() {
        try {
            await fetchAPI(`/admin/delete/${config.config_name}`, 'PUT');
            window.location.reload();
        } catch (error) {
            toast.error(error.message);
            console.log('[AppConfigInput] Error - ', error.stack);
        }
        setEditMode(false);
    }

    if (addConfig) {
        return (
            <div className="flex w-full items-center justify-evenly">
                <input
                    type="text"
                    value={configDetails.config_name}
                    onChange={(event) => setConfigDetails({ ...configDetails, config_name: event.target.value })}
                    placeholder="Config Name"
                    className="my-3 w-[40%] rounded-md border-[1px] border-black border-opacity-10 bg-gray-100 p-2 px-4 capitalize shadow outline-none"
                />
                <>
                    <input
                        type="text"
                        value={configDetails.config_value}
                        placeholder="Config Value"
                        onChange={(event) => setConfigDetails({ ...configDetails, config_value: event.target.value })}
                        className={`my-3 w-[40%] rounded-md border-[1px] border-black border-opacity-10 bg-gray-100 p-2 px-4 shadow-inner outline-none ${editMode ? 'ring-1 ring-black' : ''}`}
                    />

                    <Icon icon="DocumentPlusIcon" size={5} className="fill-green-800" onClick={handleEditSave} tooltip="Create" />
                    <Icon
                        icon="XMarkIcon"
                        size={5}
                        className="fill-red-600"
                        onClick={() => setConfigDetails({ config_name: '', config_value: '' })}
                        tooltip="Clear"
                    />
                </>
            </div>
        );
    }

    return (
        <div className="flex w-full items-center justify-evenly">
            <input
                type="text"
                value={config.config_name}
                disabled
                className="my-3 w-[40%] rounded-md border-[1px] border-black border-opacity-10 bg-gray-100 p-2 px-4 capitalize shadow outline-none"
            />
            <>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    disabled={!editMode}
                    className={`my-3 w-[40%] rounded-md border-[1px] border-black border-opacity-10 bg-gray-100 p-2 px-4 shadow-inner outline-none ${editMode ? 'ring-1 ring-black' : ''}`}
                />
                <Icon
                    icon={editMode ? 'CheckIcon' : 'PencilSquareIcon'}
                    size={5}
                    className="fill-green-800"
                    onClick={handleEditSave}
                    tooltip={editMode ? 'Save' : 'Edit'}
                />
                <Icon icon="TrashIcon" size={5} className="fill-red-600" onClick={handleDelete} tooltip="Delete" />
            </>
        </div>
    );
}
