/* eslint-disable no-restricted-globals */
import {
  HomeModernIcon,
  UserGroupIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CogIcon
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateConfigStateValue } from "../utils/stateVariables";
import logo from '../images/New_Logo.png'

// SideBarItem component
const SideBarItem = ({ isActive, name, setActiveMenu, playerCount = null }) => {
  return (
    <div
      className={`ml-10 flex cursor-pointer w-full p-2 my-1 text-sm font-medium rounded-l-full relative pl-4 ${isActive ? 'text-black bg-gray-200' : 'text-white'}`}
      onClick={() => setActiveMenu(name)}
    >
      {isActive && (
        <>
          <div className="bg-gray-200 absolute transition-colors duration-300 h-5 w-5 -top-5 z-10 right-0">
            <div className="bg-[#54AAB3] transition-colors duration-300 h-5 w-5 rounded-br-2xl"></div>
          </div>
          <div className="bg-gray-200 absolute transition-colors duration-300 h-5 w-5 -bottom-5 z-10 right-0">
            <div className="bg-[#54AAB3] transition-colors duration-300 h-5 w-5 rounded-tr-2xl"></div>
          </div>
        </>
      )}
      {/* Render icon based on name */}
      {name === "Dashboard" && <HomeModernIcon className="w-5 h-5 mr-3" color={isActive ? "#54AAB3" : ""} />}
      {name === "Players" && <UserGroupIcon className="w-5 h-5 mr-3" color={isActive ? "#54AAB3" : ""} />}
      {name === "Admin" && <CogIcon className="w-5 h-5 mr-3" color={isActive ? "#54AAB3" : ""} />}
      {name === "Support" && <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 mr-3" color={isActive ? "#54AAB3" : ""} />}
      {name === "Sign Out" && <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" color={isActive ? "#54AAB3" : ""} />}
      {`${name} ${playerCount ? `(${playerCount})` : ''}`}
    </div>
  );
};

export default function SideBar({ setActiveMenu, currentActiveMenu }) {
  const [playersCount, setPlayersCount] = useState(0)
  const dispatch = useDispatch();

  async function initialDataRetrival() {
    fetch("/api/dashboard", { method: "GET" })
      .then((response) => response.json())
      .then(result => {
        const configObject = result.reduce((accumulator, current) => {
          accumulator[current.config_name] = current.config_value;
          return accumulator;
        }, {});

        setPlayersCount(configObject.totalRegisteredPlayers)
        dispatch(updateConfigStateValue(configObject));
      })
  }

  useEffect(() => {
    initialDataRetrival();
  }, [])
  function handleLogout() {
    if (confirm("Do you want to Logout?")) {
      localStorage.removeItem("aauutthh");
      window.location.replace("/");
    }
  }

  return (
    <div className="w-[18%] text-white flex flex-col items-center">
      {/* Logo */}
      <div className="flex w-full p-2 m-2 items-center justify-center">
        <img src={logo} alt="Next.js Logo" className="ml-4" />
        {/* <p className=" text-sm ml-2">FBLP League</p> */}
      </div>

      {/* DIvider */}
      <div className="w-[80%] h-[0.5px] bg-gray-200 mb-5"></div>

      {/* Menus */}
      <SideBarItem
        isActive={currentActiveMenu === "Dashboard"}
        name="Dashboard"
        setActiveMenu={(name) => setActiveMenu(name)}
      />
      <SideBarItem
        isActive={currentActiveMenu === "Players"}
        name="Players"
        setActiveMenu={(name) => setActiveMenu(name)}
        playerCount={playersCount}
      />

      {/* DIvider */}
      <div className="w-[80%] h-[0.5px] bg-gray-200 my-5"></div>

      <SideBarItem
        isActive={currentActiveMenu === "Admin"}
        name="Admin"
        setActiveMenu={(name) => setActiveMenu(name)}
      />
      <SideBarItem
        isActive={currentActiveMenu === "Support"}
        name="Support"
        setActiveMenu={() => window.location.replace("/support")}
      />
      <SideBarItem
        isActive={currentActiveMenu === "Sign Out"}
        name="Sign Out"
        setActiveMenu={handleLogout}
      />


    </div>
  );
}
