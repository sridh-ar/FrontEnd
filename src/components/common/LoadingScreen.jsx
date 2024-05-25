import loadingLogo from '../../images/loading.gif'
export default function LoadingScreen({ className }) {
    return (
        <div className={`flex flex-col items-center justify-center w-full h-full z-50 ${className}`}>
            <img src={loadingLogo} alt="" className="w-60" />
        </div>
    )
}