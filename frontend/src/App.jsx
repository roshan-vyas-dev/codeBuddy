import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateSnippet from "./pages/CreateSnippet";
import SnippetDetails from "./pages/SnippetDetails";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageSnippets from "./pages/admin/ManageSnippets";






function App() {
  return (

    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/create-snippet" element={<ProtectedRoute><CreateSnippet /></ProtectedRoute>} />
      <Route path="/snippets/:id" element={<SnippetDetails />} />
      <Route path="/profile/:id" element={<Profile />} />

      {/* admin */}
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>

        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="snippets" element={<ManageSnippets />} />

      </Route>




      <Route path="*" element={<NotFound />} />



    </Routes>
  )
}

export default App