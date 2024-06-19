import { useEffect, useState } from 'react';
import { uploadBytes, ref, getStorage, getDownloadURL } from 'firebase/storage';
import { firebaseApp } from '../../utils/firebase';
import { ArrowUpTrayIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { registration } from '../../utils/constants';

// Components
import LoadingScreen from '../../commonComponents/LoadingScreen';
import Input from '../../commonComponents/Input';
import Button from '../../commonComponents/Button';
import Icon from '../../commonComponents/Icon';
import { fetchAPI } from '../../utils/commonServices';

export default function PlayerRegistration() {
    // States
    const [isLoading, setisLoading] = useState(true);
    const [isTermAccepted, setisTermAccepted] = useState(false);
    const [isUploading, setisUploading] = useState(false);

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
            setisUploading(true);
            let imageResult = e.target.files[0];
            const storage = getStorage(firebaseApp);
            const imageRef = ref(storage, `kpl/Player_${Math.floor(Math.random() * 90000) + 10000}`);
            await uploadBytes(imageRef, imageResult).then(async (res) => {
                await getDownloadURL(res.ref).then((res) => {
                    value = res;
                    setisUploading(false);
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
            await fetchAPI('/player/create', 'POST', playerData);
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
            <div className="h-screen w-screen">
                <LoadingScreen />
            </div>
        );
    }

    return (
        <div className="bg-gray-200 p-3">
            <div className="flex w-full flex-col items-center rounded-xl bg-white p-2 py-4">
                {/* Close Icon */}
                <Icon icon="XCircleIcon" className="absolute right-10 top-10" size={8} onClick={() => window.history.back()} />

                {/* Actual Form Body */}
                <p className="my-3 text-lg font-semibold tracking-wider">🎭 Player Registration</p>
                <form className="grid w-full grid-cols-2 gap-3 p-5" onSubmit={handleSubmit}>
                    {/* Inputs */}
                    {registration.inputColumns.map((input, index) => (
                        <Input
                            index={index}
                            type={input.type}
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
                        fileName={playerData.player_photo ? 'Uploaded!' : 'Choose a File'}
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
                    <div className="col-span-2 flex w-full flex-col text-sm">
                        <h3 className="font-bold">Terms & Conditions:</h3>
                        <ol className="relative left-10 my-3 w-[90%] list-disc break-words sm:w-full">
                            <li>Player Registration Amount is Rs.111/-</li>
                            <li>Players Should be available for the whole tournament</li>
                            <li>
                                If the players not available without any valid reason, player cannot participate in the tournament for the
                                next 2 seasons
                            </li>
                            <li>If the player Gets caught for chucking he cannot bowl for the Rest of the tournament</li>
                        </ol>

                        {/* Terms Checkbox */}
                        <div className="mb-5 flex items-start">
                            <input
                                id="terms"
                                type="checkbox"
                                checked={isTermAccepted}
                                className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300"
                                required
                                onChange={() => setisTermAccepted(!isTermAccepted)}
                            />
                            <label htmlFor="terms" className="ml-2 ms-2 text-sm font-medium text-gray-900">
                                I agree with the{' '}
                                <a href="/terms" className="text-blue-600 hover:underline">
                                    terms and conditions
                                </a>
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-2 flex items-center justify-center">
                        <Button title="Submit" className="col-span-2 bg-black px-10 text-white" type="submit" isLoading={isUploading} />
                    </div>
                </form>
            </div>
        </div>
    );
}
