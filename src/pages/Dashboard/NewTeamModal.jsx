import { motion } from 'framer-motion';
import { useState } from 'react';
import { uploadBytes, ref, getStorage, getDownloadURL } from 'firebase/storage';
import { firebaseApp } from '../../utils/firebase';
import LoadingScreen from '../../commonComponents/LoadingScreen';
import { newTeam } from '../../utils/constants';
import Input from '../../commonComponents/Input';
import Button from '../../commonComponents/Button';
import { fetchAPI, uploadToGit } from '../../utils/commonServices';
import toast from 'react-hot-toast';
import Icon from '../../commonComponents/Icon';
import ModalWrapper from '../../commonComponents/ModalWrapper';

export default function NewTeamModal({ closeFunction, editTeamData }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isImageUploading, setIsImageUploading] = useState(false);

    const [teamData, setteamData] = useState(
        editTeamData || {
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
        },
    );

    // Function to handle changes in input fields
    const handleInputChange = async (e) => {
        let { name, value } = e.target;

        // handle file for upload
        if (['team_photo', 'owner_photo', 'captain_photo'].includes(name)) {
            setIsImageUploading(true);
            let imageResult = e.target.files[0];
            // const storage = getStorage(firebaseApp);
            // const imageRef = ref(storage, `kpl/Team_${Math.floor(Math.random() * 90000) + 10000}`);
            // await uploadBytes(imageRef, imageResult).then(async (res) => {
            //     await getDownloadURL(res.ref).then((res) => {
            //         value = res;
            //         setIsImageUploading(false);
            //     });
            // });
            const imageName = `Team_${Math.floor(Math.random() * 90000) + 10000}.jpg`;
            value = `https://github.com/sridh-ar/Images/blob/main/${imageName}?raw=true`;

            let reader = new FileReader();
            reader.readAsDataURL(imageResult);
            reader.onload = async () => {
                await uploadToGit(imageName, reader.result);
                setIsImageUploading(false);
            };
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
            await fetchAPI('/team/createorupdate', 'POST', teamData);
            toast.success('Team Added  Successfully', { duration: 5000 });
            setIsLoading(false);
            closeFunction();
            window.location.reload();
        } catch (error) {
            console.log('[NewTeam.jsx] Error - ', error.stack);
            toast.error('Unable to add New Team.');
            closeFunction();
        }
    }

    return (
        <ModalWrapper>
            <motion.div
                className="relative flex w-[70%] flex-col items-center overflow-hidden rounded bg-white p-2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                {/* Loading Screen */}
                {isLoading && <LoadingScreen className="absolute z-[100] bg-white" />}

                {/* Close Icon */}
                <Icon icon="XCircleIcon" className="absolute right-8 top-6" onClick={() => closeFunction()} />

                {/* Form Data */}
                <p className="my-4 text-lg font-medium">👩‍🚀 Team Registration</p>

                <form className="grid w-full grid-cols-2 gap-3 p-5" onSubmit={handleSubmit}>
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
                            fileName={teamData[input.name] ? 'Uploaded!' : 'Choose a File'}
                        />
                    ))}

                    {/* Submit Button */}
                    <div className="col-span-2 flex items-center justify-center">
                        <Button title="Submit" type="submit" className="col-span-2 mt-2 text-white" isLoading={isImageUploading} />
                    </div>
                </form>
            </motion.div>
        </ModalWrapper>
    );
}
