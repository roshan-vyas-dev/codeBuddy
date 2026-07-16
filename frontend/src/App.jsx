import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";




function App() {
  return (

    <Routes>

  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />


    </Routes>
  )
}

export default App