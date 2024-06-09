import { XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
// import { Meteors } from "./ui/meteors";
// import { Button } from "./ui/moving-border";

export default function PlayersCardFull({ name, id, role, team, battingStyle, bowlingStyle, area, image, closeModal }) {
    const [isBgLoading, setBgLoading] = useState(true);
    const [isPlayerLoading, setPlayerLoading] = useState(true);

    return (
        <div className="top-0 left-0 absolute w-screen h-screen z-50">
            <div className="relative bg-white">
                {/* BG Image */}
                <img
                    src="/stadium_bg.jpg"
                    alt="Rounded avatar"
                    width={1000}
                    height={1000}
                    className="w-screen h-screen rounded col-span-1 absolute object-cover"
                    loading="eager"
                />
                <div className="bg-black w-screen h-screen opacity-50 absolute" />

                {/* Close Icon */}
                <button className="absolute top-8 cursor-pointer right-8 w-[40px] h-[40px] z-50">
                    <XMarkIcon width={20} height={20} color="gray" onClick={() => closeModal(false)} />
                </button>

                {/* Stars */}
                {/* <Meteors number={30} /> */}
                {/* <Meteors number={30} /> */}

                {/* Modal Body */}
                <div className="absolute text-white w-full h-screen grid items-end p-5 px-20 grid-cols-7 ">
                    {/* Player Name */}
                    <section className="col-span-2 flex flex-col items-start">
                        <p className="text-7xl capitalize">{name.split(' ')[0]}</p>
                        {name.split(' ')[1] && <p className="text-5xl capitalize">{name.replace(name.split(' ')[0], '').trim()}</p>}
                        <p className="text-3xl capitalize">{team}</p>
                    </section>

                    {/* Player Image */}
                    <div className="col-span-3 w-full flex justify-center">
                        <img src={image} alt="Rounded avatar" className="w-[90%] max-h-[90vh] object-contain shadow-xl" loading="eager" />
                    </div>

                    {/* Table */}
                    <section className=" col-span-2 flex flex-col items-end">
                        <table className="text-2xl">
                            <tr className="bg-gray-800">
                                <td className="font-semibold p-2 px-5">Serial No</td>
                                <td>{id}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold p-2 px-5">Role</td>
                                <td>{role}</td>
                            </tr>
                            <tr className="bg-gray-800">
                                <td className="font-semibold p-2 px-5">Batting Style</td>
                                <td>{battingStyle}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold p-2 px-5">Bowling Style</td>
                                <td>{bowlingStyle}</td>
                            </tr>
                            <tr className="bg-gray-800">
                                <td className="font-semibold p-2 px-5">Team</td>
                                <td>{team}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold p-2 px-5">Area</td>
                                <td>{area}</td>
                            </tr>
                        </table>
                    </section>
                    <div className="absolute w-[90%] h-1 shadow-[0_-5px_20px_#fff] bottom-2 ml-[5%]" />
                    <div className="absolute w-[90%] h-1 shadow-[0_-5px_20px_#fff] bottom-2 ml-[5%]" />
                </div>
            </div>
            {isBgLoading && isPlayerLoading && (
                <div className="relative bg-white w-screen h-screen flex items-center justify-center">
                    <img src="/loading.gif" alt="loader" className="w-60" />
                </div>
            )}
        </div>
    );
}
