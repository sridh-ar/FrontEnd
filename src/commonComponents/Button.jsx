export default function Button({ title = '', className = 'bg-black', type = 'button', onClick, disabled = false, isLoading = false }) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`text-white shadow tracking-[0.5px] rounded-full text-sm inline-flex items-center justify-center px-6 py-1.5 bg-black ${className}`}
        >
            {!isLoading ? title : <img src="/loading.gif" alt="Loading" className="w-5" />}
        </button>
    );
}
