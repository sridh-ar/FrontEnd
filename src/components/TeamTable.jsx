import { useEffect, useState } from "react";
import TeamImage from "./TeamImage";
import LoadingScreen from "./common/LoadingScreen";
import { TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { fetchAPI } from "../utils/commonServices";
import toast from "react-hot-toast";

export default function TeamTable({ team_detail }) {
  const [teamData, setTeamData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const query = `select pl.* from player pl join team_players tp on tp.player_no = pl.id where tp.team_id = ${team_detail[0]}`;
    fetch(`https://league-tournament.vercel.app/api/select?query=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setTeamData(data);
        setisLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  //Handling Delete Functions
  async function handleTeamPlayerDelete(playerId) {
    console.log({ playerId })
    try {
      await fetchAPI(`/teamPlayer/delete/${playerId}`, "PUT");
      toast.success('Record Deleted Successfully.')

      // to refresh the table call data retrival.
      // initialDataRetrival();
    } catch (error) {
      console.log('[TeamTable.jsx] Error - ', error.stack);
      toast.error("Unable to delete the record.");
    }
  }

  if (!isLoading) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <div className="bg-gray-200 ml-5 overflow-y-auto p-3 w-full">
      {/* Render the team name and captain name  */}
      <div className="bg-slate-100 rounded p-2 mb-0.5 flex justify-between items-center ">
        <p className="bg-slate-100 rounded text-xl font-bold italic left-5 relative w-[40%] ">
          Team Name: <span className="text-gray-500">{team_detail.team_name}</span>
        </p>
        <p className="bg-slate-100 rounded text-xl font-bold italic left-5 relative w-[40%] ">
          Owner Name: <span className="text-gray-500">{team_detail.owner}</span>
        </p>
      </div>

      {/* Render table only when data is loaded */}
      <table className="w-full divide-y text-center bg-white overflow-hidden rounded-xl tracking-wide border-collapse">

        <tr className="bg-black h-10 text-sm divide-x shadow text-white">
          <th>Player Id</th>
          <th>Player Name</th>
          <th>Contact No</th>
          <th>Jersey Name</th>
          <th>Jersey Size</th>
          <th>Jersey No</th>
        </tr>

        {teamData.map((item) => (
          <tr className="p-2 h-12 text-sm text-center capitalize border-gray-400" key={item.id}>
            <td>{item.id}</td>
            <td> {item.name.length > 15 ? `${item.name.slice(0, 15)}...` : item.name} </td>
            <td className="capitalize">{item.contact_number}</td>
            <td className="capitalize">{item.jersey_name}</td>
            <td className="capitalize">{item.jersey_size}</td>
            <td>{item.jersey_no}</td>

            {/* Table Actions */}
            <td >
              <div className="flex items-center justify-evenly cursor-pointer">
                <TrashIcon width={22} className="fill-red-400" onClick={() => handleTeamPlayerDelete(item.id)} />
              </div>
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
}