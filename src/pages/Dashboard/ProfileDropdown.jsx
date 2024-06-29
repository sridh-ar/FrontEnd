import { jwtDecode } from 'jwt-decode';
import { motion } from 'framer-motion';
import { animations } from '../../utils/animationConstant';

export default function ProfileDropdown() {
    const token = localStorage.getItem('token') || '';
    const userDetail = jwtDecode(token);

    function handleSignOut() {
        localStorage.removeItem('token');
        window.location.replace('/signin');
    }
    return (
        <motion.main
            className="absolute right-0 top-11 z-50 min-w-48 divide-y-[1px] rounded-lg bg-white text-sm shadow"
            initial="hidden"
            animate="visible"
            variants={animations.profileDropdown}
        >
            <section className="p-4">
                <p className="my-1 px-2 capitalize">{userDetail.name}</p>
                <p className="px-2 text-xs lowercase">{userDetail.email}</p>
            </section>
            <section className="p-4">
                <p className="cursor-pointer rounded p-2 hover:bg-slate-200">Your Profile</p>
                <p className="cursor-pointer rounded p-2 hover:bg-slate-200" onClick={handleSignOut}>
                    Sign Out
                </p>
            </section>
        </motion.main>
    );
}
