import { useEffect, useState } from 'react';
import PlayersCard from './PlayersCard';
import SidebarContainer from '../../commonComponents/SideBarContainer';
import { fetchAPI } from '../../utils/commonServices';
import PlayersCardFull from './PlayerDetailScreen';

export default function PlayerDashboard() {
    const [playersData, setPlayersData] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchAPI('/player').then((data) => {
            setPlayersData(data);
            setFilteredList(data);
            setIsLoading(false);
        }).catch(console.error);
    }, []);

    function handleSearch(value) {
        setSearch(value);
        setFilteredList(value.length > 0
            ? playersData.filter(p => p.id === value || p.name.toLowerCase().includes(value.toLowerCase()))
            : playersData
        );
    }

    return (
        <SidebarContainer isLoading={isLoading}>
            <div style={s.page}>
                {/* Search + count bar */}
                <div style={s.topBar}>
                    <div style={s.searchWrap}>
                        <span style={s.searchIcon}>🔍</span>
                        <input
                            style={s.searchInput}
                            placeholder="Search by name or ID…"
                            value={search}
                            onChange={e => handleSearch(e.target.value)}
                        />
                        {search && <button style={s.clearBtn} onClick={() => handleSearch('')}>✕</button>}
                    </div>
                    <span style={s.count}>{filteredList.length} players</span>
                </div>

                {/* Grid */}
                <div style={s.grid}>
                    {filteredList.map((item, i) => (
                        <PlayersCard key={i} playerData={item} onClick={() => setSelectedPlayer(i)} />
                    ))}
                </div>
            </div>

            {selectedPlayer !== null && (
                <PlayersCardFull
                    playerDetails={filteredList[selectedPlayer]}
                    closeModal={() => setSelectedPlayer(null)}
                />
            )}
        </SidebarContainer>
    );
}

const s = {
    page: {},
    topBar: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 0 1rem', gap: '1rem',
    },
    searchWrap: {
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '10px',
        padding: '0.5rem 0.75rem', flex: 1, maxWidth: '360px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
    },
    searchIcon: { fontSize: '0.9rem', flexShrink: 0 },
    searchInput: {
        border: 'none', outline: 'none', background: 'transparent',
        fontSize: 'clamp(0.8rem, 1.2vmin, 1rem)', color: '#1e293b', flex: 1,
    },
    clearBtn: {
        background: 'none', border: 'none', cursor: 'pointer',
        color: '#94a3b8', fontSize: '0.8rem', padding: 0,
    },
    count: {
        fontSize: 'clamp(0.75rem, 1.1vmin, 0.95rem)',
        color: '#64748b', fontWeight: '600', flexShrink: 0,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '1rem',
    },
};
