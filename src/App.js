import './app.css';
import { useEffect, useState } from 'react';
import { fetchAPI } from './utils/commonServices';

// Components
import Footer from './components/Footer';
import LoadingScreen from './commonComponents/LoadingScreen';
import Button from './commonComponents/Button';

export default function Home() {
    // States
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [configValues, setconfigValues] = useState({});

    async function validateUser() {
        // const res = await validateToken();
        // if (res)
        setLoggedIn(true);
        // else setLoggedIn(false);
    }

    async function initialDataRetrival() {
        const dashBaoardResult = await fetchAPI('/admin/dashboard');

        const configObject = dashBaoardResult.reduce((accumulator, current) => {
            accumulator[current.config_name] = current.config_value;
            return accumulator;
        }, {});

        if (configObject) {
            configObject['remainingSlots'] = configObject.allowedRegistrationCount - configObject.totalRegisteredPlayers;
        }
        console.log(configObject);
        setconfigValues(configObject);
        setIsLoading(false);
    }

    useEffect(() => {
        validateUser();
        initialDataRetrival();
    }, []);

    // Loading Component
    if (isLoading) {
        return (
            <div className="w-screen h-screen">
                <LoadingScreen />
            </div>
        );
    }

    return (
        <main className="flex flex-col justify-between h-screen w-full bg-gray-200">
            {/* Body */}
            <div className="flex flex-col items-center h-2/3 justify-center">
                {/* Logo Image */}
                <a href={loggedIn ? '/Dashboard' : '/signin'}>
                    <img className="relative outline-none m-5" src={configValues.logo} alt="Next.js Logo" width={250} height={250} />
                </a>

                {/* Button */}
                <div className="flex items-center flex-col">
                    <Button
                        title={`Register for ${configValues.appName} 🏆`}
                        onClick={() => (window.location.href = configValues.remainingSlots <= 0 ? '#' : `/playerRegister`)}
                    />

                    {/* Remaining Slots */}
                    <span className="text-xs tracking-wide text-orange-700 mt-3">Remaininig Slots - {configValues.remainingSlots}</span>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </main>
    );
}
