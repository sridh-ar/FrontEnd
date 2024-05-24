"use client";
import { useEffect, useState } from "react";
import PlayersCard from "../components/PlayersCard";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 5,
      staggerChildren: 0.05,
    },
  },
};

const SearchBar = ({ handleSearch }) => {
  return (
    <div class="w-1/3 h-10 fixed z-20 my-0.5">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <input
        type="search"
        class="w-full h-10 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none "
        placeholder="Search for a player..."
        onChange={(input) => handleSearch(input.target.value)}
      />
    </div>
  );
};

export default function PlayerDashboard() {
  const [teamData, setTeamData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isGenerating, setisGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch("/api/select?query=select * from player")
      .then((response) => response.json())
      .then((data) => {
        setTeamData(data);
        setfilteredData(data);
        setisLoading(false);
      })
      .catch((error) => console.error(error));
  }, [isLoading]);

  async function handleDownload() {
    setisGenerating(true);
    const element = document.getElementById("playersListPdf");
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const url = canvas.toDataURL();
      setImageUrl(url);
      setisGenerating(false);
    });
  }

  function handleSearch(value) {
    if (value.length > 0) {
      setfilteredData(teamData.filter((item) => item.id == value));
    } else {
      setfilteredData(teamData);
    }
  }

  return (
    <div className="bg-gray-200 rounded shadow mx-5 my-3 overflow-y-auto p-1 w-full flex justify-center">
      <SearchBar handleSearch={(value) => handleSearch(value)} />

      <motion.div
        className={isGenerating ? "" : "grid grid-cols-2 w-full mt-10 p-0"}
        variants={container}
        initial="hidden"
        animate="visible"
        id="playersListPdf"
      >
        {isLoading && (
          <div className="col-span-2 flex items-center justify-center w-full h-full">
            <img src="/loading.gif" alt="loader" className="w-60" />
          </div>
        )}

        {!isLoading &&
          filteredData.map((item) => (
            <PlayersCard
              key={item.id}
              name={item.name}
              jerseyname={item.jersey_name}
              contact={item.contact_number}
              role={item.player_role}
              team={item.team_name}
              id={item.id}
              area={item.area}
              image={item.player_photo}
              approved={item.approved}
              handleApproved={() => setisLoading(true)}
              battingStyle={item.batting_style}
              bowlingStyle={item.bowling_style}
            />
          ))}
      </motion.div>
    </div>
  );
}
