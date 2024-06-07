import { motion } from 'framer-motion';

const inputNames = [
    {
        id: 1,
        name: 'Your Gpay Name',
        type: 'text',
    },
    {
        id: 2,
        name: 'Your Gpay number',
        type: 'number',
    },
    {
        id: 3,
        name: 'Transaction Id',
        type: 'text',
    },
];

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.1,
            staggerChildren: 0.05,
        },
    },
};

const itemAnimation = {
    hidden: { y: 10, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

export default function PaymentPage({ id, submit }) {
    function handleSubmit(event) {
        event.preventDefault();
        let values = [];
        for (let i = 0; i < 3; i++) {
            values.push(event.target[i].value);
        }
        values.push(id);
        fetch('/api/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
            .then((response) => response.json())
            .then(() => submit())
            .catch((error) => console.error(error));
    }
    return (
        <motion.form
            className="flex flex-col justify-between items-center p-5 h-full  bg-white m-3 shadow-md rounded-md"
            onSubmit={handleSubmit}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <img src="/upi.png" alt="Next.js Logo" width={250} height={250} />
            <p className="text-sm my-1">
                {' '}
                <b>PhonePe/Gpay No: </b> 8682021651
            </p>
            <p className="text-sm">
                {' '}
                <b>UPI Id: </b> 8682021651@ybl
            </p>

            <>
                <div className="grid grid-cols-2 gap-5 w-full p-5 ">
                    {inputNames.map((item) => (
                        <div key={item.id}>
                            <motion.label className="text-sm" variants={itemAnimation}>
                                {item.name}
                                <span className="text-red-600"> *</span>
                            </motion.label>
                            {item.type != 'select' && (
                                <motion.input
                                    id={item.id}
                                    variants={itemAnimation}
                                    type={item.type}
                                    required
                                    placeholder={`${item.name}`}
                                    className={'w-full outline-0 ring-1 rounded ring-slate-400 h-8 text-sm p-4 m-1'}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="w-full flex flex-col text-sm">
                    <h3 className="font-bold">Steps to Make payment:</h3>
                    <ol className="relative list-disc left-10 my-3 w-[80%] sm:w-full break-words">
                        <li>
                            Scan or Send the amount to UPI Id using Google Pay, PhonePe or any Banking UPI to make payment for this
                            registration.
                        </li>
                        <li>After successful payment, enter the UPI Reference ID or Transaction Number below and submit the form.</li>
                        <li>We will manually verify the payment against your 12-digits UPI Reference ID or Transaction Number.</li>
                    </ol>
                </div>
            </>
            <motion.button
                type="submit"
                variants={itemAnimation}
                className="w-32 rounded bg-indigo-400 h-10 p-2 flex justify-center items-center m-3 cursor-pointer text-white"
                whileHover={{ scale: 1.1 }}
            >
                Submit
            </motion.button>
        </motion.form>
    );
}
