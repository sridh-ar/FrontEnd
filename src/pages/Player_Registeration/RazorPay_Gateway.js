import { fetchAPI } from '../../utils/commonServices.js';

async function initializeRazorpay() {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';

        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };

        document.body.appendChild(script);
    });
}

export default async function makePayment(name, contact, amount, id) {
    return new Promise(async (resolve, reject) => {
        const res = await initializeRazorpay();

        if (!res) {
            alert('Razorpay SDK Failed to load');
            return;
        }

        let order_id;
        try {
            await fetchAPI('/payment/create-order', 'POST', {
                amount,
                currency: 'INR',
                userId: Number.parseInt(id),
            }).then((response) => {
                order_id = response.order.id;
            });
        } catch (error) {
            alert(`Order creation failed: ${error.message}`);
        }

        const key = (await fetchAPI('/payment/getKey'))['key'];

        var options = {
            key: key,
            name: 'League Tournament',
            currency: 'INR',
            amount: 100 * parseInt(amount),
            order_id: order_id,
            description: 'Thank you!',
            // image: '/leo.png',
            handler: async function (response) {
                try {
                    console.log(response);
                    await fetchAPI('/payment/verify-payment', 'POST', {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        userId: Number.parseInt(id),
                    }).then((data) => window.location.replace('/thanks'));
                } catch (error) {
                    alert('Payment Failed');
                }
                // return resolve(response.razorpay_payment_id);
            },
            prefill: {
                name: name,
                contact: contact,
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    });
}
