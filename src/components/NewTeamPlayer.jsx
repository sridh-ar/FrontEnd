"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useState } from "react";

export default function NewTeamPlayer({ closeFunction, selectedTeam }) {
  const [isTeamModalLoading, setTeamModalLoading] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const [teamData, setteamData] = useState({
    team_name: selectedTeam.team_name,
    player_no: "",
    player_name: "",
    points: "",
    team_id: selectedTeam.team_id,
  });

  // Function to handle changes in input fields
  const handleInputChange = async (e) => {
    let { name, value } = e.target;

    if (name == "player_no") {
      const query = `select name,player_role from player where id = ${parseInt(value) || 0
        }`;

      fetch(`/api/select?query=${query}`)
        .then((response) => response.json())
        .then((data) => setPlayerData(data[0]))
        .catch((err) => alert(err.message));
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
      const query = `select player_no from team_players where player_no = ${parseInt(
        teamData.player_no
      )}`;

      fetch(`/api/select?query=${query}`)
        .then((response) => response.json())
        .then(async (data) => {
          console.log(data);
          if (data.length > 0) {
            setTeamModalLoading(false);
            alert("Player already part of another team or Not Available");
          } else {
            const response = await fetch("/api/insert", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                table_name: "team_players",
              },
              body: JSON.stringify(teamData),
            });

            if (!response.ok) {
              throw new Error(
                "Failed to submit team player data, Contact Admin"
              );
            }

            // updating team remainig points and remaing slots
            let updateQuery = `UPDATE team SET remaining_slots = remaining_slots - 1, 
              remaining_points_available = remaining_points_available - ${parseInt(
              teamData.points
            )} 
              WHERE id = ${teamData.team_id}`;

            fetch(`/api/update?query=${updateQuery}`);

            setTeamModalLoading(false);
            closeFunction();
          }
        })
        .catch((err) => alert(err.message));
    } catch (error) {
      alert(error.message);
      window.location.replace("/dashboard");
    }
  };

  return (
    <>
      <div className="bg-black p-2 py-36 fixed inset-0 w-full z-50 bg-opacity-50 flex items-center justify-center">
        {isTeamModalLoading ? (
          <div className="relative bg-white rounded-xl flex flex-col items-center justify-center w-[60%] h-full p-2">
            <img src="/loading.gif" alt="" className="w-60" />
          </div>
        ) : (
          <motion.div
            className="relative bg-white rounded-xl flex flex-col items-center w-[60%] h-full p-2"
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

            <p className="font-semibold my-2">Team Player Register Form</p>

            <form
              className="grid grid-cols-2 gap-3 p-5 w-full"
              onSubmit={handleSubmit}
            >
              {/* Inputs */}
              {[
                {
                  label: "Team Name",
                  name: "team_name",
                  type: "text",
                  disabled: true,
                  value: selectedTeam.team_name,
                },
                {
                  label: "Player No",
                  name: "player_no",
                  type: "text",
                  required: true,
                },
                {
                  label: "Player Name",
                  name: "player_name",
                  type: "text",
                  required: true,
                },
                {
                  label: "Points",
                  name: "points",
                  type: "number",
                  required: true,
                },
              ].map((input, index) => (
                <div
                  key={index}
                  className="relative flex flex-col justify-center w-full gap-2 text-sm"
                >
                  <label>
                    {input.required ? `${input.label} *` : `${input.label}`}
                  </label>
                  <input
                    className="outline-none ring-1 ring-indigo-100 p-2 h-9 w-full px-4 rounded-full bg-gray-200"
                    type={input.type}
                    name={input.name}
                    value={teamData[input.name]}
                    placeholder={input.label}
                    onChange={handleInputChange}
                    required={input.required}
                    disabled={input.disabled}
                  />

                  {/* Player Detail Modal */}
                  {input.name == "player_no" && playerData && (
                    <div
                      className="bg-white rounded p-2 shadow ring-1 ring-gray-200 absolute cursor-pointer w-[99%] text-sm right-0 -bottom-16 z-50"
                      onClick={() => {
                        setteamData({
                          ...teamData,
                          player_name: playerData.name,
                        });
                        setPlayerData(null);
                      }}
                    >
                      <b>Name: </b>
                      {playerData.name}
                      <br />
                      <b>Player Role: </b>
                      {playerData.player_role}
                    </div>
                  )}
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
        )}
      </div>
    </>
  );
}
