import { Route, Routes } from "react-router-dom";

import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Projects from "./pages/projects/Projects";
import Team from "./pages/team/Team";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Team />} />
          <Route path="/teams" element={<Team />} />
          <Route path="/projects" element={<Projects />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
