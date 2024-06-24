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
import TeamDetailScreen from './TeamDetailTable';
import _ from 'lodash';
import LoadingScreen from '../../commonComponents/LoadingScreen';
import TeamTable from './TeamTable';

export default function Dashboard() {
    // State variables initialization
    const [openNewTeamModel, setOpenNewTeamModel] = useState(false);
    const [openNewTeamPlayer, setOpenNewTeamPlayer] = useState(false);
    const [teamData, setTeamData] = useState([]);
    const [selectedTeamForPlayer, setSelectedTeamForPlayer] = useState({});
    const [isLoading, setisLoading] = useState(true);
    const [isTableLoading, setisTableLoading] = useState(false);
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
        setisTableLoading(true);
        const teamPlayersResult = await fetchAPI(`/teamPlayer/team-players-list/${team_id}`);
        if (!_.isEmpty(teamPlayersResult)) {
            setopenSeletedTeam(teamPlayersResult);
        } else {
            toast.error('No Players Registered to this Team.');
        }
        setisTableLoading(false);
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
                    {/* Loading Screen */}
                    {isTableLoading && <LoadingScreen className="h-[103%] w-full rounded-3xl bg-white" />}

                    {/* Team Table */}
                    {!(openSeletedTeam || isTableLoading) && (
                        <TeamTable
                            tableData={teamData}
                            openTeamDetails={(team_id) => openSeletesTeam(team_id)}
                            handleNewTeamPlayer={handleNewTeamPlayer}
                            handleTeamDelete={handleTeamDelete}
                        />
                    )}

                    {/* Team Details Table */}
                    {openSeletedTeam && <TeamDetailScreen playersData={openSeletedTeam} closeFunction={() => setopenSeletedTeam(null)} />}
                </div>

                {/* Render Icon to open new team modal */}
                {!openSeletedTeam && (
                    <Button
                        title="New Team"
                        className="absolute right-14 top-3 h-7 rounded-lg bg-slate-300 text-xs"
                        onClick={() => setOpenNewTeamModel(true)}
                    />
                )}

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
