import { XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import Icon from '../../commonComponents/Icon';
// import { Meteors } from "./ui/meteors";
// import { Button } from "./ui/moving-border";

export default function PlayersCardFull({ playerDetails, closeModal }) {
    const { name, id, player_role, team_name, batting_style, bowling_style, area, player_photo } = playerDetails;
    const [isBgLoading, setBgLoading] = useState(true);
    const [isPlayerLoading, setPlayerLoading] = useState(true);

    return (
        <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-end">
            {/* BG Image */}
            <img
                src="/stadium_bg.jpg"
                alt="Rounded avatar"
                width={1000}
                height={1000}
                className="absolute col-span-1 h-full w-screen rounded object-cover"
                loading="eager"
            />
            <div className="absolute bg-black opacity-50" />

            {/* Close Icon */}
            <Icon icon="XCircleIcon" className="absolute right-8 top-6 z-50 text-white" size={10} onClick={closeModal} />

            {/* Modal Body */}
            <div className="absolute grid w-full grid-cols-8 items-end p-5 px-20 text-white">
                {/* Player Name */}
                <section className="col-span-2 flex flex-col items-start">
                    <p className="text-7xl capitalize">{name.split(' ')[0]}</p>
                    {name.split(' ')[1] && <p className="text-5xl capitalize">{name.replace(name.split(' ')[0], '').trim()}</p>}
                    <p className="text-3xl capitalize">{team_name}</p>
                </section>

                {/* Player Image */}
                <div className="col-span-3 flex w-full justify-center">
                    <img
                        src={player_photo}
                        alt="Rounded avatar"
                        className="max-h-[90vh] w-[90%] object-contain shadow-xl"
                        loading="eager"
                    />
                </div>

                {/* Table */}
                <section className="col-span-3 flex flex-col items-end">
                    <table className="text-2xl">
                        <tr className="bg-gray-800">
                            <td className="p-2 px-5 font-semibold">Serial No</td>
                            <td>{id}</td>
                        </tr>
                        <tr>
                            <td className="p-2 px-5 font-semibold">Role</td>
                            <td>{player_role}</td>
                        </tr>
                        <tr className="bg-gray-800">
                            <td className="p-2 px-5 font-semibold">Batting Style</td>
                            <td>{batting_style}</td>
                        </tr>
                        <tr>
                            <td className="p-2 px-5 font-semibold">Bowling Style</td>
                            <td>{bowling_style}</td>
                        </tr>
                        <tr className="bg-gray-800">
                            <td className="p-2 px-5 font-semibold">Team</td>
                            <td>{team_name}</td>
                        </tr>
                        <tr>
                            <td className="p-2 px-5 font-semibold">Area</td>
                            <td>{area}</td>
                        </tr>
                    </table>
                </section>
                <div className="absolute bottom-2 ml-[5%] h-1 w-[90%] rounded-full bg-white opacity-75 shadow-[0_-5px_20px_#fff]" />
                <div className="absolute bottom-2 ml-[5%] h-1 w-[90%] rounded-full bg-white opacity-75 shadow-[0_-5px_20px_#fff]" />
            </div>
        </div>
    );
}
