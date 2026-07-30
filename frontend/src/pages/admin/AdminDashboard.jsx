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
                    "http://localhost:5000/api/admin/dashboard",
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

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 p-8">

        <div className="max-w-6xl mx-auto">

            <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Admin Dashboard
            </h1>

            <p className="text-gray-600 mb-8">
                Monitor users, snippets and platform activity.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

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