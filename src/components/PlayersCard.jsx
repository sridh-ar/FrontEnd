/* eslint-disable no-restricted-globals */
import { useState } from 'react';
import Icon from './common/Icon';
import { fetchAPI } from '../utils/commonServices';
import toast from 'react-hot-toast';
import loader from '../images/loading.gif';

function TextField({ title, value, icon }) {
    return (
        <section className="flex items-center justify-center my-1">
            <span className=" w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mx-2">
                <Icon icon={icon} size={5} outline />
            </span>

            <div className="text-gray-600 text-sm">
                {title}
                <p className="font-semibold">{value}</p>
            </div>
        </section>
    );
}

export default function PlayersCard({ name, contact, role, team, image, id }) {
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    async function handleDelete() {
        setIsButtonLoading(true);
        try {
            await fetchAPI(`/player/delete/${id}`, 'PUT');
            window.location.reload();
        } catch (error) {
            toast.error('Unable to Delete the Player.');
        }
        setIsButtonLoading(false);
    }

    return (
        <main className="bg-white shadow p-3 flex w-full items-center rounded-md relative">
            <img
                src={image}
                alt="Rounded avatar"
                loading="eager"
                // onLoad={() => setIsLoading(false)}
                // onClick={() => setIsOpen(true)}
                className={`w-40 h-40 object-cover mx-5 mr-7 rounded-full col-span-1 ring-1 ring-gray-200 p-0.5 shadow-md `}
            />
            <div className="flex items-start flex-col ml-5">
                <section className="text-lg font-semibold text-gray-600 capitalize mb-2">
                    {name.length > 20 ? name.slice(0, 20) + '..' : name}
                </section>
                <TextField title="Phone" value={contact} icon="PhoneIcon" />
                <TextField title="Role" value={role} icon="AcademicCapIcon" />
                <TextField title="Team" value={team} icon="UserGroupIcon" />
            </div>

            {/* Delete Icon */}
            {!isButtonLoading ? (
                <Icon
                    icon="XCircleIcon"
                    size={6}
                    className="cursor-pointer fill-red-500 absolute right-3 top-3"
                    onClick={() => handleDelete()}
                    tooltip="Delete"
                />
            ) : (
                <img src={loader} alt="Loading" className="w-5 absolute right-3 top-3" />
            )}
        </main>
    );
}
