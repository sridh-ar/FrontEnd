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
import Button from "./components/common/Button";

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

  // Loading Component
  if (isLoading) {
    return (
      <div className="w-screen h-screen">
        <LoadingScreen />
      </div>
    )
  }

  return (
    <main className="grid grid-rows-1 h-screen w-full bg-gray-200">

      {/* Body */}
      <div className="row-span-2 flex flex-col items-center">
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

        { /* Button */}
        <div className="flex items-center flex-col">
          <Button
            title={`Register for ${configValues.appName} 🏆`}
            onClick={() => window.location.replace(configValues.remainingSlots <= 0 ? '#' : `/playerRegister`)} />

          { /* Remaining Slots */}
          <span className="text-xs tracking-wide text-orange-700 mt-3">
            Remaininig Slots - {configValues.remainingSlots}
          </span>
        </div >

      </div>

      { /* Footer */}
      <Footer />
    </main>
  );
}