import { useEffect, useState } from 'react';
import TeamImage from './TeamImage';
import LoadingScreen from './common/LoadingScreen';

export default function TeamTable({ team_detail }) {
    const [teamData, setTeamData] = useState([]);
    const [ownerData, setownerData] = useState([]);
    const [teamImage, setteamImage] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [isGenerating, setisGenerating] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const query = `select pl.* from player pl join team_players tp on tp.player_no = pl.id where tp.team_id = ${team_detail[0]}`;
        fetch(`/api/select?query=${query}`)
            .then((response) => response.json())
            .then((data) => {
                setTeamData(data);
                setisLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    function handleImageDownload() {
        setisGenerating(true);
        const query = `select owner_photo as ownerphoto,owner from team where id = ${team_detail[0]}`;
        const query1 = `select name,player_photo as photo from player pl join team_players tp on tp.player_no = pl.id where tp.team_id = ${team_detail[0]}`;
        fetch(`/api/team?query=${query}`)
            .then((response) => response.json())
            .then((data) => {
                setownerData(data);
            })
            .catch((error) => console.error(error));
        fetch(`/api/select?query=${query1}`)
            .then((response) => response.json())
            .then((data) => {
                setteamImage(data);
            })
            .catch((error) => console.error(error));
    }

    if (!isLoading) {
        return <LoadingScreen />;
    }
    return (
        <>
            {teamImage.length > 0 && (
                <TeamImage
                    teamData={teamImage}
                    ownerData={ownerData}
                    handleDownload={(url) => {
                        setImageUrl(url);
                        setisGenerating(false);
                    }}
                />
            )}

            <div className="bg-white rounded shadow m-5 overflow-y-auto p-1 w-full">
                <div className="bg-slate-100 rounded p-2 mb-0.5 flex justify-between items-center ">
                    <p className="bg-slate-100 rounded text-xl font-bold italic left-5 relative w-[40%] ">
                        Team Name: <span className="text-gray-500">{team_detail[1]}</span>
                    </p>
                    <p className="bg-slate-100 rounded text-xl font-bold italic left-5 relative w-[40%] ">
                        Owner Name: <span className="text-gray-500">{team_detail[2]}</span>
                    </p>
                </div>
                {!isLoading && (
                    <table className="table-auto w-full divide-y text-center">
                        <tr className="bg-slate-100 h-10 text-sm divide-x rounded ">
                            <th>Player Id</th>
                            <th>Player Name</th>
                            <th>Contact No</th>
                            <th>Jersey Name</th>
                            <th>Jersey Size</th>
                            <th>Jersey No</th>
                        </tr>

                        {teamData.map((item) => (
                            <tr className="p-2 h-12 text-sm" key={item.id}>
                                <td>{item.id}</td>
                                <td className="capitalize">{item.name.length > 15 ? `${item.name.slice(0, 15)}...` : item.name}</td>
                                <td className="capitalize">{item.contact_number}</td>
                                <td className="capitalize">{item.jersey_name}</td>
                                <td className="capitalize">{item.jersey_size}</td>
                                <td>{item.jersey_no}</td>
                            </tr>
                        ))}
                    </table>
                )}
            </div>
        </>
    );
}

// w-28 rounded bg-indigo-400 h-8 p-2 flex justify-center items-center m-3 cursor-pointer text-white text-sm fixed bottom-5 right-5"
