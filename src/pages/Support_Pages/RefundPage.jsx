'use client';
// import Footer from "../components/Footer";

const email = process.env.EMAIL || 'sairamanath@gmail.com';
const cancel_date = process.env.CANCEL_DATE || '5';
const refund_date = process.env.REFUND_DATE || '2';

export default function RefundPage() {
    return (
        <main className="bg-white">
            {/* <!-- Heading --> */}
            <div className="mx-auto px-4 pb-6 pt-10 text-center sm:px-6 md:max-w-screen-sm lg:px-8">
                <h1 className="text-2xl font-bold md:text-4xl dark:text-white">Cancellation & Refund Policy</h1>
            </div>
            {/* <!-- End Heading --> */}

            {/* <!-- Content --> */}
            <div className="mx-auto px-4 pb-12 sm:px-6 sm:pb-20 md:max-w-screen-sm md:pt-6 lg:max-w-[992px] lg:px-8">
                <div className="grid gap-4 md:gap-8">
                    <div>
                        <h2 className="mb-2 text-lg font-semibold sm:text-xl dark:text-white">Registration Cancellation</h2>

                        <p className="dark:text-gray-400">
                            {`Participants who wish to cancel their registration must notify in
              writing by emailing {email} with the subject line "Tournament
              Registration Cancellation."`}
                        </p>
                    </div>

                    <div>
                        <h2 className="mb-2 text-lg font-semibold sm:text-xl dark:text-white">Refund Policy</h2>

                        <p className="mb-2 dark:text-gray-400">
                            Participants who cancel their registration before {cancel_date} days prior to the tournament start date are
                            eligible for a full refund.
                        </p>
                        <p className="mb-2 dark:text-gray-400">
                            Participants who fail to attend the tournament without prior notice will not be eligible for any refund.
                        </p>
                        <p className="mb-2 dark:text-gray-400">
                            Refunds will be processed within {refund_date} business days from the date of receiving the cancellation
                            request.
                        </p>
                        <p className="mb-2 dark:text-gray-400">
                            No refunds will be issued for cancellations made within 2 days of the tournament start date.{' '}
                        </p>
                        <p className="dark:text-gray-400">
                            In the event that we cancels a tournament, participants will be notified promptly, and a full refund will be
                            issued to all registered participants.{' '}
                        </p>
                    </div>

                    <div>
                        <h2 className="mb-2 text-lg font-semibold sm:text-xl dark:text-white">Contact Us</h2>

                        <p className="dark:text-gray-400">
                            If you have any questions about these Cancellation Policy, please contact us at
                        </p>
                        <a className="text-blue-500" href={`mailto:${email}`}>
                            Email Us
                        </a>
                    </div>
                </div>
            </div>
            {/* <!-- End Content --> */}
            {/* <Footer /> */}
        </main>
    );
}
