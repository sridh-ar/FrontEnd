import Icon from './Icon';

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
        return (
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
                        onChange={onChange}
                        required={required}
                        disabled={disabled}
                    />
                    <span className="absolute ml-6">{fileName}</span>
                </div>
            </div>
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
                placeholder={label}
                onChange={onChange}
                required={required}
                disabled={disabled}
            />
        </div>
    );
}
