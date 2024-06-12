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
        <div className="flex items-center justify-center h-screen">
            <img src="/login_bg.jpg" className="absolute -z-10 w-full h-full" />

            <form
                // className="container bg-white sm:w-2/6 p-5 "
                className="bg-white rounded-lg flex flex-col p-2 items-center justify-center lg:flex-row w-[80%] lg:w-[50%]"
                onSubmit={handleSubmit}
            >
                <img src="/login_logo.jpg" className=" w-[50%]" />

                <div className="flex flex-col items-center justify-center ">
                    <p className="font-semibold text-lg m-5">Admin Login</p>

                    {/* Email */}
                    <div className=" bg-gray-200 flex items-center justify-center rounded-full p-2 px-4 m-2 w-full">
                        <EnvelopeIcon height={20} width={20} />
                        <input type="email" required placeholder="Email" className=" outline-0 mx-2 bg-gray-200 text-sm w-full" />
                    </div>

                    {/* Password */}
                    <div className="bg-gray-200 flex items-center justify-center rounded-full p-2 px-4 m-2 w-full">
                        <EnvelopeIcon height={20} width={20} />
                        <input type="password" required placeholder="Password" className="outline-0 mx-2 bg-gray-200 text-sm w-full" />
                    </div>

                    <button type="submit" required className="w-full mx-2 bg-green-400 text-sm p-1 px-4 m-2 rounded-full">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
