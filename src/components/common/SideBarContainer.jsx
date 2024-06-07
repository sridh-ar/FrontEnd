import SideBar from '../SideBar';
import LoadingScreen from './LoadingScreen';

export default function SidebarContainer({ children, isLoading = true }) {
    return (
        <main className="flex bg-gray-200 h-screen w-screen">
            {/* SideBar */}
            <section className="w-[17%] h-screen fixed z-50 overflow-x-hidden">
                <SideBar />
            </section>
            {/* Body */}
            <section className="w-[83%] h-screen ml-[17%] overflow-x-hidden">
                {isLoading && <LoadingScreen />}
                {!isLoading && children}
            </section>
        </main>
    );
}
