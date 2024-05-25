import { useEffect, useState } from "react";
import PlayerDashboard from "../components/PlayerDashboard";
import SideBar from "../components/SideBar";
import Table from "../components/Table";
import TeamTable from "../components/TeamTable";
import AdminMenu from "../components/Admin/AdminMenu";
import { Toaster } from 'react-hot-toast';

export default function Dashboard() {
  const [category, setCategory] = useState("Dashboard");
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedTeam, setselectedTeam] = useState([]);

  async function validateUser() {
    // const res = await validateToken();
    // if (res) {
    setLoggedIn(true);
    // } else {
    //   setLoggedIn(false);
    //   router.replace("/");
    // }
  }

  useEffect(() => {
    validateUser();
  }, []);


  return (
    <div className="flex w-full h-screen bg-[#54AAB3]">
      {/* Toast */}
      <Toaster />

      {/* SideBar */}
      <SideBar
        setActiveMenu={(category) => setCategory(category)}
        currentActiveMenu={category}
      />

      {/* Table Dashboard */}
      {category === "Dashboard" && <Table selectedTeamModal={(team) => setselectedTeam(team)} />}

      {/* Players Dashboard */}
      {category == "Players" && <PlayerDashboard />}

      {/* Admin Modal */}
      {category === "Admin" && <AdminMenu />}

      {/* Team Details */}
      {selectedTeam.length > 0 && <TeamTable team_detail={selectedTeam} />}
    </div>
  );
}
