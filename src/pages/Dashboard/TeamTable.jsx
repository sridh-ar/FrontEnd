import Icon from '../../commonComponents/Icon';
import { TEAM_DASHBOARD_ROWS } from '../../utils/constants';

export default function TeamTable({ tableData = [], openTeamDetails, handleNewTeamPlayer, handleTeamDelete }) {
    return (
        <>
            <div className="relative z-10 grid h-[10%] grid-cols-8 items-center rounded-t-3xl bg-white text-center text-sm shadow">
                {TEAM_DASHBOARD_ROWS.map((row) => (
                    <span className="py-3 font-normal tracking-wider text-[#aab4c3]">{row}</span>
                ))}
                <span className="absolute bottom-0 right-0 h-[0.5px] w-full bg-slate-200" />
            </div>
            <div className="h-[92%] overflow-y-scroll rounded-b-3xl bg-white text-center text-sm">
                {tableData.map((item, index) => (
                    <div className="relative grid h-10 grid-cols-8 items-center text-center text-sm" key={index}>
                        <span className="relative flex cursor-pointer items-center justify-center" onClick={() => openTeamDetails(item.id)}>
                            {item.team_name && <img src={item.team_photo} className="mr-2 h-8 w-8 rounded" />}
                            {item.team_name.slice(0, 15)}
                        </span>

                        <span> {item.captain.length > 15 ? `${item.captain.slice(0, 15)}...` : item.captain} </span>
                        <span> {item.owner.length > 10 ? `${item.owner.slice(0, 10)}...` : item.owner} </span>
                        <span>{item.slots}</span>
                        <span> {item.remaining_slots} </span>
                        <span>{item.total_points_available}</span>
                        <span>{item.remaining_points_available}</span>

                        <span className="flex cursor-pointer items-center justify-evenly">
                            <Icon icon="UserPlusIcon" className="fill-green-800" onClick={() => handleNewTeamPlayer(item)} />
                            <Icon icon="TrashIcon" className="fill-red-700" onClick={() => handleTeamDelete(item.id)} />
                        </span>
                        <span className="absolute bottom-0 right-0 h-[0.5px] w-full bg-slate-200" />
                    </div>
                ))}
            </div>
        </>
    );
}
