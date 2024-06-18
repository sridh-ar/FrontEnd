export default function ModalWrapper({ children }) {
    return (
        <div className="justify-centerbg-opacity-20 fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50 p-2 py-10">
            {children}
        </div>
    );
}
