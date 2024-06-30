import { useState } from 'react';
import Icon from './Icon';
import ImageCropper from './ImageCropper';
import toast from 'react-hot-toast';

export default function Input({
    type = 'text',
    index,
    idName,
    label,
    value,
    required = false,
    onChange,
    hidden,
    options = [],
    disabled = false,
    fileName = 'Choose a File',
    placeholder,
}) {
    if (type == 'select') {
        return (
            <div key={index} className={`relative flex w-full flex-col justify-center gap-1 text-sm ${hidden ? 'hidden' : ''}`}>
                <label>
                    {label}
                    {required && <span className="text-red-600">{' *'}</span>}
                </label>
                <select
                    className="my-2 h-9 w-full appearance-none rounded-xl bg-gray-200 p-2 px-4 outline-none ring-1 ring-gray-100"
                    name={idName}
                    value={value}
                    required={required}
                    onChange={onChange}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <Icon icon="ChevronDownIcon" size={4} className="absolute bottom-4 right-3" />
            </div>
        );
    }

    if (type == 'file') {
        const [uploadedFile, setUploadedFile] = useState(null);

        const handleInputChange = async (e) => {
            let imageResult = e.target.files[0];
            if (imageResult && ['jpg', 'jpeg', 'png'].includes(imageResult.name.split('.').pop())) {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    const imageElement = new Image();
                    const imageUrl = reader.result?.toString() || '';
                    imageElement.src = imageUrl;

                    setUploadedFile(imageUrl);
                });
                reader.readAsDataURL(imageResult);
            } else {
                toast.error('Please upload image in jpg, jpeg, png formats');
                return;
            }
        };
        return (
            <>
                <div key={index || idName} className="flex w-full flex-col justify-center gap-2 text-sm">
                    <label>
                        {label}
                        {required && <span className="text-red-600">{' *'}</span>}
                    </label>
                    <div className="flex h-9 w-full items-center rounded-xl bg-gray-200 p-2 px-4 outline-none ring-1 ring-gray-100">
                        <Icon icon="ArrowUpTrayIcon" size={5} />
                        <input
                            className={`z-10 ml-3 h-full w-full opacity-0`}
                            type={type}
                            name={idName}
                            onChange={handleInputChange}
                            required={required}
                            disabled={disabled}
                        />
                        <span className="absolute ml-6">{fileName}</span>
                    </div>
                </div>

                {/* Image Cropper */}
                {uploadedFile && <ImageCropper uploadedFile={uploadedFile} onChange={onChange} closeModal={() => setUploadedFile(null)} />}
            </>
        );
    }

    // Other than Select and file
    return (
        <div key={index || idName} className="flex w-full flex-col justify-center gap-2 text-sm">
            <label>
                {label}
                {required && <span className="text-red-600">{' *'}</span>}
            </label>
            <input
                className={`h-9 w-full appearance-none rounded-xl bg-gray-200 p-2 px-4 outline-none ring-1 ring-gray-100`}
                type={type}
                name={idName}
                value={value}
                placeholder={placeholder || label}
                onChange={onChange}
                required={required}
                disabled={disabled}
            />
        </div>
    );
}
