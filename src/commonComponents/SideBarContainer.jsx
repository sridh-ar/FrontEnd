import { SIDEBAR_MENUS } from '../utils/constants';
import Icon from './Icon';
import LoadingScreen from './LoadingScreen';

export default function SidebarContainer({ children, isLoading = true }) {
    let menuName = '';
    const url = window.location.href.toLowerCase();

    return (
        <main className="flex h-screen w-screen bg-white">
            {/* Side Bar */}
            <section className="flex min-h-screen w-[3.5%] flex-col items-center justify-between bg-white py-3">
                {/* Logo */}
                <div className="h-10 w-10 bg-red-200">
                    <img src="/logo.png" alt="Next.js Logo" className="w-10" />
                </div>

                {/* Menus Icons */}
                <div className="flex w-full flex-col gap-6">
                    {SIDEBAR_MENUS.map((item, index) => {
                        const isActive = url.includes(item.name.toLowerCase());
                        menuName = isActive ? item.name : menuName;
                        return (
                            <button
                                className={`flex justify-center border-l-2 text-gray-400 ${isActive ? 'border-[#8ccc45]' : ''}`}
                                onClick={() => (window.location.href = `/${item.name.toLowerCase()}`)}
                                disabled={isActive}
                                key={index}
                            >
                                <Icon icon={item.icon} size={6} className={isActive ? 'text-[#8ccc45]' : 'text-[#aab4c3]'} />
                            </button>
                        );
                    })}
                </div>

                {/* Account */}
                <Icon icon="ArrowLeftStartOnRectangleIcon" className="text-[#aab4c3]" size={6} />
            </section>

            {/* Container */}
            <section className="w-full bg-white">
                {/* NavBar */}
                <nav className="flex h-[9%] items-center justify-between px-5">
                    <p className="font-semibold tracking-wider">{menuName}</p>
                    <Icon icon="UserCircleIcon" size={8} />
                </nav>

                {/* Component */}
                <div className="h-[91%] w-full overflow-hidden rounded-tl-[60px] bg-[#ecf0f6]">
                    {isLoading && <LoadingScreen />}
                    {!isLoading && children}
                </div>
            </section>
        </main>
    );
}
