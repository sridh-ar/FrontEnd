import { useEffect, useState } from 'react';
import PlayersCard from './PlayersCard';
import SidebarContainer from '../../commonComponents/SideBarContainer';
import { fetchAPI } from '../../utils/commonServices';
import Icon from '../../commonComponents/Icon';
import InfiniteScroll from 'react-infinite-scroll-component';
import PlayersCardFull from './PlayerDetailScreen';

const SearchBar = ({ handleSearch }) => {
    return (
        <div className="fixed left-[40%] top-2 z-20 my-0.5 h-8 w-1/4">
            <div className="flex h-8 w-full items-center rounded-full border border-gray-300 bg-gray-50 px-3">
                <Icon icon="MagnifyingGlassIcon" size={4} />
                <input
                    type="search"
                    className="ml-3 w-[90%] bg-transparent text-sm outline-none"
                    // className="h-8 w-full text-sm text-gray-900 outline-none"
                    placeholder="Search player by Name or Id"
                    onChange={(input) => handleSearch(input.target.value)}
                />
            </div>
        </div>
    );
};

export default function PlayerDashboard() {
    const [playersData, setPlayersData] = useState([]);
    const [filteredList, setfilteredList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPlayer, setselectedPlayer] = useState('');

    useEffect(() => {
        fetchAPI('/player')
            .then((data) => {
                setPlayersData(data);
                setfilteredList(data);
                setIsLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    function handleSearch(value) {
        if (value.length > 0) {
            setfilteredList(playersData.filter((item) => item.id === value || item.name.toLowerCase().includes(value.toLowerCase())));
        } else {
            setfilteredList(playersData);
        }
    }

    // if (selectedPlayer) {
    //     return <PlayersCardFull playerDetails={filteredList.at(selectedPlayer)} closeModal={() => setselectedPlayer(null)} />;
    // }
    return (
        <SidebarContainer isLoading={isLoading}>
            <div className="h-full overflow-y-scroll">
                <div className="grid grid-cols-3 gap-3 p-7">
                    <SearchBar handleSearch={(value) => handleSearch(value)} />
                    {filteredList.map((item, index) => {
                        return (
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
                                onClick={() => setselectedPlayer(index.toString())}
                                playerData={item}
                            />
                        );
                    })}
                </div>
            </div>
            {/* Player Full Screen */}
            {selectedPlayer && (
                <PlayersCardFull playerDetails={filteredList.at(selectedPlayer)} closeModal={() => setselectedPlayer(null)} />
            )}
        </SidebarContainer>
    );
}
