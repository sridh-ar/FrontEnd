export default function LoadingScreen({ className }) {
    return (
        <div className={`flex flex-col items-center justify-center w-full h-full z-50 ${className}`}>
            <img src="/loading.gif" alt="" className="w-24" />
        </div>
    );
}
