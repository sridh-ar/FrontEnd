import { useEffect, useState } from 'react';
import ProfileDropdown from '../pages/Dashboard/ProfileDropdown';
import { SIDEBAR_MENUS } from '../utils/constants';
import Icon from './Icon';
import LoadingScreen from './LoadingScreen';
import { set } from 'lodash';
import toast from 'react-hot-toast';

export default function SidebarContainer({ children, isLoading = true }) {
    const [openUserModal, setOpenUserModal] = useState(false);
    const [isValidToken, setIsValidToken] = useState(false);
    let menuName = '';
    const url = window.location.href.toLowerCase();

    useEffect(() => {
        // Validate User Login
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Demo');
            window.location.href = '/signin';
        } else {
            setIsValidToken(true);
        }
    }, []);

    if (!isValidToken) {
        return <main className="flex h-screen w-screen bg-white" />;
    }

    return (
        <main className="flex h-screen w-screen bg-white">
            {/* Side Bar */}
            <section className="flex min-h-screen w-[3.5%] flex-col items-center justify-between bg-white py-3">
                {/* Logo */}
                <div></div>
                <div className="absolute left-2 top-3 h-12 w-16">
                    {/* <img src="/logo.svg" alt="Next.js Logo" className="object-cover" /> */}
                    <svg
                        width="50px"
                        height="50px"
                        viewBox="-2.45 0 2452.5 2452.5"
                        enable-background="new 0 0 2447.6 2452.5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000000"
                    >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            {' '}
                            <g clip-rule="evenodd" fill-rule="evenodd">
                                {' '}
                                <path
                                    d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z"
                                    fill="#36c5f0"
                                ></path>{' '}
                                <path
                                    d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z"
                                    fill="#2eb67d"
                                ></path>{' '}
                                <path
                                    d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z"
                                    fill="#ecb22e"
                                ></path>{' '}
                                <path
                                    d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0"
                                    fill="#e01e5a"
                                ></path>{' '}
                            </g>{' '}
                        </g>
                    </svg>
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
                <div />
            </section>

            {/* Container */}
            <section className="w-full bg-white">
                {/* NavBar */}
                <nav className="ml-3 flex h-[9%] items-center justify-between px-5">
                    <p className="font-semibold tracking-wider">{menuName} Menu</p>
                    {/* User Profile */}
                    <div className="relative right-5">
                        <img
                            src="/profile.jpg"
                            alt=""
                            className="w-10 cursor-pointer rounded-full"
                            onClick={() => setOpenUserModal(!openUserModal)}
                        />
                        {openUserModal && <ProfileDropdown />}
                    </div>
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
