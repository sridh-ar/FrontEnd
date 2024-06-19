import { motion } from 'framer-motion';
import PlayersCard from '../Player_Dashboard/PlayersCard.jsx';
import { ReceiptRefundIcon } from '@heroicons/react/24/outline';
import Button from '../../commonComponents/Button';
import ModalWrapper from '../../commonComponents/ModalWrapper';

export default function ThanksPage() {
    let data = localStorage.getItem('playerData');

    if (!data) {
        return (
            <ModalWrapper>
                <div className="relative rounded-lg bg-white p-5 text-center shadow">
                    <h3 className="my-4 font-normal text-gray-500">Something went wrong. Contact Admin</h3>
                    <Button title="Return to Home" className="bg-red-500" onClick={() => window.location.replace('/')} />
                </div>
            </ModalWrapper>
        );
    }

    // Parsing Stringfy Data
    data = JSON.parse(data);

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-200 p-5">
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
            <p className="mt-4 font-semibold">Pleae take a Screenshot for Reference</p>
            <button
                className="my-4 flex items-center justify-center gap-1 rounded-full bg-black p-1.5 px-6 text-sm text-white"
                onClick={() => window.location.replace('/')}
            >
                Return to Home
                <ReceiptRefundIcon width={20} />
            </button>
        </div>
    );
}
