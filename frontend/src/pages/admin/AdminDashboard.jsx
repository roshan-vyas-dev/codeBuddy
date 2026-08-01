import { useEffect, useState } from "react";
import axios from "axios";
import StatsCard from "../../components/admin/StatsCard";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalSnippets: 0,
        totalComments: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/admin/dashboard`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                setStats(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-slate-100 via-white to-indigo-100 p-4 sm:p-6 md:p-8">

            <div className="mx-auto w-full max-w-6xl">

                <h1 className="mb-2 text-2xl font-bold text-gray-800 sm:text-3xl md:text-4xl">
                    Admin Dashboard
                </h1>

                <p className="mb-6 text-sm text-gray-600 sm:mb-8 sm:text-base">
                    Monitor users, snippets and platform activity.
                </p>

                <div className="grid w-full grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:gap-6">

                    <StatsCard
                        title="Total Users"
                        value={stats.totalUsers}
                    />

                    <StatsCard
                        title="Total Snippets"
                        value={stats.totalSnippets}
                    />

                    <StatsCard
                        title="Total Comments"
                        value={stats.totalComments}
                    />

                </div>

            </div>

        </div>
    );
};

export default AdminDashboard;