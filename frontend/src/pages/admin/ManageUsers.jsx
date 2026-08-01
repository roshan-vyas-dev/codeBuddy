import { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {

    const [users, setUsers] = useState([]);


    const handleBlock = async (id) => {

        try {

            await axios.patch(
                `${import.meta.env.VITE_API_URL}/admin/users/${id}/block`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            fetchUsers();

        } catch (error) {

            console.log(error);

        }

    };

    const handleUnblock = async (id) => {

        try {

            await axios.patch(
                `${import.meta.env.VITE_API_URL}/admin/users/${id}/unblock`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            fetchUsers();

        } catch (error) {

            console.log(error);

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );


        if (!confirmDelete) {
            return;
        }


        try {

            await axios.delete(
                `${import.meta.env.VITE_API_URL}/admin/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );


            fetchUsers();


        } catch (error) {

            console.log(error);

        }

    };

    const fetchUsers = async () => {

        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/admin/users`,
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

    useEffect(() => {

        fetchUsers();

    }, []);


   
return (

    <div className="w-full min-w-0">

        <h1 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl">
            Manage Users
        </h1>

        <div className="w-full overflow-x-auto rounded-xl shadow">

            <table className="min-w-[700px] w-full bg-white">

                <thead>

                    <tr className="border-b">

                        <th className="p-3 text-left sm:p-4">
                            Username
                        </th>

                        <th className="p-3 text-left sm:p-4">
                            Email
                        </th>

                        <th className="p-3 text-left sm:p-4">
                            Role
                        </th>

                        <th className="p-3 text-left sm:p-4">
                            Status
                        </th>

                        <th className="p-3 text-left sm:p-4">
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        users.map((user) => (

                            <tr key={user._id} className="border-b">

                                <td className="p-3 sm:p-4">
                                    {user.username}
                                </td>

                                <td className="p-3 sm:p-4">
                                    {user.email}
                                </td>

                                <td className="p-3 sm:p-4">
                                    {user.role}
                                </td>

                                <td className="p-3 sm:p-4">
                                    {
                                        user.isBlocked
                                            ? "Blocked"
                                            : "Active"
                                    }
                                </td>

                                <td className="p-3 sm:p-4">

                                    {
                                        user.role !== "admin" && (

                                            <div className="flex items-center gap-2 whitespace-nowrap">

                                                {
                                                    user.isBlocked ? (

                                                        <button
                                                            onClick={() => handleUnblock(user._id)}
                                                            className="rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700"
                                                        >
                                                            Unblock
                                                        </button>

                                                    ) : (

                                                        <button
                                                            onClick={() => handleBlock(user._id)}
                                                            className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                                                        >
                                                            Block
                                                        </button>

                                                    )
                                                }

                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    className="rounded bg-red-700 px-3 py-1 text-white hover:bg-red-800"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        )
                                    }

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    </div>
);


};


export default ManageUsers;