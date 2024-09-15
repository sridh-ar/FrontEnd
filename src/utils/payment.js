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

export default async function makePayment(name, email, contact, amount) {
    return new Promise(async (resolve, reject) => {
        // console.log(name, email, contact, amount);
        const res = await initializeRazorpay();

        if (!res) {
            alert('Razorpay SDK Failed to load');
            return;
        }

        var options = {
            key: process.env.PAYMENT_KEY || 'rzp_live_7cYtod0RMTr5P4',
            name: 'Register for Tournament',
            currency: 'INR',
            amount: 100 * parseInt(amount),
            // order_id: "asdfsd",
            description: 'Thank you!',
            image: '/leo.png',
            handler: function (response) {
                return resolve(response.razorpay_payment_id);
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
            },
            prefill: {
                name: name,
                email: email,
                contact: contact,
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    });
}
