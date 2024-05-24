import "./app.css";
import { useEffect, useState } from "react";

// Components
import Footer from "./components/Footer";

// Redux
import LoadingScreen from "./components/common/LoadingScreen";
import { useSelector, useDispatch } from 'react-redux';
import { updateConfigStateValue } from "./utils/stateVariables";

// Images
import logo from './images/leo.png'

export default function Home() {
  // States
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Redux State
  const dispatch = useDispatch();
  const configValues = useSelector((state) => state.config.value);

  async function validateUser() {
    // const res = await validateToken();
    // if (res) 
    setLoggedIn(true);
    // else setLoggedIn(false);
  }

  async function initialDataRetrival() {
    fetch("https://leaguebackend-sridhars-projects-ef3aeec5.vercel.app/admin", { method: "GET" })
      .then((response) => response.json())
      .then(result => {
        const configObject = result.reduce((accumulator, current) => {
          accumulator[current.config_name] = current.config_value;
          return accumulator;
        }, {});

        dispatch(updateConfigStateValue(configObject))
        setIsLoading(false)
      })
  }

  useEffect(() => {
    validateUser();
    initialDataRetrival();

    // setTimeout(() => setIsLoading(false), 200);

  }, []);
  return (
    isLoading ?
      (
        <div className="w-screen h-screen">
          <LoadingScreen />
        </div>
      )
      :
      (
        <main className="flex items-center justify-between flex-col h-screen w-full bg-gray-200">
          {/* Logo Image */}
          <a href={loggedIn ? "/dashboard" : "/signin"}>
            <img
              className="relative outline-none m-5"
              src={logo}
              alt="Next.js Logo"
              width={250}
              height={250}
              priority
            />
          </a>

          { /* Body */}
          <div className="flex items-center flex-col">
            <a className="flex justify-center items-center bg-[#ffffff] shadow px-6 py-1.5 rounded-full text-sm tracking-wide cursor-pointer m-1 sm:w-full"
              href={configValues.remainingSlots <= 0 ? '/playerRegister' : `/playerRegister`}>
              {`Register for ${configValues.appName} 🏆`}
            </a>

            { /* Remaining Slots */}
            <span className="text-xs tracking-wide text-orange-700 mt-3">
              Remaininig Slots - {configValues.remainingSlots}
            </span>
          </div >

          { /* Footer */}
          <Footer />
        </main>
      )

  );
}