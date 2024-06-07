import { useEffect, useState } from 'react';
import { uploadBytes, ref, getStorage, getDownloadURL } from 'firebase/storage';
import { firebaseApp } from '../utils/firebase';
import { ArrowUpTrayIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { registration } from '../utils/constants';

// Components
import LoadingScreen from '../components/common/LoadingScreen';
import CloseIcon from '../components/common/CloseIcon';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function PlayerRegistration() {
    // States
    const [isLoading, setisLoading] = useState(true);
    const [isTermAccepted, setisTermAccepted] = useState(false);

    const [playerData, setPlayerData] = useState({
        name: '',
        dob: '',
        age: '',
        contact_number: '',
        team_name: '',
        area: '',
        jersey_name: '',
        jersey_no: '',
        jersey_size: 'Small',
        player_photo: '',
        player_role: 'All Rounder',
        batting_style: 'N/A',
        bowling_style: 'N/A',
        approved: false,
    });

    // Function to handle changes in input fields
    const handleInputChange = async (e) => {
        let { name, value } = e.target;

        // handle file for upload
        if (name == 'player_photo') {
            let imageResult = e.target.files[0];
            const storage = getStorage(firebaseApp);
            const imageRef = ref(storage, `kpl/Player_${Math.floor(Math.random() * 90000) + 10000}`);
            await uploadBytes(imageRef, imageResult).then(async (res) => {
                await getDownloadURL(res.ref).then((res) => {
                    value = res;
                });
            });
        }

        setPlayerData({
            ...playerData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setisLoading(true);
        localStorage.removeItem('playerData');

        try {
            const response = await fetch('/api/player', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(playerData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit player data, Contact Admin');
            }

            localStorage.setItem('playerData', JSON.stringify(playerData));
            setisLoading(false);
            window.location.replace('/thanks');
        } catch (error) {
            alert(error.message);
            window.location.replace('/');
        }
    };

    useEffect(() => {
        setTimeout(() => setisLoading(false), 500);
    }, []);

    if (isLoading) {
        return (
            <div className="w-screen h-screen">
                <LoadingScreen />
            </div>
        );
    }

    return (
        <div className="bg-gray-200 p-3">
            <div className="bg-white rounded-xl flex flex-col items-center w-full p-2 py-4">
                {/* Close Icon */}
                <CloseIcon className="top-10 right-10" onClick={() => window.history.back()} />

                {/* Actual Form Body */}
                <p className="font-semibold tracking-wider my-3 text-lg">🎭 Player Registration</p>
                <form className="grid grid-cols-2 gap-3 p-5 w-full" onSubmit={handleSubmit}>
                    {/* Inputs */}
                    {registration.inputColumns.map((input, index) => (
                        <Input
                            index={index}
                            key={index}
                            idName={input.name}
                            label={input.label}
                            required={input.required}
                            value={playerData[input.name]}
                            onChange={handleInputChange}
                        />
                    ))}

                    {/* File Upload */}
                    <Input
                        type="file"
                        label="Player Photo"
                        idName="player_photo"
                        required
                        onChange={handleInputChange}
                        icon={<ArrowUpTrayIcon width={20} />}
                    />

                    {/* Selects */}
                    {registration.selectColumns.map((select, index) => (
                        <Input
                            type="select"
                            index={index}
                            key={index}
                            label={select.label}
                            idName={select.name}
                            required={select.required}
                            value={playerData[select.name]}
                            onChange={handleInputChange}
                            options={select.options}
                            hidden={
                                (!['All Rounder', 'Batsman'].includes(playerData['player_role']) && select.name === 'batting_style') ||
                                (!['All Rounder', 'Bowler'].includes(playerData['player_role']) && select.name === 'bowling_style')
                            }
                        />
                    ))}

                    {/* Terms & Conditions */}
                    <div className="w-full flex flex-col text-sm col-span-2">
                        <h3 className="font-bold">Terms & Conditions:</h3>
                        <ol className="list-disc relative left-10 my-3 w-[90%] sm:w-full break-words">
                            <li>Player Registration Amount is Rs.111/-</li>
                            <li>Players Should be available for the whole tournament</li>
                            <li>
                                If the players not available without any valid reason, player cannot participate in the tournament for the
                                next 2 seasons
                            </li>
                            <li>If the player Gets caught for chucking he cannot bowl for the Rest of the tournament</li>
                        </ol>

                        {/* Terms Checkbox */}
                        <div className="flex items-start mb-5">
                            <input
                                id="terms"
                                type="checkbox"
                                checked={isTermAccepted}
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                                required
                                onChange={() => setisTermAccepted(!isTermAccepted)}
                            />
                            <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 ml-2">
                                I agree with the{' '}
                                <a href="/terms" className="text-blue-600 hover:underline">
                                    terms and conditions
                                </a>
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-2 flex items-center justify-center">
                        <Button title="Submit" className="col-span-2 px-10" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
}
