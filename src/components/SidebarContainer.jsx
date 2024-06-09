import { SIDEBAR_MENUS } from '../utils/constants';
import Icon from './common/Icon';

export default function SidebarContainer({ childern }) {
    const url = window.location.href.toLowerCase();

    return (
        <main className="bg-white flex w-screen h-screen">
            {/* Side Bar */}
            <section id="SideBar" className="min-h-screen bg-white flex flex-col justify-between py-3 p-0.5 items-center">
                {/* Logo */}
                <img src="/logo.png" alt="Next.js Logo" className="w-14" />

                {/* Menus Icons */}
                <div className="flex flex-col gap-6 w-full">
                    {SIDEBAR_MENUS.map((item, index) => {
                        const isActive = url.includes(item.name.toLowerCase());
                        return (
                            <button
                                className={`text-gray-400 border-l-2 flex justify-center py-1 px-4 ${isActive ? 'border-[#8ccc45]' : ''}`}
                                onClick={() => (window.location.href = `/${item.name.toLowerCase()}`)}
                                disabled={isActive}
                                key={index}
                            >
                                <Icon icon={item.icon} size={6} className={isActive ? 'text-[#8ccc45]' : ''} />
                            </button>
                        );
                    })}
                </div>

                {/* Account */}
                <Icon icon="ArrowLeftStartOnRectangleIcon" className="text-black" size={6} />
            </section>

            {/* Container */}
            <section className="bg-white w-full">
                {/* NavBar */}
                <nav className="h-[10%] flex items-center justify-between px-5">
                    <p className="font-semibold tracking-wider">Dashboard</p>
                    <Icon icon="UserCircleIcon" size={8} />
                </nav>

                {/* Component */}
                <div className="bg-[#ecf0f6] rounded-tl-[60px] h-[90%] overflow-y-scroll p-5">{childern}</div>
            </section>
        </main>
    );
}
