import { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {

    const [users, setUsers] = useState([]);


    useEffect(() => {

        const fetchUsers = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:5000/api/admin/users",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                setUsers(response.data);

            } catch (error) {

                console.log(error);

            }

        };


        fetchUsers();

    }, []);


    return (
        <div>

            <h1 className="text-3xl font-bold mb-6">
                Manage Users
            </h1>


            <table className="w-full bg-white rounded-xl shadow">

                <thead>

                    <tr className="border-b">

                        <th className="p-4 text-left">
                            Username
                        </th>

                        <th className="p-4 text-left">
                            Email
                        </th>

                        <th className="p-4 text-left">
                            Role
                        </th>

                        <th className="p-4 text-left">
                            Status
                        </th>

                        <th className="p-4 text-left">
                            Action
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {
                        users.map((user) => (
                            <tr key={user._id} className="border-b">

                                <td className="p-4">
                                    {user.username}
                                </td>

                                <td className="p-4">
                                    {user.email}
                                </td>

                                <td className="p-4">
                                    {user.role}
                                </td>

                                <td className="p-4">
                                    {
                                        user.isBlocked
                                            ? "Blocked"
                                            : "Active"
                                    }
                                </td>

                                <td className="p-4">
                                    Action
                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>


        </div>
    );
};


export default ManageUsers;