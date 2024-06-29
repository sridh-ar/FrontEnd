import { EnvelopeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { fetchAPI } from '../../utils/commonServices';
import toast from 'react-hot-toast';
import Button from '../../commonComponents/Button';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { animations } from '../../utils/animationConstant';

export default function SignIn() {
    const [buttonLoading, setButtonLoading] = useState(false);
    async function handleSubmit(event) {
        setButtonLoading(true);
        event.preventDefault();
        const payload = {
            email: event.target[0].value,
            password: event.target[1].value,
        };

        try {
            const authResponse = await fetchAPI('/auth/login', 'POST', payload);
            localStorage.setItem('token', authResponse);
            window.location.href = '/dashboard';
        } catch (error) {
            toast.error(error.message);
            console.error('[SignIn.jsx][HandleSubmit] Error - ', error.message);
        } finally {
            setButtonLoading(false);
        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-slate-300">
            <motion.form
                className="flex w-[80%] flex-col items-center justify-center rounded-lg bg-white p-2 lg:w-[50%] lg:flex-row"
                onSubmit={handleSubmit}
                initial="hidden"
                animate="visible"
                variants={animations.signInAnimation}
            >
                <img src="/login_logo.jpg" />

                <div className="flex flex-col items-center justify-center gap-4">
                    <p className="text-lg font-semibold">👩‍🚀 Administrator Login</p>

                    {/* Email */}
                    <div className="flex w-full items-center justify-center rounded-full bg-gray-200 p-2 px-4">
                        <EnvelopeIcon height={20} width={20} />
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Email"
                            className="mx-2 w-full bg-gray-200 text-sm outline-0"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex w-full items-center justify-center rounded-full bg-gray-200 p-2 px-4">
                        <EyeSlashIcon height={20} width={20} />
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Password"
                            className="mx-2 w-full bg-gray-200 text-sm outline-0"
                        />
                    </div>

                    <Button title="Login" className="h-7 w-full rounded-full bg-green-400" type="submit" isLoading={buttonLoading} />
                </div>
            </motion.form>
        </div>
    );
}
