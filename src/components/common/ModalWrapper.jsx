export default function ModalWrapper({ children }) {
    return (
        <div className=" bg-black p-2 py-10 fixed inset-0 z-50 bg-opacity-50 flex items-center justify-centerbg-opacity-20 justify-center w-screen h-screen">
            {children}
        </div>
    );
}
