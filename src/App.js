import { Route, Routes } from "react-router-dom";
import useAuthCheck from "./hooks/useAuthCheck";

import Login from "./pages/auth/Login";
import Loading from "./pages/components/Loading";
import Home from "./pages/home/Home";
import Projects from "./pages/projects/Projects";
import Team from "./pages/team/Team";
import User from "./pages/user/User";

function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <Loading />
  ) : (
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Team />} />
          <Route path="/teams" element={<Team />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/dashboard" element={<User />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
