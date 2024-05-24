"use client"
// import Footer from "../components/Footer";

const email = process.env.EMAIL || 'sairamanath@gmail.com'

export default function Privacy() {
  return (
    <main className="bg-white">
      {/* <!-- Heading --> */}
      <div class="md:max-w-screen-sm text-center px-4 sm:px-6 lg:px-8 pt-10 pb-6 mx-auto">
        <h1 class="text-2xl font-bold md:text-4xl dark:text-white">
          Privacy &amp; Policy
        </h1>
      </div>
      {/* <!-- End Heading --> */}

      {/* <!-- Content --> */}
      <div class="md:max-w-screen-sm lg:max-w-[992px] px-4 sm:px-6 lg:px-8 pb-12 md:pt-6 sm:pb-20 mx-auto">
        <div class="grid gap-4 md:gap-8">
          <div>
            <h2 class="text-lg sm:text-xl font-semibold mb-2 dark:text-white">
              Our Privacy Policy
            </h2>

            <p class="mb-4 dark:text-gray-400">
              We does not share personal information of any kind with
              anyone. We will not sell or rent your name or personal information
              to any third party. We DO NOT sell, rent or provide outside access
              to our mailing list or any data we store. Any data that a user
              stores via our facilities is wholly owned by that user or
              business. At any time a user or business is free to take their
              data and leave, or to simply delete their data from our
              facilities.
            </p>

            <p class="mb-4 dark:text-gray-400">
              We only collects such personal information that is necessary
              for you to access and use our services. This personal information
              includes, but is not limited to, first and last name, email
              address and other personal information necessary to generate
              proper legal documents.
            </p>

            <p class="dark:text-gray-400">
              We may release personal information if we are required to
              by law, search warrant, subpoena, court order or fraud
              investigation. We may also use personal information in a manner
              that does not identify you specifically nor allow you to be
              contacted but does identify certain criteria about our Sites
              users in general (such as we may inform third parties about the
              number of registered users, number of unique visitors, and the
              pages most frequently browsed).
            </p>
          </div>

          <div>
            <h2 class="text-lg sm:text-xl font-semibold mb-2 dark:text-white">
              Privacy Changes
            </h2>

            <p class="dark:text-gray-400">
              If we change our privacy policy we will post those changes on this
              page. Registered users will be sent an email that outlines changes
              made to the privacy policy.
            </p>
          </div>

          <div>
            <h2 class="text-lg sm:text-xl font-semibold mb-2 dark:text-white">
              Contact Us
            </h2>

            <p class="dark:text-gray-400">
              If you have any questions about these Privacy Policy, please contact us at
            </p>
            <a className="text-blue-500" href={`mailto:${email}`}>Email Us</a>
          </div>
        </div>
      </div>
      {/* <!-- End Content --> */}
      {/* <Footer /> */}
    </main>
  );
}
