import Footer from '../../components/Footer';

const email = process.env.EMAIL || 'sairamanath@gmail.com';

export default function Terms() {
    return (
        <main className="bg-gray-100">
            <div className="md:max-w-screen-sm text-center px-4 sm:px-6 lg:px-8 pt-10 pb-6 mx-auto">
                <h1 className="text-2xl font-bold md:text-4xl dark:text-white">Terms &amp; Conditions</h1>
            </div>

            <div className="md:max-w-screen-sm lg:max-w-[992px] px-4 sm:px-6 lg:px-8 pb-12 md:pt-6 sm:pb-20 mx-auto">
                <div className="grid gap-4 md:gap-8">
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold mb-2 dark:text-white">General Terms</h2>

                        <p className="mb-3 dark:text-gray-400">
                            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
                            These Terms apply to all visitors visiting the site for information or other purposes.
                        </p>

                        <p className="mb-2 dark:text-gray-400">
                            By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the
                            terms, you may not access the Service.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold mb-2 dark:text-white">Accounts</h2>

                        <p className="mb-2 dark:text-gray-400">
                            We are not offering any accounts right now on our website. This website require no signup or login.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold mb-2 dark:text-white">Security</h2>

                        <p className="dark:text-gray-400">
                            We does not process any order payments through the website. All payments are processed securely through online
                            payment provider (e.g. PayPal, Stripe), a third party online payment provider. Feel free to contact us about our
                            security policies.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold mb-2 dark:text-white">Ownership</h2>

                        <p className="dark:text-gray-400">
                            Ownership of the product is governed by the usage license selected by the seller.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold mb-2 dark:text-white">Changes to terms</h2>

                        <p className="dark:text-gray-400">
                            If we change our terms of use we will post those changes on this page. Registered users will be sent an email
                            that outlines changes made to the terms of use.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold mb-2 dark:text-white">Contact Us</h2>

                        <p className="dark:text-gray-400">If you have any questions about these Terms, please contact us at</p>
                        <a className="text-blue-500" href={`mailto:${email}`}>
                            Email Us
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
