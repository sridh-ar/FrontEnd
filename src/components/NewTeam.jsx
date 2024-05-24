"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from "@heroicons/react/24/solid";
import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage";
import { firebaseApp } from "../utils/firebase";


export default function NewTeam({ closeFunction }) {
  const [isTeamModalLoading, setTeamModalLoading] = useState(false);

  const [teamData, setteamData] = useState({
    team_name: '',
    captain: '',
    owner: '',
    slots: '15',
    remaining_slots: '15',
    total_points_available: '6000',
    remaining_points_available: '6000',
    team_photo: '',
    owner_photo: '',
    captain_photo: ''
  });

  // Function to handle changes in input fields
  const handleInputChange = async (e) => {
    let { name, value } = e.target;

    // handle file for upload
    if (['team_photo', 'owner_photo', 'captain_photo'].includes(name)) {
      let imageResult = e.target.files[0];
      const storage = getStorage(firebaseApp);
      const imageRef = ref(
        storage,
        `kpl/Team_${Math.floor(Math.random() * 90000) + 10000}`
      );
      await uploadBytes(imageRef, imageResult).then(async (res) => {
        await getDownloadURL(res.ref).then((res) => {
          value = res;
        });
      });
    }

    setteamData({
      ...teamData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTeamModalLoading(true);

    try {
      const response = await fetch("/api/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "table_name": "team",
        },
        body: JSON.stringify(teamData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit team data, Contact Admin');
      }

      setTeamModalLoading(false);
      closeFunction();
    } catch (error) {
      alert(error.message);
      window.location.replace("/dashboard");
    }
  };

  return (
    <>
      <div className="bg-black p-2 py-10 fixed inset-0 w-full z-50 bg-opacity-50 flex items-center justify-center">

        {isTeamModalLoading ?
          <div className="relative bg-white rounded-xl flex flex-col items-center justify-center w-[70%] h-full p-2">
            <img src="/loader.svg" alt="" className="w-32" />
          </div>
          :
          <motion.div className="relative bg-white rounded flex flex-col items-center w-[70%] h-full p-2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {/* Close Icon */}
            <div className=" bg-gray-300 shadow flex items-center justify-center rounded-full absolute top-8 cursor-pointer right-8 w-7 h-7 z-50">
              <XMarkIcon
                width={20}
                height={20}
                color="gray"
                onClick={() => closeFunction()}
              />
            </div>

            <p className="font-medium my-2 text-lg">📰 Team Registration</p>

            <form className="grid grid-cols-2 gap-3 p-5 w-full" onSubmit={handleSubmit}>

              {/* Inputs */}
              {[{ label: "Team Name", type: "text", required: true, name: "team_name" },
              { label: "Captain Name", type: "text", required: true, name: "captain" },
              { label: "Owner Name", type: "text", required: true, name: "owner" },
              { label: "Slots", type: "text", name: "slots", disabled: true },
              { label: "Remaining Slots", type: "text", name: "remaining_slots", disabled: true },
              { label: "Total Points Available", type: "text", name: "total_points_available", disabled: true },
              { label: "Remaining Points Available", type: "text", name: "remaining_points_available", disabled: true }
              ].map((input, index) => (
                <div key={index} className="flex flex-col justify-center w-full gap-2 text-sm">
                  <label>{input.required ? `${input.label} *` : `${input.label}`}</label>
                  <input
                    className='outline-none ring-1 ring-indigo-100 p-2 h-9 w-full px-4 rounded-full bg-gray-200'
                    type={input.type}
                    name={input.name}
                    value={teamData[input.name]}
                    placeholder={input.label}
                    onChange={handleInputChange}
                    required={input.required}
                    disabled={input.disabled}
                  />
                </div>
              ))}

              {/* File Upload */}
              {[{ label: "Team Photo", type: "file", required: true, name: "team_photo" },
              { label: "Captain Photo", type: "file", required: true, name: "captain_photo" },
              { label: "Owner Photo", type: "file", required: true, name: "owner_photo" }
              ].map((input, index) => (
                <div key={index} className="flex flex-col justify-center w-full gap-2 text-sm">
                  <label>{input.required ? `${input.label} *` : `${input.label}`}</label>
                  <label htmlFor="file-upload" className="cursor-pointer flex items-center space-x-2 outline-none ring-1 ring-indigo-100 p-2 h-9 w-full px-4 rounded-full bg-gray-200">
                    <ArrowUpTrayIcon width={17} />
                    <input id="file-upload" type="file" className="file:hidden" name={input.name} onChange={handleInputChange} required />
                  </label>
                </div>
              ))}

              {/* Submit Button */}
              <div className="col-span-2 flex items-center justify-center">
                <motion.button
                  type="submit"
                  className={`rounded bg-indigo-400 p-1 px-6 m-3 cursor-pointer text-white`}
                  whileHover={{ scale: 1.1 }}
                >
                  Submit
                </motion.button>
              </div>
            </form>
          </motion.div>
        }
      </div>
    </>
  )
}
