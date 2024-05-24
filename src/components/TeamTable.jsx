import { useEffect, useState } from "react";
import TeamImage from "./TeamImage";

export default function TeamTable({ team_detail }) {
  const [teamData, setTeamData] = useState([]);
  const [ownerData, setownerData] = useState([]);
  const [teamImage, setteamImage] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isGenerating, setisGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const query = `select pl.* from player pl join team_players tp on tp.player_no = pl.id where tp.team_id = ${team_detail[0]}`;
    fetch(`/api/select?query=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setTeamData(data);
        setisLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  function handleImageDownload() {
    setisGenerating(true);
    const query = `select owner_photo as ownerphoto,owner from team where id = ${team_detail[0]}`;
    const query1 = `select name,player_photo as photo from player pl join team_players tp on tp.player_no = pl.id where tp.team_id = ${team_detail[0]}`;
    fetch(`/api/team?query=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setownerData(data);
      })
      .catch((error) => console.error(error));
    fetch(`/api/select?query=${query1}`)
      .then((response) => response.json())
      .then((data) => {
        setteamImage(data);
      })
      .catch((error) => console.error(error));
  }
  return (
    <>
      {teamImage.length > 0 && (
        <TeamImage
          teamData={teamImage}
          ownerData={ownerData}
          handleDownload={(url) => {
            setImageUrl(url);
            setisGenerating(false);
          }}
        />
      )}

      <div className="bg-white rounded shadow m-5 overflow-y-auto p-1 w-full">
        <div className="bg-slate-100 rounded p-2 mb-0.5 flex justify-between items-center ">
          <p className="bg-slate-100 rounded text-xl font-bold italic left-5 relative w-[40%] ">
            Team Name: <span className="text-gray-500">{team_detail[1]}</span>
          </p>
          <p className="bg-slate-100 rounded text-xl font-bold italic left-5 relative w-[40%] ">
            Owner Name: <span className="text-gray-500">{team_detail[2]}</span>
          </p>
          {imageUrl == "" && (
            <button
              disabled={teamData.length >= 11 ? false : true}
              className="bg-indigo-400 rounded text-xs ring-1 mr-5 ring-white cursor-pointer p-2 font-semibold text-white disabled:bg-indigo-200"
              onClick={handleImageDownload}
            >
              {isGenerating && (
                <svg
                  class="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              {isGenerating ? "Generating" : "Genarate Team Image"}
            </button>
          )}
          {imageUrl != "" && (
            <a
              className="bg-indigo-400 rounded text-xs ring-1 mr-5 ring-white cursor-pointer p-2 font-semibold text-white disabled:bg-indigo-200"
              download="TeamImage.jpg"
              href={imageUrl}
            >
              Download Image
            </a>
          )}
        </div>
        {!isLoading && (
          <table className="table-auto w-full divide-y text-center">
            <tr className="bg-slate-100 h-10 text-sm divide-x rounded ">
              <th>Player Id</th>
              <th>Player Name</th>
              <th>Contact No</th>
              <th>Jersey Name</th>
              <th>Jersey Size</th>
              <th>Jersey No</th>
            </tr>

            {teamData.map((item) => (
              <tr className="p-2 h-12 text-sm" key={item.id}>
                <td>{item.id}</td>
                <td className="capitalize">
                  {item.name.length > 15
                    ? `${item.name.slice(0, 15)}...`
                    : item.name}
                </td>
                <td className="capitalize">{item.contact_number}</td>
                <td className="capitalize">{item.jersey_name}</td>
                <td className="capitalize">{item.jersey_size}</td>
                <td>{item.jersey_no}</td>
              </tr>
            ))}
          </table>
        )}
        {isLoading && (
          <div class="flex items-center justify-center w-full h-full bg-gray-100 ">
            <svg
              aria-hidden="true"
              class="w-16 h-16 mr-2 text-gray-200 animate-spin fill-indigo-400"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        )}
      </div>
    </>
  );
}

// w-28 rounded bg-indigo-400 h-8 p-2 flex justify-center items-center m-3 cursor-pointer text-white text-sm fixed bottom-5 right-5"
