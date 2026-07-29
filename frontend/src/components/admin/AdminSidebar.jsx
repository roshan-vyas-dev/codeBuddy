import { NavLink } from "react-router-dom";

const AdminSidebar = () => {

    const linkStyle = ({ isActive }) =>
        isActive
            ? "bg-violet-600 text-white p-3 rounded-lg"
            : "p-3 rounded-lg hover:bg-gray-800";


    return (
        <div className="w-64 min-h-screen bg-gray-900 text-white p-6">

            <h1 className="text-2xl font-bold mb-8">
                CodeBuddy Admin
            </h1>


            <nav className="flex flex-col gap-3">

                <NavLink
                    to="/admin/dashboard"
                    className={linkStyle}
                >
                    Dashboard
                </NavLink>


                <NavLink
                    to="/admin/users"
                    className={linkStyle}
                >
                    Users
                </NavLink>


                <NavLink
                    to="/admin/snippets"
                    className={linkStyle}
                >
                    Snippets
                </NavLink>


                <NavLink
                    to="/admin/comments"
                    className={linkStyle}
                >
                    Comments
                </NavLink>

            </nav>

        </div>
    );
};

export default AdminSidebar;