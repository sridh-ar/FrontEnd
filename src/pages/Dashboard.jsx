import { useEffect, useState } from 'react';
import NewTeamModal from '../components/NewTeamModal';
import NewTeamPlayerModal from '../components/NewTeamPlayerModal';
import { uploadBytes, ref, getStorage, getDownloadURL } from 'firebase/storage';
import { firebaseApp } from '../utils/firebase';
import { fetchAPI } from '../utils/commonServices';
import { TrashIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';
import SidebarContainer from '../components/common/SideBarContainer';
import { mockTableData } from '../utils/constants';

export default function Dashboard() {
    // State variables initialization
    const [openNewTeamModel, setOpenNewTeamModel] = useState(false);
    const [openNewTeamPlayer, setOpenNewTeamPlayer] = useState(false);
    const [teamData, setTeamData] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState({});
    const [isLoading, setisLoading] = useState(true);

    // Fetch team data from API on component mount and whenever isOpen or isAddOpen changes

    async function initialDataRetrival() {
        try {
            const apiResult = await fetchAPI('/team');
            // To fill the table with dummy data for Cleaner UI look
            const additionalList = 11 - apiResult.length;
            if (apiResult.length < 11) {
                for (let i = 1; i <= additionalList; i++) {
                    apiResult.push(mockTableData);
                }
            }
            setTeamData(apiResult);
            setisLoading(false);
        } catch (error) {
            alert(error);
            setisLoading(false);
        }
    }

    useEffect(() => {
        initialDataRetrival();
    }, [openNewTeamModel, openNewTeamPlayer]);

    // Function to handle form submission
    async function handleSubmit(event) {
        event.preventDefault();
        let values = [];
        let imageResult = '';
        for (let i = 0; i < 9; i++) {
            if (i === 7 || i === 8) {
                imageResult = event.target[i].files[0];
                const storage = getStorage(firebaseApp);
                const imageRef = ref(storage, `kpl/team/Player_${Math.floor(Math.random() * 90000) + 10000}`);
                await uploadBytes(imageRef, imageResult).then(async (res) => {
                    await getDownloadURL(res.ref).then((res) => {
                        values.push(res);
                    });
                });
            } else {
                values.push(event.target[i].value);
            }
        }
        fetch('/api/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                table_name: 'team',
            },
            body: JSON.stringify(values),
        })
            .then((response) => response.json())
            .then(() => {
                setOpenNewTeamModel(false);
                setisLoading(true);
            })
            .catch((error) => console.error(error));
    }

    //Handling Functions
    async function handleTeamDelete(teamId) {
        console.log({ teamId });
        try {
            await fetchAPI(`/team/delete/${teamId}`, 'PUT');
            toast.success('Record Deleted Successfully.');

            // to refresh the table call data retrival.
            initialDataRetrival();
        } catch (error) {
            console.log('[Table.jsx] Error - ', error.stack);
            toast.error('Unable to delete the record.');
        }
    }

    // Handling new team member function
    async function handleNewTeamPlayer(teamData) {
        setSelectedTeam(teamData);
        setOpenNewTeamPlayer(true);
    }

    return (
        <SidebarContainer isLoading={isLoading}>
            <div className="bg-gray-200 overflow-y-auto p-3 w-full relative">
                {/* Render table only when data is loaded */}
                <div className="bg-white h-full rounded">
                    <table className="w-full text-center bg-white overflow-hidden rounded tracking-wide border-collapse">
                        <tr className="bg-[#529aa2] text-white h-10 text-sm divide-x shadow ">
                            <th>Team Name</th>
                            <th>Captain</th>
                            <th>Owner</th>
                            <th>Slots</th>
                            <th>Remaining Slots</th>
                            <th>Total Points</th>
                            <th>Remaining Pts</th>
                            <th>Actions</th>
                        </tr>

                        {teamData.map((item) => (
                            <tr className="p-2 h-12 text-sm text-center capitalize border-gray-400 relative" key={item.id}>
                                <td className="relative cursor-pointer">
                                    {item.team_name && (
                                        <img src={item.team_photo} className="w-8 h-8 absolute rounded inset-0 top-2 left-2" />
                                    )}
                                    {item.team_name.slice(0, 15)}
                                </td>

                                <td> {item.captain.length > 15 ? `${item.captain.slice(0, 15)}...` : item.captain} </td>
                                <td> {item.owner.length > 10 ? `${item.owner.slice(0, 10)}...` : item.owner} </td>
                                <td>{item.slots}</td>
                                <td> {item.remaining_slots} </td>
                                <td>{item.total_points_available}</td>
                                <td>{item.remaining_points_available}</td>

                                {/* Table Actions */}
                                <td>
                                    {item.team_name && (
                                        <div className="flex items-center justify-evenly cursor-pointer">
                                            <UserPlusIcon width={22} className="fill-green-800" onClick={() => handleNewTeamPlayer(item)} />
                                            <TrashIcon width={22} className="fill-red-700" onClick={() => handleTeamDelete(item.id)} />
                                        </div>
                                    )}
                                </td>
                                {item.team_name && <div className="bg-slate-400 w-full h-[0.5px] absolute bottom-0 right-0" />}
                            </tr>
                        ))}
                    </table>
                </div>

                {/* Render button to open new team modal */}
                {<Button title="+" className="fixed bottom-8 right-14 w-10 h-12 px-0 py-0" onClick={() => setOpenNewTeamModel(true)} />}

                {/* Render new team modal */}
                {openNewTeamModel && <NewTeamModal closeFunction={() => setOpenNewTeamModel(false)} />}

                {/* Render new team player modal */}
                {openNewTeamPlayer && <NewTeamPlayerModal closeFunction={() => setOpenNewTeamPlayer(false)} selectedTeam={selectedTeam} />}
            </div>
        </SidebarContainer>
    );
}
