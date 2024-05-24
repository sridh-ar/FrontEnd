import { useEffect, useState } from "react";
import NewTeam from "./NewTeam";
import NewTeamPlayer from "./NewTeamPlayer";
import { motion } from "framer-motion";
import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage";
import { firebaseApp } from "../utils/firebase";

// Table component definition
export default function Table({ selectedTeamModal }) {
  // State variables initialization
  const [isOpen, setIsOpen] = useState(false);
  const [isAddOpen, setisAddOpen] = useState(false);
  const [teamData, setTeamData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState({});
  const [isLoading, setisLoading] = useState(true);

  // Fetch team data from API on component mount and whenever isOpen or isAddOpen changes
  useEffect(() => {
    fetch("/api/select?query=select * from team")
      .then((response) => response.json())
      .then((data) => {
        setTeamData(data);
        setisLoading(false);
      })
      .catch((error) => console.error(error));
  }, [isOpen, isAddOpen]);

  // Function to handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    let values = [];
    let imageResult = "";
    for (let i = 0; i < 9; i++) {
      if (i === 7 || i === 8) {
        imageResult = event.target[i].files[0];
        const storage = getStorage(firebaseApp);
        const imageRef = ref(
          storage,
          `kpl/team/Player_${Math.floor(Math.random() * 90000) + 10000}`
        );
        await uploadBytes(imageRef, imageResult).then(async (res) => {
          await getDownloadURL(res.ref).then((res) => {
            values.push(res);
          });
        });
      } else {
        values.push(event.target[i].value);
      }
    }
    fetch("/api/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        table_name: "team",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsOpen(false);
        setisLoading(true);
      })
      .catch((error) => console.error(error));
  }

  // Framer Motion animation variants
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.05,
      },
    },
  };

  const itemAnimation = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  // JSX rendering
  return (
    <div className="bg-gray-200 rounded shadow ml-5 overflow-y-auto p-1 w-full">
      {/* Render table only when data is loaded */}
      {!isLoading && (
        <motion.table
          className="table-auto w-full divide-y text-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <tr className="bg-slate-100 h-10 text-sm divide-x rounded ">
            <th>Team Name</th>
            <th>Captain</th>
            <th>Owner</th>
            <th>Slots</th>
            <th>Remaining Slots</th>
            <th>Total Points</th>
            <th>Remaining Pts</th>
          </tr>

          {teamData.map((item) => (
            <motion.tr
              className="p-2 h-12 text-sm"
              key={item.id}
              variants={itemAnimation}
            >
              <td class="text-center relative">
                <img
                  src={item.team_photo}
                  alt="Centered Image"
                  className="w-8 h-8 absolute rounded inset-0 top-2 left-2"
                />

                <button
                  className="capitalize text-start"
                  onClick={() =>
                    selectedTeamModal([item.id, item.team_name, item.owner])
                  }
                >
                  {item.team_name.length > 15
                    ? `${item.team_name.slice(0, 15)}...`
                    : item.team_name}
                </button>
              </td>
              <td className="capitalize">
                {item.captain.length > 15
                  ? `${item.captain.slice(0, 15)}...`
                  : item.captain}
              </td>
              <td className="capitalize">
                {item.owner.length > 10
                  ? `${item.owner.slice(0, 10)}...`
                  : item.owner}
              </td>
              <td>{item.slots}</td>
              <td className="flex justify-center items-center h-12">
                {item.remaining_slots}
                {item.remaining_slots && (
                  <div
                    className="bg-slate-50 rounded-lg w-16 text-xs ring-1 ml-5 ring-gray-200 cursor-pointer"
                    onClick={() => {
                      setisAddOpen(true);
                      setSelectedTeam({
                        team_name: item.team_name,
                        team_id: item.id,
                        remaining_points: item.remaining_points_available,
                      });
                    }}
                  >
                    Add
                  </div>
                )}
              </td>
              <td>{item.total_points_available}</td>
              <td>{item.remaining_points_available}</td>
            </motion.tr>
          ))}
        </motion.table>
      )}

      {/* Render loading indicator */}
      {isLoading && (
        <div className="flex items-center justify-center w-full h-full">
          <img src="/loading.gif" alt="loader" className="w-60" />
        </div>
      )}

      {/* Render button to open new team modal */}
      {!isLoading && (
        <button
          className="w-10 rounded-full bg-indigo-400 h-10 p-2 z-2 flex justify-center shadow items-center m-3 cursor-pointer text-white text-lg fixed bottom-8 right-14"
          onClick={() => setIsOpen(true)}
        >
          +
        </button>
      )}

      {/* Render new team modal */}
      {isOpen && <NewTeam closeFunction={() => setIsOpen(false)} />}

      {/* Render new team player modal */}
      {isAddOpen && (
        <NewTeamPlayer
          closeFunction={() => setisAddOpen(false)}
          selectedTeam={selectedTeam}
        />
      )}
    </div>
  );
}
