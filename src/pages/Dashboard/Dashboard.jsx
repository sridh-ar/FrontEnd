import { useEffect, useState } from 'react';
import NewTeamModal from './NewTeamModal';
import NewTeamPlayerModal from './NewTeamPlayerModal';
import { fetchAPI } from '../../utils/commonServices';
import toast from 'react-hot-toast';
import SidebarContainer from '../../commonComponents/SideBarContainer';
import AnalysticsDiv from './AnalysticsDiv';
import TeamDetailScreen from './TeamDetailTable';
import _ from 'lodash';
import LoadingScreen from '../../commonComponents/LoadingScreen';
import TeamTable from './TeamTable';

export default function Dashboard() {
    const [openNewTeamModel, setOpenNewTeamModel] = useState(false);
    const [editTeam, setEditTeam] = useState(null);
    const [openNewTeamPlayer, setOpenNewTeamPlayer] = useState(false);
    const [teamData, setTeamData] = useState([]);
    const [selectedTeamForPlayer, setSelectedTeamForPlayer] = useState({});
    const [isLoading, setisLoading] = useState(true);
    const [isTableLoading, setisTableLoading] = useState(false);
    const [analyticalData, setanalyticalData] = useState({});
    const [openSeletedTeam, setopenSeletedTeam] = useState(null);

    async function initialDataRetrival() {
        try {
            const apiResult = await fetchAPI('/team');
            const dashboardAPIResult = await fetchAPI('/admin/dashboard');
            const configObject = dashboardAPIResult.reduce((acc, cur) => {
                acc[cur.config_name] = cur.config_value;
                return acc;
            }, {});
            setanalyticalData(configObject);
            setTeamData(apiResult);
            setisLoading(false);
        } catch (error) {
            setisLoading(false);
        }
    }

    useEffect(() => { initialDataRetrival(); }, [openNewTeamModel, openNewTeamPlayer]);

    async function handleTeamDelete(teamId) {
        try {
            await fetchAPI(`/team/delete/${teamId}`, 'PUT');
            toast.success('Record Deleted Successfully.');
            initialDataRetrival();
        } catch (error) {
            toast.error('Unable to delete the record.');
        }
    }

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
            <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <AnalysticsDiv
                    totalRegisteredPlayers={analyticalData.totalRegisteredPlayers}
                    totalTeamPlayers={analyticalData.totalTeamPlayers}
                    totalTeams={analyticalData.totalTeams}
                    onNewTeam={!openSeletedTeam ? () => setOpenNewTeamModel(true) : undefined}
                />

                <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                    {isTableLoading && <LoadingScreen variant="skeleton" className="h-full w-full rounded-2xl" />}

                    {!(openSeletedTeam || isTableLoading) && (
                        <TeamTable
                            tableData={teamData}
                            openTeamDetails={(team_id) => openSeletesTeam(team_id)}
                            handleNewTeamPlayer={handleNewTeamPlayer}
                            handleTeamDelete={handleTeamDelete}
                            editTeamData={(data) => setEditTeam(data)}
                        />
                    )}

                    {openSeletedTeam && <TeamDetailScreen playersData={openSeletedTeam} closeFunction={() => setopenSeletedTeam(null)} />}
                </div>

                {(openNewTeamModel || editTeam) && (
                    <NewTeamModal
                        closeFunction={() => { setOpenNewTeamModel(false); setEditTeam(null); }}
                        editTeamData={editTeam}
                    />
                )}

                {openNewTeamPlayer && (
                    <NewTeamPlayerModal closeFunction={() => setOpenNewTeamPlayer(false)} selectedTeam={selectedTeamForPlayer} />
                )}
            </div>
        </SidebarContainer>
    );
}
