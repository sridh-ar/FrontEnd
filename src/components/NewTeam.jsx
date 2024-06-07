'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { uploadBytes, ref, getStorage, getDownloadURL } from 'firebase/storage';
import { firebaseApp } from '../utils/firebase';
import LoadingScreen from './common/LoadingScreen';
import CloseIcon from './common/CloseIcon';
import { newTeam } from '../utils/constants';
import Input from './common/Input';
import Button from './common/Button';
import { fetchAPI } from '../utils/commonServices';
import toast from 'react-hot-toast';

export default function NewTeam({ closeFunction }) {
    const [isLoading, setIsLoading] = useState(false);

    const [teamData, setteamData] = useState({
        team_name: '',
        captain: '',
        owner: '',
        slots: '15',
        remaining_slots: '15',
        total_points_available: '6000',
        remaining_points_available: '6000',
        team_photo: '',
        owner_photo: '',
        captain_photo: '',
    });

    // Function to handle changes in input fields
    const handleInputChange = async (e) => {
        let { name, value } = e.target;

        // handle file for upload
        if (['team_photo', 'owner_photo', 'captain_photo'].includes(name)) {
            let imageResult = e.target.files[0];
            const storage = getStorage(firebaseApp);
            const imageRef = ref(storage, `kpl/Team_${Math.floor(Math.random() * 90000) + 10000}`);
            await uploadBytes(imageRef, imageResult).then(async (res) => {
                await getDownloadURL(res.ref).then((res) => {
                    value = res;
                });
            });
        }

        setteamData({
            ...teamData,
            [name]: value,
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(teamData);
        setIsLoading(true);
        try {
            await fetchAPI('/team/create', 'POST', teamData);
            toast.success('Team Added  Successfully', { duration: 5000 });
            setIsLoading(false);
            closeFunction();
        } catch (error) {
            console.log('[NewTeam.jsx] Error - ', error.stack);
            toast.error('Unable to add New Team.');
            closeFunction();
        }
    }

    return (
        <div className="bg-black p-2 py-10 fixed inset-0 w-full z-50 bg-opacity-50 flex items-center justify-center">
            <motion.div
                className="relative bg-white rounded flex flex-col items-center w-[70%] p-2 overflow-hidden"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                {/* Loading Screen */}
                {isLoading && <LoadingScreen className="absolute bg-white z-[100]" />}

                {/* Close Icon */}
                <CloseIcon className="top-6 right-8" onClick={() => closeFunction()} />

                {/* Form Data */}
                <p className="font-medium my-4 text-lg">👩‍🚀 Team Registration</p>

                <form className="grid grid-cols-2 gap-3 p-5 w-full" onSubmit={handleSubmit}>
                    {/* Inputs */}
                    {newTeam.inputColumns.map((input, index) => (
                        <Input
                            index={index}
                            label={input.label}
                            required={input.required}
                            type={input.type}
                            idName={input.name}
                            value={teamData[input.name]}
                            onChange={handleInputChange}
                            disabled={input.disabled}
                            key={index}
                        />
                    ))}

                    {/* File Upload */}
                    {newTeam.fileUploadInputs.map((input, index) => (
                        <Input
                            index={index}
                            label={input.label}
                            required={input.required}
                            type={input.type}
                            idName={input.name}
                            onChange={handleInputChange}
                            key={index}
                        />
                    ))}

                    {/* Submit Button */}
                    <div className="col-span-2 flex items-center justify-center">
                        <Button title="Submit" type="submit" className="col-span-2 mt-2" />
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
