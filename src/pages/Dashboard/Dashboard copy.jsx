import { useEffect, useState } from 'react';
import NewTeamModal from './NewTeamModal';
import NewTeamPlayerModal from './NewTeamPlayerModal';
import { fetchAPI } from '../../utils/commonServices';
import toast from 'react-hot-toast';
import SidebarContainer from '../../commonComponents/SideBarContainer';
import { TEAM_DASHBOARD_ROWS, TEAM_TABLE_ROWS, mockTableData, mockTeamTableData } from '../../utils/constants';
import Icon from '../../commonComponents/Icon';
import AnalysticsDiv from './AnalysticsDiv';
import { each } from 'lodash';

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
            const additionalList = 11 - apiResult.length;
            if (additionalList > 0) {
                for (let i = 1; i <= additionalList; i++) {
                    apiResult.push(mockTableData);
                }
            }
            setanalyticalData(configObject);
            console.log(configObject);
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
            {/* Analystics Data */}
            <AnalysticsDiv
                totalRegisteredPlayers={analyticalData.totalRegisteredPlayers}
                totalTeamPlayers={analyticalData.totalTeamPlayers}
                totalTeams={analyticalData.totalTeams}
            />
            <div className="fixed z-50 m-5 flex w-[93%] justify-around rounded-t-3xl bg-white text-sm shadow">
                {TEAM_DASHBOARD_ROWS.map((row) => (
                    <th className="py-3 font-normal tracking-wider text-[#aab4c3]">{row}</th>
                ))}
            </div>

            {/* Table Body */}
            {!openSeletedTeam && (
                <div className="w-full rounded-tr-3xl bg-[#d4dced] p-5">
                    {/* Render table only when data is loaded */}
                    <table className="w-full border-collapse rounded-3xl bg-white text-center tracking-wide shadow">
                        <tr className="h-10 border-b-[1px] text-sm">
                            {TEAM_DASHBOARD_ROWS.map((row) => (
                                <th className="py-3 font-normal tracking-wider text-[#aab4c3]">{row}</th>
                            ))}
                        </tr>
                        {teamData.map((item) => (
                            <tr className="relative h-12 p-2 text-center text-sm capitalize" key={item.id}>
                                <td className="relative cursor-pointer" onClick={() => openSeletesTeam(item.id)}>
                                    {item.team_name && (
                                        <img src={item.team_photo} className="absolute inset-0 left-2 top-2 h-8 w-8 rounded" />
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
                                        <div className="flex cursor-pointer items-center justify-evenly">
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
                                {item.team_name && <div className="absolute bottom-0 right-0 h-[0.5px] w-full bg-slate-200" />}
                            </tr>
                        ))}
                    </table>

                    {/* Render Icon to open new team modal */}
                    <Icon icon="PlusCircleIcon" className="fixed bottom-8 right-14" size={10} onClick={() => setOpenNewTeamModel(true)} />

                    {/* Render new team modal */}
                    {openNewTeamModel && <NewTeamModal closeFunction={() => setOpenNewTeamModel(false)} />}

                    {/* Render new team player modal */}
                    {openNewTeamPlayer && (
                        <NewTeamPlayerModal closeFunction={() => setOpenNewTeamPlayer(false)} selectedTeam={selectedTeamForPlayer} />
                    )}
                </div>
            )}
            {openSeletedTeam && (
                <div className="h-full w-full rounded-tr-3xl bg-[#d4dced] p-5">
                    <div className="relative flex w-full border-collapse items-center justify-end gap-20 overflow-hidden rounded-t-3xl bg-white p-3 pr-20 text-xl font-bold capitalize italic tracking-wide shadow">
                        <p>
                            Team Name: <span className="text-gray-600">{openSeletedTeam[0].team_name}</span>
                        </p>
                        <p>
                            Owner Name: <span className="text-gray-600">{openSeletedTeam[0].owner}</span>
                        </p>
                        <div className="absolute bottom-0 right-0 h-[0.5px] w-full bg-slate-200" />

                        {/* Close Icon */}
                        <div
                            className="absolute left-8 top-3 cursor-pointer rounded-full bg-black px-5 text-[0.65rem] text-white"
                            onClick={() => setopenSeletedTeam(null)}
                        >
                            Back to Dashboard
                        </div>
                    </div>
                    {/* Render table only when data is loaded */}
                    <table className="w-full border-collapse overflow-hidden rounded-b-3xl bg-white text-center tracking-wide shadow">
                        <tr className="h-10 border-b-[1px] text-sm">
                            {TEAM_TABLE_ROWS.map((row) => (
                                <th className="py-3 font-normal tracking-wider text-[#aab4c3]">{row}</th>
                            ))}
                        </tr>

                        {openSeletedTeam.map((item) => (
                            <tr className="relative h-12 p-2 text-center text-sm capitalize" key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.contact_number}</td>
                                <td>{item.jersey_name}</td>
                                <td>{item.jersey_size}</td>
                                <td>{item.jersey_no}</td>
                                {item.team_name && <div className="absolute bottom-0 right-0 h-[0.5px] w-full bg-slate-200" />}
                            </tr>
                        ))}
                    </table>
                </div>
            )}
        </SidebarContainer>
    );
}
