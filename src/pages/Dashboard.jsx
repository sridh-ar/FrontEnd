import { useEffect, useState } from 'react';
import NewTeamModal from '../components/NewTeamModal';
import NewTeamPlayerModal from '../components/NewTeamPlayerModal';
import { fetchAPI } from '../utils/commonServices';
import { TrashIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import SidebarContainer from '../components/common/SideBarContainer';
import { TEAM_DASHBOARD_ROWS, TEAM_TABLE_ROWS, mockTableData } from '../utils/constants';
import Icon from '../components/common/Icon';

export default function Dashboard() {
    // State variables initialization
    const [openNewTeamModel, setOpenNewTeamModel] = useState(false);
    const [openNewTeamPlayer, setOpenNewTeamPlayer] = useState(false);
    const [teamData, setTeamData] = useState([]);
    const [selectedTeamForPlayer, setSelectedTeamForPlayer] = useState({});
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
        setSelectedTeamForPlayer(teamData);
        setOpenNewTeamPlayer(true);
    }

    return (
        <SidebarContainer isLoading={isLoading}>
            <div className="bg-gray-200 overflow-y-auto p-3 w-full relative">
                {/* Render table only when data is loaded */}
                <div className="bg-white h-full rounded">
                    <table className="w-full text-center bg-white overflow-hidden rounded tracking-wide border-collapse">
                        <tr className="bg-[#529aa2] text-white h-10 text-sm divide-x shadow">
                            {TEAM_DASHBOARD_ROWS.map((row) => (
                                <th>{row}</th>
                            ))}
                        </tr>

                        {teamData.map((item) => (
                            <tr className="p-2 h-12 text-sm text-center capitalize border-gray-400 relative" key={item.id}>
                                <td className="relative cursor-pointer" onClick={() => (window.location.href = `/dashboard/${item.id}`)}>
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
                                            <Icon
                                                icon="UserPlusIcon"
                                                size={6}
                                                className="fill-green-800"
                                                onClick={() => handleNewTeamPlayer(item)}
                                            />
                                            <Icon
                                                icon="TrashIcon"
                                                size={6}
                                                className="fill-red-700"
                                                onClick={() => handleTeamDelete(item.id)}
                                            />
                                        </div>
                                    )}
                                </td>
                                {item.team_name && <div className="bg-slate-300 w-full h-[0.5px] absolute bottom-0 right-0" />}
                            </tr>
                        ))}
                    </table>
                </div>

                {/* Render Icon to open new team modal */}
                <Icon icon="PlusCircleIcon" className="fixed bottom-8 right-14" size={10} onClick={() => setOpenNewTeamModel(true)} />

                {/* Render new team modal */}
                {openNewTeamModel && <NewTeamModal closeFunction={() => setOpenNewTeamModel(false)} />}

                {/* Render new team player modal */}
                {openNewTeamPlayer && (
                    <NewTeamPlayerModal closeFunction={() => setOpenNewTeamPlayer(false)} selectedTeam={selectedTeamForPlayer} />
                )}
            </div>
        </SidebarContainer>
    );
}
