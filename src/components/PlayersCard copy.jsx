/* eslint-disable no-restricted-globals */
import { useState } from 'react';
import PlayersCardFull from './PlayerCardFull';
import { CheckCircleIcon, ClockIcon, PhoneIcon, AcademicCapIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function PlayersCard({
    name,
    contact,
    role,
    team,
    id,
    area,
    image,
    approved,
    handleApproved,
    battingStyle,
    bowlingStyle,
    fromRegisterMenu = false,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    function handleApprove() {
        fetch(`/api/select?query=select gpay_no,transaction_id from payment_details where player_no ='${id}'`)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    if (confirm(`Do you want to Approve this Player?\nGpay No: ${data[0].gpay_no} \nTransID: ${data[0].transaction_id}`)) {
                        fetch(`/api/update?query=update player set approved = true where id ='${id}'`)
                            .then((response) => response.json())
                            .then(() => {
                                handleApproved();
                            })
                            .catch((error) => console.error(error));
                    }
                } else {
                    if (confirm(`No Payment Data Found. Do you still want to approve?`)) {
                        fetch(`/api/update?query=update player set approved = true where id ='${id}'`)
                            .then((response) => response.json())
                            .then(() => {
                                handleApproved();
                            })
                            .catch((error) => console.error(error));
                    } else {
                        if (confirm(`Do you want to Delete this Player?`)) {
                            fetch(`/api/update?query=delete from player where id ='${id}'`)
                                .then((response) => response.json())
                                .then(() => {
                                    handleApproved();
                                })
                                .catch((error) => console.error(error));
                        }
                    }
                }
            })
            .catch((error) => console.error(error));
    }
    return (
        <div className={`bg-white shadow p-3 flex h-full items-center rounded-md ${fromRegisterMenu ? 'w-[100%]' : 'w-[90%]'}`}>
            <section className="flex items-center justify-center">
                {isLoading && <img src="/loading.gif" className="absolute rounded-full scale-50" />}
                <img
                    src={image}
                    alt="Rounded avatar"
                    loading="eager"
                    onLoad={() => setIsLoading(false)}
                    onClick={() => setIsOpen(true)}
                    className={`w-40 h-40 object-cover mx-5 mr-7 rounded-full col-span-1 ring-1 ring-gray-200 p-0.5 shadow-md `}
                />
            </section>

            {/* Second Column */}
            <div onClick={() => setIsOpen(true)}>
                {/* Name */}
                <section className="text-lg font-semibold text-gray-600 capitalize mb-2">
                    {name.length > 20 ? name.slice(0, 20) + '..' : name}
                </section>

                {/* Phone */}
                <section className="flex items-center justify-center my-1">
                    <span className=" w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mx-2">
                        <PhoneIcon width={20} height={20} />
                    </span>

                    <div className="text-gray-600 text-sm">
                        Phone
                        <p className="font-semibold">{contact}</p>
                    </div>
                </section>

                {/* Role */}
                <section className="flex items-center justify-center my-1">
                    <span className=" w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mx-2">
                        <AcademicCapIcon width={20} height={20} />
                    </span>

                    <div className="text-gray-600 text-sm">
                        Role
                        <p className="font-semibold">{role}</p>
                    </div>
                </section>

                {/* Team */}
                <section className="flex items-center justify-center my-1">
                    <span className=" w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mx-2">
                        <UserGroupIcon width={20} height={20} />
                    </span>

                    <div className="text-gray-600 text-sm">
                        Team
                        <p className="font-semibold">{team}</p>
                    </div>
                </section>
            </div>
        </div>

        /* Full Screen */
        /* {!fromRegisterMenu && isOpen == true && (
                <PlayersCardFull
                    name={name}
                    id={id}
                    role={role}
                    team={team}
                    area={area}
                    battingStyle={battingStyle}
                    bowlingStyle={bowlingStyle}
                    image={image}
                    closeModal={() => setIsOpen(false)}
                />
            )} */
    );
}
