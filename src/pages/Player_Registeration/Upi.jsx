import { motion } from 'framer-motion';
import PlayersCard from '../Player_Dashboard/PlayersCard.jsx';
import { ReceiptRefundIcon } from '@heroicons/react/24/outline';
import Button from '../../commonComponents/Button.jsx';
import ModalWrapper from '../../commonComponents/ModalWrapper.jsx';
import { fetchAPI } from '../../utils/commonServices.js';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function UPI() {
    const location = useLocation();
    const id = location.state.id;
    console.log(id);
    const [amount, setAmount] = useState(111);
    const [loading, setisLoading] = useState(false);
    const [key, setKey] = useState('');
    const [order_id, setorderId] = useState(0);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false); // Track SDK loading

    const { name, contact_number } = JSON.parse(localStorage.getItem('playerData'));

    const getKey = async () => {
        try {
            const response = await fetchAPI('/payment/getKey', 'GET');
            const key = response.key;
            setKey(key);
            console.log('Razorpay Key:', key);
        } catch (error) {
            console.error('Error fetching Razorpay Key:', error);
        }
    };

    useEffect(() => {
        getKey();
        loadRazorpaySDK(); // Load the SDK when the component mounts
    }, []);

    const loadRazorpaySDK = () => {
        if (window.Razorpay) {
            setRazorpayLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => setRazorpayLoaded(true);
        script.onerror = () => console.error('Razorpay SDK failed to load.');
        document.body.appendChild(script);
    };

    const handlePayment = async () => {
        if (!razorpayLoaded) {
            console.error('Razorpay SDK not loaded.');
            return;
        }

        try {
            setisLoading(true);

            const data = await fetchAPI('/payment/create-order', 'POST', {
                amount,
                currency: 'INR',
                userId: Number.parseInt(id),
            });

            if (data.success) {
                console.log('Order ID:', data.order.id);
            } else {
                console.error('Order creation failed:', data);
            }
            console.log(data);
            setorderId(data.order.id);

            const options = {
                key: key,
                amount: amount * 100,
                currency: 'INR',
                name: 'League_tournament',
                description: 'payment successful',
                order_id: order_id,
                handler: async function (response) {
                    console.log(response);
                    const verify = await fetchAPI('/payment/verify-payment', 'POST', {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        userId: Number.parseInt(id),
                    });
                    // const verify = await fetchAPI('/payment/verify-payment', 'POST', body);

                    if (verify.success) {
                        alert('Payment Successful!');
                        window.location.replace('/thanks');
                    } else {
                        alert('Payment Failed');
                    }
                },
                notes: {
                    address: 'Razorpay Corporate office',
                },
                theme: { color: '#3399cc' },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
            rzp1.open();
        } catch (error) {
            console.error('Payment Error:', error);
        } finally {
            setisLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-200 p-5">
            <h2>Make a Payment</h2>
            <button
                onClick={handlePayment}
                disabled={loading || !razorpayLoaded} // Disable if loading or SDK not loaded
                className="my-4 flex items-center justify-center gap-1 rounded-full bg-black p-1.5 px-6 text-sm text-white"
            >
                {loading ? 'Processing Payment...' : razorpayLoaded ? `Pay ₹${amount}` : 'Loading Payment Gateway...'}
            </button>
        </div>
    );
}
