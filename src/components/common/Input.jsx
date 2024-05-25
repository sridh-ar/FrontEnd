export default function Input({ type = "text", index, idName, label, value, required = false, onChange, hidden, options = [] }) {
    if (type == 'select') {
        return (
            <div
                key={index}
                className={`flex flex-col justify-center w-full gap-1 text-sm ${hidden ? 'hidden' : ''}`}
            >
                <label>
                    {label}
                    {required && <span className="text-red-600">{" *"}</span>}
                </label>
                <select
                    className="outline-none p-2 px-4 ring-1 h-9 w-full ring-indigo-100 my-2 rounded-full bg-gray-200"
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
        )
    }

    // Other than Select
    return (
        <div
            key={index || idName}
            className="flex flex-col justify-center w-full gap-2 text-sm"
        >
            <label>
                {label}
                {required && <span className="text-red-600">{" *"}</span>}
            </label>
            <input
                className={`outline-none ring-1 ring-indigo-100 p-2 h-9 w-full px-4 rounded-full bg-gray-200 ${type == 'file' ? 'file:hidden' : ''}`}
                type={type}
                name={idName}
                value={value}
                placeholder={label}
                onChange={onChange}
                required={required}
            />
        </div>
    )
}