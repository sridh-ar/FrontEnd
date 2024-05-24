// import { validateToken } from "../../lib/auth/auth";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PlayerDashboard from "../components/PlayerDashboard";
import SideBar from "../components/SideBar";
import Table from "../components/Table";
import TeamTable from "../components/TeamTable";
import AdminMenu from "../components/Admin/AdminMenu";
import { Provider } from 'react-redux';
import store from '../utils/stateVariables';
import { Toaster } from 'react-hot-toast';

export default function Dashboard() {
  const [category, setCategory] = useState("Dashboard");
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedTeam, setselectedTeam] = useState([]);
  // const router = useRouter();

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

  if (loggedIn) {
    return (
      <Provider store={store}>
        <div className="flex w-full h-screen bg-[#54AAB3]">
          {/* Toast */}
          <Toaster />

          {/* SideBar */}
          <SideBar
            setActiveMenu={(category) => {
              setCategory(category);
              setselectedTeam([]);
            }}
            currentActiveMenu={category}
          />

          {/* Table Dashboard */}
          {selectedTeam.length === 0 && category == "Dashboard" && (
            <Table selectedTeamModal={(team) => setselectedTeam(team)} />
          )}

          {/* Players Dashboard */}
          {category == "Players" && <PlayerDashboard />}

          {selectedTeam.length > 0 && <TeamTable team_detail={selectedTeam} />}

          {/* Admin Modal */}
          {category === "Admin" && <AdminMenu />}
        </div>
      </Provider>
    );
  }
}
