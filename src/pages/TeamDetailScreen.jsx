import { useEffect, useState } from 'react';
import LoadingScreen from '../components/common/LoadingScreen';
import { TrashIcon } from '@heroicons/react/24/solid';
import { fetchAPI } from '../utils/commonServices';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import SidebarContainer from '../components/common/SideBarContainer1';
import { TEAM_TABLE_ROWS } from '../utils/constants';
import Icon from '../components/common/Icon';

export default function TeamDetailScreen() {
    const [playersData, setPlayersData] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    const { id } = useParams();
    async function retriveInitialData() {
        try {
            const teamResult = await fetchAPI(`/teamPlayer/team-players-list/${id}`);
            console.log(teamResult);
            setPlayersData(teamResult);
        } catch (error) {
            console.log('[TeamDetail.jsx] Error - ', error.stack);
        }
        setisLoading(false);
    }

    useEffect(() => {
        retriveInitialData();
    }, []);

    return (
        <SidebarContainer isLoading={isLoading}>
            <div className="bg-gray-200 overflow-y-auto p-3 w-full relative">
                {/* Render table only when data is loaded */}
                <div className="bg-white h-full rounded">
                    {/* Render the team name and captain name  */}
                    <div className="bg-[#529aa2] rounded p-2 px-40 mb-0.5 flex justify-between items-center text-xl font-bold italic text-white">
                        <p>
                            Team Name: <span className="text-gray-600">{'demo'}</span>
                        </p>
                        <p>
                            Owner Name: <span className="text-gray-600">Demo</span>
                        </p>
                    </div>

                    <table className="w-full text-center bg-white overflow-hidden rounded tracking-wide border-collapse">
                        <tr className="bg-[#529aa2] text-white h-10 text-sm divide-x shadow">
                            {TEAM_TABLE_ROWS.map((row) => (
                                <th>{row}</th>
                            ))}
                        </tr>

                        {playersData.map((player) => (
                            <tr className="p-2 h-12 text-sm" key={player.id}>
                                <td>{player.id}</td>
                                <td className="capitalize">{player.name.length > 15 ? `${player.name.slice(0, 15)}...` : player.name}</td>
                                <td className="capitalize">{player.contact_number}</td>
                                <td className="capitalize">{player.jersey_name}</td>
                                <td className="capitalize">{player.jersey_size}</td>
                                <td>{player.jersey_no}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </SidebarContainer>
    );
}
