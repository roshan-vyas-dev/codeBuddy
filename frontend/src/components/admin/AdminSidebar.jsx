import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };

    const linkStyle = ({ isActive }) =>
        isActive
            ? "bg-violet-600 text-white p-3 rounded-xl font-medium shadow-md transition"
            : "p-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition";




    return (

        <div className="w-full shrink-0 bg-gray-900 text-white p-3 sm:p-4 md:w-64 md:min-h-screen md:p-6">

            <h1 className="text-2xl font-bold text-white md:text-3xl">
                CodeBuddy
            </h1>

            <p className="mb-4 text-xs text-gray-400 md:mb-8 md:text-sm">
                Admin Panel
            </p>

            <nav className="flex gap-2 overflow-x-auto md:flex-col md:gap-3">

                <NavLink
                    to="/admin/dashboard"
                    className={linkStyle}>
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/users"
                    className={linkStyle}>
                    Users
                </NavLink>

                <NavLink
                    to="/admin/snippets"
                    className={linkStyle}>
                    Snippets
                </NavLink>

                <NavLink
                    to="/admin/comments"
                    className={linkStyle}>
                    Comments
                </NavLink>

            </nav>

            <button
                onClick={handleLogout}
                className="mt-4 w-full rounded-xl bg-red-600 py-2.5 text-white transition hover:bg-red-700 md:mt-8 md:py-3" >
                Logout
            </button>

        </div>

    );




};

export default AdminSidebar;