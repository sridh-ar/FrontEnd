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
}) {
    if (type == 'select') {
        return (
            <div key={index} className={`flex w-full flex-col justify-center gap-1 text-sm ${hidden ? 'hidden' : ''}`}>
                <label>
                    {label}
                    {required && <span className="text-red-600">{' *'}</span>}
                </label>
                <select
                    className="my-2 h-9 w-full rounded-full bg-gray-200 p-2 px-4 outline-none ring-1 ring-indigo-100"
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
                <div className="flex h-9 w-full rounded-full bg-gray-200 p-2 px-4 outline-none ring-1 ring-indigo-100">
                    <Icon icon="ArrowUpTrayIcon" size={5} />
                    <input
                        className={`ml-3 h-full w-full file:hidden`}
                        type={type}
                        name={idName}
                        value={value}
                        placeholder={label}
                        onChange={onChange}
                        required={required}
                        disabled={disabled}
                    />
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
                className={`h-9 w-full rounded-full bg-gray-200 p-2 px-4 outline-none ring-1 ring-indigo-100`}
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
