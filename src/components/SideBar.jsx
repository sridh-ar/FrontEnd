/* eslint-disable no-restricted-globals */
import logo from '../images/New_Logo.png';
import Icon from './common/Icon';

export default function SideBar() {
    // State Variables
    const url = window.location.href.toLowerCase();

    return (
        <main className="bg-[#54AAB3] w-full h-screen text-white flex flex-col justify-between">
            <section>
                {/* Logo */}
                <img src={logo} alt="Next.js Logo" className="px-5 py-3" />

                {/* Divider */}
                <div className="w-full h-[0.5px] bg-gray-200 mb-6"></div>

                {/* Menus */}
                {[
                    { name: 'Dashboard', icon: 'HomeModernIcon' },
                    { name: 'Players', icon: 'UserGroupIcon' },
                    { name: 'Admin', icon: 'CogIcon' },
                ].map((item, index) => {
                    const isActive = url.includes(item.name.toLowerCase());
                    return (
                        <a
                            className={`ml-4 pl-5 flex cursor-pointer gap-2 w-full p-2 my-1 text-sm font-medium rounded-l-full relative ${isActive ? 'text-black bg-gray-200' : 'text-white'}`}
                            href={isActive ? '#' : `/${item.name.toLowerCase()}`}
                            key={index}
                        >
                            {isActive && (
                                <>
                                    <div className="bg-gray-200 absolute transition-colors duration-300 h-5 w-5 -top-5 z-10 right-4">
                                        <div className="bg-[#54AAB3] transition-colors duration-300 h-5 w-5 rounded-br-2xl"></div>
                                    </div>
                                    <div className="bg-gray-200 absolute transition-colors duration-300 h-5 w-5 -bottom-5 z-10 right-4">
                                        <div className="bg-[#54AAB3] transition-colors duration-300 h-5 w-5 rounded-tr-2xl"></div>
                                    </div>
                                </>
                            )}
                            <Icon icon={item.icon} outline className="white" />
                            {item.name}
                        </a>
                    );
                })}
            </section>

            {/* Account */}
            <section className="w-full my-3">
                <div className="w-full h-[0.5px] bg-gray-200 my-1.5"></div>
                <section className="flex justify-start items-center gap-2 text-sm px-2">
                    <Icon icon="UserCircleIcon" className="text-white" size={10} />
                    <span>
                        <p className="relative top-1">Sridhar</p>
                        <span className="text-[10px] m-0">SridharKeerthiga99@gmail.com</span>
                    </span>
                </section>
            </section>
        </main>
    );
}
