
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen flex-col md:flex-row">

            <AdminSidebar />

            <main className="flex-1 min-w-0 bg-gray-100 p-4 sm:p-6 md:p-8">
                <Outlet />
            </main>

        </div>
    );
};

export default AdminLayout;

