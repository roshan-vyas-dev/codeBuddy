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

        <div>

            <h1 className="text-3xl font-bold mb-8">
                Admin Dashboard
            </h1>


            <div className="grid grid-cols-3 gap-6">

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

    );
};


export default AdminDashboard;