import { useEffect, useState } from 'react';
import NewTeamModal from './NewTeamModal';
import NewTeamPlayerModal from './NewTeamPlayerModal';
import { fetchAPI } from '../../utils/commonServices';
import toast from 'react-hot-toast';
import SidebarContainer from '../../commonComponents/SideBarContainer';
import { TEAM_DASHBOARD_ROWS, TEAM_TABLE_ROWS, mockTableData, mockTeamTableData } from '../../utils/constants';
import Icon from '../../commonComponents/Icon';
import AnalysticsDiv from './AnalysticsDiv';
import Button from '../../commonComponents/Button';

export default function Dashboard() {
    // State variables initialization
    const [openNewTeamModel, setOpenNewTeamModel] = useState(false);
    const [openNewTeamPlayer, setOpenNewTeamPlayer] = useState(false);
    const [teamData, setTeamData] = useState([]);
    const [selectedTeamForPlayer, setSelectedTeamForPlayer] = useState({});
    const [isLoading, setisLoading] = useState(true);
    const [analyticalData, setanalyticalData] = useState({});
    const [openSeletedTeam, setopenSeletedTeam] = useState(null);

    // Fetch team data from API on component mount and whenever isOpen or isAddOpen changes

    async function initialDataRetrival() {
        try {
            const apiResult = await fetchAPI('/team');
            const dashboardAPIResult = await fetchAPI('/admin/dashboard');

            const configObject = dashboardAPIResult.reduce((accumulator, current) => {
                accumulator[current.config_name] = current.config_value;
                return accumulator;
            }, {});

            // To fill the table with dummy data for Cleaner UI look
            // const additionalList = 11 - apiResult.length;
            // if (additionalList > 0) {
            //     for (let i = 1; i <= additionalList; i++) {
            //         apiResult.push(mockTableData);
            //     }
            // }
            setanalyticalData(configObject);
            setTeamData(apiResult);
            setisLoading(false);
        } catch (error) {
            // alert(error);
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

    async function openSeletesTeam(team_id) {
        setisLoading(true);
        const teamPlayersResult = await fetchAPI(`/teamPlayer/team-players-list/${team_id}`);
        // To fill the table with dummy data for Cleaner UI look
        const additionalList = 7 - teamPlayersResult.length;
        if (additionalList > 0) {
            for (let i = 1; i <= additionalList; i++) {
                teamPlayersResult.push(mockTeamTableData);
            }
        }
        setopenSeletedTeam(teamPlayersResult);
        setisLoading(false);
        console.log(teamPlayersResult);
    }

    return (
        <SidebarContainer isLoading={isLoading}>
            <div className="relative h-full w-full">
                {/* Analystics Data */}
                <AnalysticsDiv
                    totalRegisteredPlayers={analyticalData.totalRegisteredPlayers}
                    totalTeamPlayers={analyticalData.totalTeamPlayers}
                    totalTeams={analyticalData.totalTeams}
                />

                {/* Table Body */}
                <div className="h-[91%] w-full bg-[#d4dced] p-5">
                    <div className="relative z-10 grid h-[10%] grid-cols-8 items-center rounded-t-3xl bg-white text-center text-sm shadow">
                        {TEAM_DASHBOARD_ROWS.map((row) => (
                            <span className="py-3 font-normal tracking-wider text-[#aab4c3]">{row}</span>
                        ))}
                        <span className="absolute bottom-0 right-0 h-[0.5px] w-full bg-slate-200" />
                    </div>
                    <div className="h-[92%] overflow-y-scroll rounded-b-3xl bg-white text-center text-sm">
                        {teamData.map((item) => (
                            <div className="relative grid h-10 grid-cols-8 items-center text-center text-sm">
                                <span
                                    className="relative flex cursor-pointer items-center justify-center"
                                    onClick={() => openSeletesTeam(item.id)}
                                >
                                    {item.team_name && <img src={item.team_photo} className="mr-2 h-8 w-8 rounded" />}
                                    {item.team_name.slice(0, 15)}
                                </span>

                                <span> {item.captain.length > 15 ? `${item.captain.slice(0, 15)}...` : item.captain} </span>
                                <span> {item.owner.length > 10 ? `${item.owner.slice(0, 10)}...` : item.owner} </span>
                                <span>{item.slots}</span>
                                <span> {item.remaining_slots} </span>
                                <span>{item.total_points_available}</span>
                                <span>{item.remaining_points_available}</span>

                                <span className="flex cursor-pointer items-center justify-evenly">
                                    <Icon icon="UserPlusIcon" className="fill-green-800" onClick={() => handleNewTeamPlayer(item)} />
                                    <Icon icon="TrashIcon" className="fill-red-700" onClick={() => handleTeamDelete(item.id)} />
                                </span>
                                <span className="absolute bottom-0 right-0 h-[0.5px] w-full bg-slate-200" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Render Icon to open new team modal */}
                {/* <Icon icon="PlusCircleIcon" className="absolute top-1 right-14" size={10} onClick={() => setOpenNewTeamModel(true)} /> */}
                <Button
                    title="New Team"
                    className="absolute right-14 top-3 h-7 rounded-lg bg-slate-300 text-xs"
                    onClick={() => setOpenNewTeamModel(true)}
                />

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
