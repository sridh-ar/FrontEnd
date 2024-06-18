import { XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import Icon from '../components/common/Icon';
// import { Meteors } from "./ui/meteors";
// import { Button } from "./ui/moving-border";

export default function PlayersCardFull({ name, id, role, team, battingStyle, bowlingStyle, area, image, closeModal }) {
    const [isBgLoading, setBgLoading] = useState(true);
    const [isPlayerLoading, setPlayerLoading] = useState(true);

    return (
        <div className="absolute left-0 top-0 z-50 h-screen w-screen">
            <div className="relative bg-white">
                {/* BG Image */}
                <img
                    src="/stadium_bg.jpg"
                    alt="Rounded avatar"
                    width={1000}
                    height={1000}
                    className="absolute col-span-1 h-screen w-screen rounded object-cover"
                    loading="eager"
                />
                <div className="absolute h-screen w-screen bg-black opacity-50" />

                {/* Close Icon */}
                <Icon icon="XCircleIcon" className="absolute right-8 top-6" size={7} onClick={() => closeModal(false)} />

                {/* Stars */}
                {/* <Meteors number={30} /> */}
                {/* <Meteors number={30} /> */}

                {/* Modal Body */}
                <div className="absolute grid h-screen w-full grid-cols-7 items-end p-5 px-20 text-white">
                    {/* Player Name */}
                    <section className="col-span-2 flex flex-col items-start">
                        <p className="text-7xl capitalize">{name.split(' ')[0]}</p>
                        {name.split(' ')[1] && <p className="text-5xl capitalize">{name.replace(name.split(' ')[0], '').trim()}</p>}
                        <p className="text-3xl capitalize">{team}</p>
                    </section>

                    {/* Player Image */}
                    <div className="col-span-3 flex w-full justify-center">
                        <img src={image} alt="Rounded avatar" className="max-h-[90vh] w-[90%] object-contain shadow-xl" loading="eager" />
                    </div>

                    {/* Table */}
                    <section className="col-span-2 flex flex-col items-end">
                        <table className="text-2xl">
                            <tr className="bg-gray-800">
                                <td className="p-2 px-5 font-semibold">Serial No</td>
                                <td>{id}</td>
                            </tr>
                            <tr>
                                <td className="p-2 px-5 font-semibold">Role</td>
                                <td>{role}</td>
                            </tr>
                            <tr className="bg-gray-800">
                                <td className="p-2 px-5 font-semibold">Batting Style</td>
                                <td>{battingStyle}</td>
                            </tr>
                            <tr>
                                <td className="p-2 px-5 font-semibold">Bowling Style</td>
                                <td>{bowlingStyle}</td>
                            </tr>
                            <tr className="bg-gray-800">
                                <td className="p-2 px-5 font-semibold">Team</td>
                                <td>{team}</td>
                            </tr>
                            <tr>
                                <td className="p-2 px-5 font-semibold">Area</td>
                                <td>{area}</td>
                            </tr>
                        </table>
                    </section>
                    <div className="absolute bottom-2 ml-[5%] h-1 w-[90%] shadow-[0_-5px_20px_#fff]" />
                    <div className="absolute bottom-2 ml-[5%] h-1 w-[90%] shadow-[0_-5px_20px_#fff]" />
                </div>
            </div>
            {isBgLoading && isPlayerLoading && (
                <div className="relative flex h-screen w-screen items-center justify-center bg-white">
                    <img src="/loading.gif" alt="loader" className="w-60" />
                </div>
            )}
        </div>
    );
}
