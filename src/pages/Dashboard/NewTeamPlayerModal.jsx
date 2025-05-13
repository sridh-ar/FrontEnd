import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import LoadingScreen from '../../commonComponents/LoadingScreen';
import Input from '../../commonComponents/Input';
import { newTeamPlayer } from '../../utils/constants';
import Button from '../../commonComponents/Button';
import Icon from '../../commonComponents/Icon';
import ModalWrapper from '../../commonComponents/ModalWrapper';
import { fetchAPI } from '../../utils/commonServices';
import toast from 'react-hot-toast';

export default function NewTeamPlayerModal({ closeFunction, selectedTeam }) {
    //State Variables
    const [isLoading, setisLoading] = useState(false);
    const [playerData, setPlayerData] = useState(null);
    const [playersList, setplayersList] = useState([]);

    const [teamPlayerData, setTeamPlayerData] = useState({
        team_name: selectedTeam.team_name,
        player_no: '',
        player_name: '',
        points: '',
        team_id: selectedTeam.id,
    });

    // Use Effect
    useEffect(() => {
        setisLoading(true);
        fetchAPI('/player')
            .then((data) => {
                setplayersList(data);
                setisLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    // Function to handle changes in input fields
    const handleInputChange = async (e) => {
        let { name, value } = e.target;

        if (name == 'player_no') {
            if (value.length > 0) {
                setPlayerData(playersList.find((item) => item.id === value || item.name.toLowerCase().includes(value.toLowerCase())));
            } else {
                setPlayerData(null);
            }
        }

        setTeamPlayerData({
            ...teamPlayerData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setisLoading(true);

        try {
            const apiResponse = await fetchAPI('/teamPlayer/create', 'POST', teamPlayerData);
            console.log(apiResponse);
            setisLoading(false);
            closeFunction();
            window.location.reload();
        } catch (error) {
            // if (error.message.includes('part of')) {
            if (error.message) {
                toast.error(error.message);
                setisLoading(false);
            } else {
                closeFunction();
            }
        }
    };

    return (
        <ModalWrapper>
            <motion.div
                className="relative flex h-[60%] w-[60%] flex-col items-center overflow-hidden rounded-xl bg-white p-2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                {/* Loading Screen */}
                {isLoading && <LoadingScreen className="absolute z-[100] bg-white" />}

                {/* Close Icon */}
                <Icon icon="XCircleIcon" className="absolute right-8 top-6" onClick={() => closeFunction()} />

                <p className="my-4 font-semibold">🎭 New Player Registration</p>

                <form className="grid w-full grid-cols-2 gap-3 p-5" onSubmit={handleSubmit}>
                    {/* Inputs */}
                    {newTeamPlayer.inputColumns.map((input, index) => (
                        <div key={index} className="relative flex w-full flex-col justify-center gap-2 text-sm">
                            <Input
                                label={input.label}
                                required={input.required}
                                type={input.type}
                                idName={input.name}
                                value={teamPlayerData[input.name]}
                                onChange={handleInputChange}
                                disabled={input.disabled}
                                placeholder={input.name == 'player_no' ? 'Search by Player No or Name' : null}
                            />

                            {/* Player Detail Modal */}
                            {input.name == 'player_no' && playerData && (
                                <div
                                    className="absolute bottom-[-100px] right-0 z-50 flex w-[99%] cursor-pointer items-center gap-4 rounded bg-white p-2 text-sm shadow ring-1 ring-gray-200 hover:bg-slate-200"
                                    onClick={() => {
                                        setTeamPlayerData({
                                            ...teamPlayerData,
                                            player_name: playerData.name,
                                            player_no: playerData.id,
                                        });
                                        setPlayerData(null);
                                    }}
                                >
                                    <img src={playerData.player_photo} alt="playerPhoto" className="h-20 w-20 rounded-xl object-contain" />
                                    <span>
                                        <b>Name: </b>
                                        {playerData.name}
                                        <br />
                                        <b>Area: </b>
                                        {playerData.area}
                                        <br />
                                        <b>Player Role: </b>
                                        {playerData.player_role}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Submit Button */}
                    <div className="col-span-2 my-1 flex items-center justify-center">
                        <Button title="Submit" type="submit" className="col-span-2 text-white" />
                    </div>
                </form>
            </motion.div>
        </ModalWrapper>
    );
}
