import { NavLink } from "react-router-dom";

const AdminSidebar = () => {

    const linkStyle = ({ isActive }) =>
        isActive
            ? "bg-violet-600 text-white p-3 rounded-xl font-medium shadow-md transition"
            : "p-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition";


    return (

        <div className="w-64 min-h-screen bg-gray-900 text-white p-6 border-r border-gray-800">

            <h1 className="text-3xl font-bold text-white mb-2">
                CodeBuddy
            </h1>

            <p className="text-gray-400 text-sm mb-8">
                Admin Panel
            </p>


            <nav className="flex flex-col gap-3">

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

        </div>

    );
};

export default AdminSidebar;