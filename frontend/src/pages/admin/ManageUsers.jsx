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
        <div>

            <h1 className="text-3xl font-bold mb-6">
                Manage Users
            </h1>


            <table className="w-full table-fixed bg-white rounded-xl shadow">

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

                                    {
                                        user.role !== "admin" && (


                                            <>

                                                {
                                                    user.isBlocked ? (

                                                        <button
                                                            onClick={() => handleUnblock(user._id)}
                                                            className="bg-green-600 text-white px-3 py-1 rounded"
                                                        >
                                                            Unblock
                                                        </button>

                                                    ) : (

                                                        <button
                                                            onClick={() => handleBlock(user._id)}
                                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                                        >
                                                            Block
                                                        </button>

                                                    )
                                                }


                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    className="bg-red-700 text-white px-3 py-1 rounded ml-2"
                                                >
                                                    Delete
                                                </button>


                                            </>




                                        )
                                    }

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