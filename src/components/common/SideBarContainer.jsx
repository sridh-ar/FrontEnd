import { SIDEBAR_MENUS } from '../../utils/constants';
import Icon from './Icon';
import LoadingScreen from './LoadingScreen';

export default function SidebarContainer({ children, isLoading = true }) {
    let menuName = '';
    const url = window.location.href.toLowerCase();

    return (
        <main className="bg-white flex w-screen h-screen">
            {/* Side Bar */}
            <section className="min-h-screen bg-white flex flex-col justify-between py-3 items-center w-[3.5%]">
                {/* Logo */}
                <img src="/logo.png" alt="Next.js Logo" className="w-14" />

                {/* Menus Icons */}
                <div className="flex flex-col gap-6 w-full">
                    {SIDEBAR_MENUS.map((item, index) => {
                        const isActive = url.includes(item.name.toLowerCase());
                        menuName = isActive ? item.name : menuName;
                        return (
                            <button
                                className={`text-gray-400 border-l-2 flex justify-center ${isActive ? 'border-[#8ccc45]' : ''}`}
                                onClick={() => (window.location.href = `/${item.name.toLowerCase()}`)}
                                disabled={isActive}
                                key={index}
                            >
                                <Icon icon={item.icon} size={5} className={isActive ? 'text-[#8ccc45]' : 'text-[#aab4c3]'} />
                            </button>
                        );
                    })}
                </div>

                {/* Account */}
                <Icon icon="ArrowLeftStartOnRectangleIcon" className="text-[#aab4c3]" size={6} />
            </section>

            {/* Container */}
            <section className="bg-white w-full">
                {/* NavBar */}
                <nav className="h-[9%] flex items-center justify-between px-5">
                    <p className="font-semibold tracking-wider">{menuName}</p>
                    <Icon icon="UserCircleIcon" size={8} />
                </nav>

                {/* Component */}
                <div className="bg-[#ecf0f6] rounded-tl-[60px] h-[90%] overflow-auto">
                    {isLoading && <LoadingScreen />}
                    {!isLoading && children}
                </div>
            </section>
        </main>
    );
}
