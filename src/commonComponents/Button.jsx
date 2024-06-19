export default function Button({ title = '', className = '', type = 'button', onClick, disabled = false, isLoading = false }) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`inline-flex items-center justify-center rounded-xl bg-black px-6 py-1.5 text-sm tracking-[0.5px] shadow ${className}`}
        >
            {!isLoading ? title : <img src="/loading.gif" alt="Loading" className="w-5" />}
        </button>
    );
}
