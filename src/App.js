import './app.css';
import { useEffect, useState } from 'react';
import { fetchAPI } from './utils/commonServices';

// Components
import Footer from './components/Footer';
import LoadingScreen from './commonComponents/LoadingScreen';
import Button from './commonComponents/Button';

export default function Home() {
    // States
    const [isLoading, setIsLoading] = useState(true);
    const [configValues, setconfigValues] = useState({});

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
        initialDataRetrival();
    }, []);

    // Loading Component
    if (isLoading) {
        return (
            <div className="h-screen w-screen">
                <LoadingScreen />
            </div>
        );
    }

    return (
        <main className="flex h-screen w-full flex-col justify-between bg-gray-200">
            {/* Body */}
            <div className="flex h-2/3 flex-col items-center justify-center">
                {/* Logo Image */}
                <a href="/Dashboard">
                    <img className="relative m-5 outline-none" src={configValues.logo} alt="Next.js Logo" width={250} height={250} />
                </a>

                {/* Button */}
                <div className="flex flex-col items-center">
                    <Button
                        title={`Register for ${configValues.appName} 🏆`}
                        onClick={() => (window.location.href = configValues.remainingSlots <= 0 ? '#' : `/playerRegister`)}
                        className="bg-gray-800 text-white"
                    />

                    {/* Remaining Slots */}
                    <span className="mt-3 text-xs tracking-wide text-orange-700">Remaininig Slots - {configValues.remainingSlots}</span>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </main>
    );
}
