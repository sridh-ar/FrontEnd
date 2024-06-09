import { useEffect, useState } from 'react';
import PlayersCard from '../components/PlayersCard';
import SidebarContainer from '../components/common/SidebarContainer';
import { fetchAPI } from '../utils/commonServices';
import Icon from '../components/common/Icon';
import InfiniteScroll from 'react-infinite-scroll-component';

const SearchBar = ({ handleSearch }) => {
    return (
        <div className="w-1/3 h-10 fixed left-[44%] top-2 z-20 my-0.5">
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
    const [isLoading, setIsLoading] = useState(true);

    //Infinity scroll
    const [items, setItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchAPI('/player')
            .then((data) => {
                setPlayersData(data);
                setItems(data.slice(0, 20));
                setIsLoading(false);
            })
            .catch((error) => console.error(error));
    }, []);

    function handleSearch(value) {
        if (value.length > 0) {
            setItems(playersData.filter((item) => item.id === value || item.name.toLowerCase().includes(value.toLowerCase())));
        } else {
            setItems(playersData.slice(0, 20));
        }
    }

    const fetchMoreData = () => {
        if (items.length >= playersData.length) {
            setHasMore(false);
        } else {
            setTimeout(() => {
                setItems(items.concat(playersData.slice(items.length, items.length + 10)));
            }, 1000);
        }
    };

    return (
        <SidebarContainer isLoading={isLoading}>
            <InfiniteScroll
                className="bg-gray-200 grid grid-cols-2 mt-10 h-full p-5 gap-3"
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                    <div className="col-span-2 flex justify-center">
                        <img src="/loading.gif" className="w-20" />{' '}
                    </div>
                }
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                <SearchBar handleSearch={(value) => handleSearch(value)} />
                {items.map((item, index) => {
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
                        />
                    );
                })}
            </InfiniteScroll>
        </SidebarContainer>
    );
}
