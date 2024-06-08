import SideBar from '../SideBar';
import LoadingScreen from './LoadingScreen';

export default function SidebarContainer({ children, isLoading = true }) {
    return (
        <main className="flex bg-gray-200">
            {/* SideBar */}
            <section className="w-[16%] min-h-screen fixed z-50">
                <SideBar />
            </section>
            {/* Body */}
            <section className="w-[82%] min-h-screen ml-[17%]">
                {isLoading && <LoadingScreen />}
                {!isLoading && children}
            </section>
        </main>
    );
}
