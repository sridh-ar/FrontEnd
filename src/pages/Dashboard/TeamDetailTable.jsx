import Button from '../../commonComponents/Button';
import { TEAM_TABLE_ROWS } from '../../utils/constants';

export default function TeamDetailScreen({ playersData = [], closeFunction }) {
    return (
        <>
            <div className="relative z-10 mb-[0.5px] flex h-[10%] items-center gap-10 rounded-t-3xl bg-white px-8 text-lg font-semibold italic text-[#aab4c3] shadow">
                <Button title="Close" className="absolute right-10 w-32 scale-75 bg-black text-white" onClick={closeFunction} />
                <p>
                    Team Name: <span className="capitalize text-gray-600">{playersData[0].team_name}</span>
                </p>
                <p>
                    Owner Name: <span className="capitalize text-gray-600">{playersData[0].owner}</span>
                </p>
            </div>

            <div className="relative z-10 grid h-[10%] grid-cols-6 items-center bg-white text-center text-sm shadow">
                {TEAM_TABLE_ROWS.map((row) => (
                    <span className="py-3 font-normal tracking-wider text-[#aab4c3]">{row}</span>
                ))}
                <span className="absolute bottom-0 right-0 h-[0.5px] w-full bg-slate-200" />
            </div>
            <div className="h-[82%] overflow-y-scroll rounded-b-3xl bg-white text-center text-sm">
                {playersData.map((player, index) => (
                    <div className="relative grid h-10 grid-cols-6 items-center text-center text-sm" key={index}>
                        <span>{player.id}</span>
                        <span>{player.name.length > 15 ? `${player.name.slice(0, 15)}...` : player.name}</span>
                        <span>{player.contact_number}</span>
                        <span>{player.jersey_name}</span>
                        <span>{player.jersey_size}</span>
                        <span>{player.jersey_no}</span>
                        <span className="absolute bottom-0 right-0 h-[0.5px] w-full bg-slate-200" />
                    </div>
                ))}
            </div>
        </>
    );
}
