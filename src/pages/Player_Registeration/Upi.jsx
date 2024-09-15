import { motion } from 'framer-motion';
import PlayersCard from '../Player_Dashboard/PlayersCard.jsx';
import { ReceiptRefundIcon } from '@heroicons/react/24/outline';
import Button from '../../commonComponents/Button.jsx';
import ModalWrapper from '../../commonComponents/ModalWrapper.jsx';

export default function UPI() {
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-200 p-5">
            <img src="/upi.jpeg" alt="Upi Image" />
            <p className="mt-4 font-semibold">Please make the Payment.</p>
            <button
                className="my-4 flex items-center justify-center gap-1 rounded-full bg-black p-1.5 px-6 text-sm text-white"
                // onClick={() => window.location.replace('/')}
                onClick={() => window.location.replace('/thanks')}
            >
                Submit
                {/* <ReceiptRefundIcon width={20} /> */}
            </button>
        </div>
    );
}
