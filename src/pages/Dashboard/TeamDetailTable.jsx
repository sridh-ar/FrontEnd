import Button from '../../commonComponents/Button';
import { animations } from '../../utils/animationConstant';
import { TEAM_TABLE_ROWS } from '../../utils/constants';
import { motion } from 'framer-motion';
import TeamImage from './TeamImage';
import { useState } from 'react';

export default function TeamDetailScreen({ playersData = [], closeFunction }) {
    const [openTeamImage, setOpenTeamImage] = useState(false);
    return (
        <>
            <div className="relative z-10 mb-[0.5px] flex h-[10%] items-center gap-10 rounded-t-3xl bg-white px-8 text-lg font-semibold italic text-[#aab4c3] shadow">
                {/* Close Button */}
                <Button title="Back to Teams 🎯" className="absolute right-10 scale-75 bg-black text-white" onClick={closeFunction} />
                {/* Download Button */}
                <Button
                    title="Download Team Image 📷"
                    className="absolute right-48 scale-75 bg-slate-300 text-black"
                    onClick={() => setOpenTeamImage(true)}
                />

                {/* Heading */}
                <p>
                    Team Name: <span className="capitalize text-gray-600">{playersData[0].team_name}</span>
                </p>
                <p>
                    Owner Name: <span className="capitalize text-gray-600">{playersData[0].owner}</span>
                </p>
            </div>

            {/* Table Headers */}
            <div className="relative z-10 grid h-[10%] grid-cols-6 items-center bg-white text-center text-sm shadow">
                {TEAM_TABLE_ROWS.map((row) => (
                    <span className="py-3 font-normal tracking-wider text-[#aab4c3]">{row}</span>
                ))}
                <span className="absolute bottom-0 right-0 h-[0.5px] w-full bg-slate-200" />
            </div>

            {/* Table Body */}
            <motion.div
                className="h-[82%] overflow-y-scroll rounded-b-3xl bg-white text-center text-sm"
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.1 }}
            >
                {playersData.map((player, index) => (
                    <motion.div
                        className="relative grid h-10 grid-cols-6 items-center text-center text-sm"
                        key={index}
                        variants={animations.opacityAnimation}
                    >
                        <span>{player.id}</span>
                        <span>{player.name.length > 15 ? `${player.name.slice(0, 15)}...` : player.name}</span>
                        <span>{player.contact_number}</span>
                        <span>{player.jersey_name}</span>
                        <span>{player.jersey_size}</span>
                        <span>{player.jersey_no}</span>
                        <span className="absolute bottom-0 right-0 h-[0.5px] w-full bg-slate-200" />
                    </motion.div>
                ))}
            </motion.div>
            {openTeamImage && <TeamImage teamData={playersData} closeModal={() => setOpenTeamImage(false)} />}
        </>
    );
}
