export default function ModalWrapper({ children }) {
    return <div className=" bg-black bg-opacity-20 fixed flex justify-center items-center w-screen h-screen z-50">{children}</div>;
}
