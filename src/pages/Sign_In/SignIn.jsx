'use client';
import { useRouter } from 'next/navigation';
import { EnvelopeIcon } from '@heroicons/react/24/solid';

export default function SignIn() {
    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();
        let values = [];
        for (let i = 0; i < 2; i++) {
            values.push(event.target[i].value);
        }
        fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('aauutthh', data);
                router.push('/Dashboard');
            })
            .catch((error) => console.error(error));
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <img src="/login_bg.jpg" className="absolute -z-10 h-full w-full" />

            <form
                // className="container bg-white sm:w-2/6 p-5 "
                className="flex w-[80%] flex-col items-center justify-center rounded-lg bg-white p-2 lg:w-[50%] lg:flex-row"
                onSubmit={handleSubmit}
            >
                <img src="/login_logo.jpg" className="w-[50%]" />

                <div className="flex flex-col items-center justify-center">
                    <p className="m-5 text-lg font-semibold">Admin Login</p>

                    {/* Email */}
                    <div className="m-2 flex w-full items-center justify-center rounded-full bg-gray-200 p-2 px-4">
                        <EnvelopeIcon height={20} width={20} />
                        <input type="email" required placeholder="Email" className="mx-2 w-full bg-gray-200 text-sm outline-0" />
                    </div>

                    {/* Password */}
                    <div className="m-2 flex w-full items-center justify-center rounded-full bg-gray-200 p-2 px-4">
                        <EnvelopeIcon height={20} width={20} />
                        <input type="password" required placeholder="Password" className="mx-2 w-full bg-gray-200 text-sm outline-0" />
                    </div>

                    <button type="submit" required className="m-2 mx-2 w-full rounded-full bg-green-400 p-1 px-4 text-sm">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
