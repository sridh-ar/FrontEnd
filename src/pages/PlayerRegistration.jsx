import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage";
import { firebaseApp } from '../utils/firebase';
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  ReceiptRefundIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import PlayersCard from "../components/PlayersCard";
import { registration } from "../utils/constants";
import LoadingScreen from "../components/common/LoadingScreen";

function ThanksPage() {
  const data = JSON.parse(localStorage.getItem("playerData") || []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <PlayersCard
        key={data.name}
        name={data.name}
        jerseyname={data.jersey_name}
        contact={data.contact_number}
        role={data.player_role}
        team={data.team_name}
        id={data.id}
        area={data.area}
        image={data.player_photo}
        approved={data.approved}
        battingStyle={data.batting_style}
        bowlingStyle={data.bowling_style}
        fromRegisterMenu
      />
      <motion.img
        src="/thanks-brown.gif"
        alt="Thanks"
        className="w-56 relative -z-20"
        initial={{ opacity: 0, top: -200 }}
        animate={{ opacity: 1, top: -20 }}
        transition={{ duration: 0.5 }}
      />
      <p className="font-semibold">Pleae take a Screenshot for Reference</p>
      <button
        className="bg-indigo-300 rounded-full p-1.5 px-6 text-sm my-4 flex items-center justify-center gap-1"
        onClick={() => window.location.replace("/")}
      >
        Return to Home
        <ReceiptRefundIcon width={20} />
      </button>
    </div>
  );
}

