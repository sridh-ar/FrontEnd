import Icon from '../../commonComponents/Icon';
import { animations } from '../../utils/animationConstant';
import { TEAM_DASHBOARD_ROWS } from '../../utils/constants';
import { motion } from 'framer-motion';

export default function TeamTable({ tableData = [], openTeamDetails, handleNewTeamPlayer, handleTeamDelete, editTeamData }) {
    return (
        <>
            <div className="relative z-10 grid h-[10%] grid-cols-9 items-center rounded-t-3xl bg-white text-center text-sm shadow">
                {TEAM_DASHBOARD_ROWS.map((row) => (
                    <span className={`py-3 font-normal tracking-wider text-[#aab4c3] ${row == 'Team Name' ? 'col-span-2' : ''} `}>
                        {row}
                    </span>
                ))}
                <span className="absolute bottom-0 right-0 h-[0.5px] w-full bg-slate-200" />
            </div>
            <motion.div
                className="no-scrollbar h-[92%] overflow-y-scroll rounded-b-3xl bg-white text-center text-sm"
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.1 }}
            >
                {tableData.map((item, index) => (
                    <motion.div
                        className="relative grid h-10 grid-cols-9 items-center text-center text-sm"
                        key={index}
                        variants={animations.opacityAnimation}
                    >
                        <span className="col-span-2 flex cursor-pointer items-center gap-4 px-10" onClick={() => openTeamDetails(item.id)}>
                            <img src={item.team_photo} className="h-8 w-8 rounded" />
                            {item.team_name}
                        </span>
                        <span> {item.captain.length > 15 ? `${item.captain.slice(0, 15)}...` : item.captain} </span>
                        <span> {item.owner.length > 10 ? `${item.owner.slice(0, 10)}...` : item.owner} </span>
                        <span>{item.slots}</span>
                        <span> {item.remaining_slots} </span>
                        <span>{item.total_points_available}</span>
                        <span>{item.remaining_points_available}</span>

                        <span className="flex cursor-pointer items-center justify-evenly">
                            <Icon icon="UserPlusIcon" size={5} className="fill-green-800" onClick={() => handleNewTeamPlayer(item)} />
                            <Icon icon="PencilSquareIcon" size={5} className="fill-sky-700" onClick={() => editTeamData(item)} />
                            <Icon icon="TrashIcon" size={5} className="fill-red-700" onClick={() => handleTeamDelete(item.id)} />
                        </span>
                        <span className="absolute bottom-0 right-0 h-[0.5px] w-full bg-slate-200" />
                    </motion.div>
                ))}
            </motion.div>
        </>
    );
}
