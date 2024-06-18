import { motion } from 'framer-motion';
import { useState } from 'react';
import LoadingScreen from '../../commonComponents/LoadingScreen';
import Input from '../../commonComponents/Input';
import { newTeamPlayer } from '../../utils/constants';
import Button from '../../commonComponents/Button';
import Icon from '../../commonComponents/Icon';
import ModalWrapper from '../../commonComponents/ModalWrapper';

export default function NewTeamPlayerModal({ closeFunction, selectedTeam }) {
    //State Variables
    const [isLoading, setisLoading] = useState(false);
    const [playerData, setPlayerData] = useState(null);

    const [teamPlayerData, setTeamPlayerData] = useState({
        team_name: selectedTeam.team_name,
        player_no: '',
        player_name: '',
        points: '',
        team_id: selectedTeam.team_id,
    });

    // Function to handle changes in input fields
    const handleInputChange = async (e) => {
        let { name, value } = e.target;

        if (name == 'player_no') {
            const query = `select name,player_role from player where id = ${parseInt(value) || 0}`;

            fetch(`/api/select?query=${query}`)
                .then((response) => response.json())
                .then((data) => setPlayerData(data[0]))
                .catch((err) => alert(err.message));
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
            const query = `select player_no from team_players where player_no = ${parseInt(teamPlayerData.player_no)}`;

            fetch(`/api/select?query=${query}`)
                .then((response) => response.json())
                .then(async (data) => {
                    console.log(data);
                    if (data.length > 0) {
                        setisLoading(false);
                        alert('Player already part of another team or Not Available');
                    } else {
                        const response = await fetch('/api/insert', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                table_name: 'team_players',
                            },
                            body: JSON.stringify(teamPlayerData),
                        });

                        if (!response.ok) {
                            throw new Error('Failed to submit team player data, Contact Admin');
                        }

                        // updating team remainig points and remaing slots
                        let updateQuery = `UPDATE team SET remaining_slots = remaining_slots - 1, 
              remaining_points_available = remaining_points_available - ${parseInt(teamPlayerData.points)} 
              WHERE id = ${teamPlayerData.team_id}`;

                        fetch(`/api/update?query=${updateQuery}`);

                        setisLoading(false);
                        closeFunction();
                    }
                })
                .catch((err) => alert(err.message));
        } catch (error) {
            alert(error.message);
            window.location.replace('/Dashboard');
        }
    };

    if (isLoading) {
        <LoadingScreen />;
    }

    return (
        <ModalWrapper>
            <motion.div
                className="relative flex h-[60%] w-[60%] flex-col items-center rounded-xl bg-white p-2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
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
                            />

                            {/* Player Detail Modal */}
                            {input.name == 'player_no' && playerData && (
                                <div
                                    className="absolute -bottom-16 right-0 z-50 w-[99%] cursor-pointer rounded bg-white p-2 text-sm shadow ring-1 ring-gray-200"
                                    onClick={() => {
                                        setTeamPlayerData({
                                            ...teamPlayerData,
                                            player_name: playerData.name,
                                        });
                                        setPlayerData(null);
                                    }}
                                >
                                    <b>Name: </b>
                                    {playerData.name}
                                    <br />
                                    <b>Player Role: </b>
                                    {playerData.player_role}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Submit Button */}
                    <div className="col-span-2 my-1 flex items-center justify-center">
                        <Button title="Submit" type="submit" className="col-span-2" />
                    </div>
                </form>
            </motion.div>
        </ModalWrapper>
    );
}
