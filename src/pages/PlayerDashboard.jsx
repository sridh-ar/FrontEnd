import { useEffect, useState } from 'react';
import PlayersCard from '../components/PlayersCard';
import SidebarContainer from '../components/common/SideBarContainer';
import { fetchAPI } from '../utils/commonServices';
import Icon from '../components/common/Icon';

const SearchBar = ({ handleSearch }) => {
    return (
        <div className="w-1/3 h-10 fixed left-[44%] top-0 z-20 my-0.5">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Icon icon="MagnifyingGlassIcon" />
            </div>
            <input
                type="search"
                className="w-full h-10 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none "
                placeholder="Search for a player..."
                onChange={(input) => handleSearch(input.target.value)}
            />
        </div>
    );
};

export default function PlayerDashboard() {
    const [playersData, setPlayersData] = useState([]);
    const [filteredData, setfilteredData] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [isGenerating, setisGenerating] = useState(false);
    // const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        fetchAPI('/player')
            .then((data) => {
                setPlayersData(data);
                setfilteredData(data);
                setisLoading(false);
            })
            .catch((error) => console.error(error));
    }, [isLoading]);

    // async function handleDownload() {
    //     setisGenerating(true);
    //     const element = document.getElementById('playersListPdf');
    //     html2canvas(element, { scale: 2 }).then((canvas) => {
    //         const url = canvas.toDataURL();
    //         // setImageUrl(url);
    //         setisGenerating(false);
    //     });
    // }

    function handleSearch(value) {
        if (value.length > 0) {
            setfilteredData(playersData.filter((item) => item.id === value || item.name.toLowerCase().includes(value.toLowerCase())));
        } else {
            setfilteredData(playersData);
        }
    }

    return (
        <SidebarContainer isLoading={isLoading}>
            <main>
                <div className="grid grid-cols-2 w-full h-full mt-8 p-5 gap-3">
                    <SearchBar handleSearch={(value) => handleSearch(value)} />

                    {/* Players Data */}
                    {filteredData.map((item, index) => (
                        <PlayersCard
                            key={index}
                            name={item.name}
                            jerseyname={item.jersey_name}
                            contact={item.contact_number}
                            role={item.player_role}
                            team={item.team_name}
                            id={item.id}
                            area={item.area}
                            image={item.player_photo}
                            approved={item.approved}
                            handleApproved={() => setisLoading(true)}
                            battingStyle={item.batting_style}
                            bowlingStyle={item.bowling_style}
                        />
                    ))}
                </div>
            </main>
        </SidebarContainer>
    );
}
