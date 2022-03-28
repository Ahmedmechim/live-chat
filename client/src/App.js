import "./App.css";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ChatBotIcon from "./components/chatIcon/ChatBotIcon";
import AdminPage from "./components/admin/AdminPage";
import Login from "./components/admin/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<ChatBotIcon />} />
          <Route exact path="/admin" element={<AdminPage />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
