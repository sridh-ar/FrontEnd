export default function Footer() {
    return (
        <footer className="mt-5 w-full bg-gray-800 p-4 shadow md:p-8 lg:p-10">
            <div className="mx-auto max-w-screen-xl text-center">
                <p className="my-3 mt-0 text-gray-400">
                    Register for exciting competitions, showcase your skills, and compete for glory in our upcoming events.
                </p>
                <ul className="mb-6 flex flex-wrap items-center justify-center text-white">
                    <li>
                        <a href="/support" className="mr-4 hover:underline md:mr-6">
                            Contact
                        </a>
                    </li>
                    <li>
                        <a href="/terms" className="mr-4 hover:underline md:mr-6">
                            Terms & conditions
                        </a>
                    </li>
                    <li>
                        <a href="/privacy" className="mr-4 hover:underline md:mr-6">
                            Privacy policy
                        </a>
                    </li>
                    <li>
                        <a href="/cancellation-refund" className="mr-4 hover:underline md:mr-6">
                            Cancellation & Refund Policy
                        </a>
                    </li>
                </ul>
                <span className="text-sm text-gray-400 sm:text-center">©2024-2025. All Rights Reserved.</span>
            </div>
        </footer>
    );
}