export default function PlayerRegistration() {
  const [isLoading, setisLoading] = useState(true);
  const [isSubmited, setisSubmited] = useState(false);
  const [isTermAccepted, setisTermAccepted] = useState(false);
  // const router = useRouter();

  const [playerData, setPlayerData] = useState({
    name: "",
    dob: "",
    age: "",
    contact_number: "",
    team_name: "",
    area: "",
    jersey_name: "",
    jersey_no: "",
    jersey_size: "Small",
    player_photo: "",
    player_role: "All Rounder",
    batting_style: "N/A",
    bowling_style: "N/A",
    approved: false,
  });

  // Function to handle changes in input fields
  const handleInputChange = async (e) => {
    let { name, value } = e.target;

    // handle file for upload
    if (name == "player_photo") {
      let imageResult = e.target.files[0];
      const storage = getStorage(firebaseApp);
      const imageRef = ref(
        storage,
        `kpl/Player_${Math.floor(Math.random() * 90000) + 10000}`
      );
      await uploadBytes(imageRef, imageResult).then(async (res) => {
        await getDownloadURL(res.ref).then((res) => {
          value = res;
        });
      });
    }

    setPlayerData({
      ...playerData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    localStorage.removeItem("playerData");

    try {
      const response = await fetch("/api/player", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playerData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit player data, Contact Admin");
      }

      localStorage.setItem("playerData", JSON.stringify(playerData));
      setisLoading(false);
      setisSubmited(true);
    } catch (error) {
      alert(error.message);
      window.location.replace("/");
    }
  };

  useEffect(() => {
    setTimeout(() => setisLoading(false), 1000);
  }, [])

  return (
    <>
      {isLoading &&
        <div className="w-screen h-screen">
          <LoadingScreen />
        </div>}
      {isSubmited && <ThanksPage />}
      {!isLoading && !isSubmited && (
        <motion.div
          className="bg-gray-200 p-3"

        >
          <motion.div className="bg-white rounded-xl flex flex-col items-center w-full p-2 py-4"
          // initial={{ scale: 0, opacity: 0 }}
          // animate={{ scale: 1, opacity: 1 }}
          // transition={{ delay: 0.2, duration: 0.4 }}
          >
            {/* Close Icon */}
            <div className=" bg-gray-300 shadow flex items-center justify-center rounded-full absolute top-10 cursor-pointer right-8 w-7 h-7 z-50">
              <XMarkIcon
                width={23}
                height={23}
                color="gray"
                onClick={() => {
                  setisLoading(true);
                  window.history.back();
                }}
              />
            </div>

            {/* Actual Form Body */}
            <p className="font-semibold tracking-wider my-3 text-lg">🎭 Player Registration</p>
            <form
              className="grid grid-cols-2 gap-3 p-5 w-full"
              onSubmit={handleSubmit}
            >
              {/* Inputs */}
              {registration.inputColumns.map((input, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center w-full gap-2 text-sm"
                >
                  <label>
                    {input.required ? `${input.label} *` : `${input.label}`}
                  </label>
                  <input
                    className="outline-none ring-1 ring-indigo-100 p-2 h-9 w-full px-4 rounded-full bg-gray-200"
                    type={input.type}
                    name={input.name}
                    value={playerData[input.name]}
                    placeholder={input.label}
                    onChange={handleInputChange}
                    required={input.required}
                  />
                </div>
              ))}

              {/* File Upload */}
              <div
                key="Player Photo"
                className="flex flex-col justify-center w-full gap-2 text-sm"
              >
                <label>Player Photo *</label>
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex items-center space-x-2 outline-none ring-1 ring-indigo-100 p-2 h-9 w-full px-4 rounded-full bg-gray-200"
                >
                  <ArrowUpTrayIcon width={20} />
                  {/* <span className="text-gray-500">Choose File</span> */}
                  <input
                    id="file-upload"
                    type="file"
                    className="file:hidden"
                    name="player_photo"
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>

              {/* Selects */}
              {registration.selectColumns.map((select, index) => (
                <div
                  key={index}
                  className={`flex flex-col justify-center w-full gap-1 text-sm 
                    ${select.name === "batting_style" &&
                      !["All Rounder", "Batsman"].includes(
                        playerData["player_role"]
                      )
                      ? "hidden"
                      : ""
                    }
                    ${select.name === "bowling_style" &&
                      !["All Rounder", "Bowler"].includes(
                        playerData["player_role"]
                      )
                      ? "hidden"
                      : ""
                    }
                  `}
                >
                  <label>
                    {select.required ? `${select.label} *` : `${select.label}`}
                  </label>
                  <select
                    className="outline-none p-2 px-4 ring-1 h-9 w-full ring-indigo-100 my-2 rounded-full bg-gray-200"
                    required={select.required}
                    name={select.name}
                    value={playerData[select.name]}
                    onChange={handleInputChange}
                  >
                    {select.options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              {/* Terms & Conditions */}
              <div className="w-full flex flex-col text-sm col-span-2">
                <h3 className="font-bold">Terms & Conditions:</h3>
                <ol className="list-disc relative left-10 my-3 w-[90%] sm:w-full break-words">
                  <li>Player Registration Amount is Rs.111/-</li>
                  <li>Players Should be available for the whole tournament</li>
                  <li>
                    If the players not available without any valid reason,
                    player cannot participate in the tournament for the next 2
                    seasons
                  </li>
                  <li>
                    If the player Gets caught for chucking he cannot bowl for
                    the Rest of the tournament
                  </li>
                </ol>

                {/* Terms Checkbox */}
                <div className="flex items-start mb-5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={isTermAccepted}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                    required
                    onChange={() => setisTermAccepted(!isTermAccepted)}
                  />
                  <label
                    htmlFor="terms"
                    className="ms-2 text-sm font-medium text-gray-900 ml-2"
                  >
                    I agree with the{" "}
                    <a href="/terms" className="text-blue-600 hover:underline">
                      terms and conditions
                    </a>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-span-2 flex items-center justify-center">
                <motion.button
                  type="submit"
                  className={`w-40 rounded ${isTermAccepted ? "bg-indigo-400" : "bg-indigo-200"
                    } h-10 p-2 flex justify-center items-center m-3 cursor-pointer text-white`}
                  whileHover={{ scale: 1.1 }}
                  disabled={!isTermAccepted}
                >
                  Click to Register
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
