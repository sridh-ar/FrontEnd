import { motion } from 'framer-motion';
import PlayersCard from '../components/PlayersCard';
import { ReceiptRefundIcon } from '@heroicons/react/24/outline';
import Button from '../components/common/Button';
import ModalWrapper from '../components/common/ModalWrapper';

export default function ThanksPage() {
    let data = localStorage.getItem('playerData');

    if (!data) {
        return (
            <ModalWrapper>
                <div className="relative bg-white rounded-lg shadow p-5 text-center">
                    <h3 className=" my-4 font-normal text-gray-500">Something went wrong. Contact Admin</h3>
                    <Button title="Return to Home" className="bg-red-500" onClick={() => window.location.replace('/')} />
                </div>
            </ModalWrapper>
        );
    }

    // Parsing Stringfy Data
    data = JSON.parse(data);

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <PlayersCard
                key={data.name}
                name={data.name}
                jerseyname={data.jersey_name}
                contact={data.contact_number}
                role={data.player_role}
                team={data.team_name}
                id={data.id}
                area={data.area}
                image={data.player_photo}
                approved={data.approved}
                battingStyle={data.batting_style}
                bowlingStyle={data.bowling_style}
                fromRegisterMenu
            />
            <motion.img
                src="/thanks-brown.gif"
                alt="Thanks"
                className="w-56 relative -z-20"
                initial={{ opacity: 0, top: -200 }}
                animate={{ opacity: 1, top: -20 }}
                transition={{ duration: 0.5 }}
            />
            <p className="font-semibold">Pleae take a Screenshot for Reference</p>
            <button
                className="bg-indigo-300 rounded-full p-1.5 px-6 text-sm my-4 flex items-center justify-center gap-1"
                onClick={() => window.location.replace('/')}
            >
                Return to Home
                <ReceiptRefundIcon width={20} />
            </button>
        </div>
    );
}
