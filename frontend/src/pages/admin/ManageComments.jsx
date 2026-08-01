import { useEffect, useState } from "react";
import axios from "axios";


const ManageComments = () => {

    const [comments, setComments] = useState([]);


    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this comment?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await axios.delete(
                `${import.meta.env.VITE_API_URL}/admin/comments/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            fetchComments();

        } catch (error) {

            console.log(error);

        }

    };


    const fetchComments = async () => {

        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/admin/comments`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );


            setComments(response.data);


        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        fetchComments();

    }, []);


    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Manage Comments
            </h1>

            <table className="w-full table-fixed bg-white rounded-xl shadow">

                <thead>

                    <tr className="border-b">

                        <th className="p-4 text-left">
                            Comment
                        </th>

                        <th className="p-4 text-left">
                            Author
                        </th>

                        <th className="p-4 text-left">
                            Snippet
                        </th>

                        <th className="p-4 text-left">
                            Created
                        </th>

                        <th className="p-4 text-left">
                            Action
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {
                        comments.map((comment) => (

                            <tr
                                key={comment._id}
                                className="border-b"
                            >

                                <td className="p-4">
                                    {comment.text}
                                </td>


                                <td className="p-4">
                                    {
                                        comment.author
                                            ? comment.author.username
                                            : "Deleted User"
                                    }
                                </td>


                                <td className="p-4">
                                    {
                                        comment.snippet
                                            ? comment.snippet.title
                                            : "Deleted Snippet"
                                    }
                                </td>


                                <td className="p-4">
                                    {
                                        new Date(comment.createdAt).toLocaleDateString()
                                    }
                                </td>


                                <td className="p-4">

                                    <button
                                        onClick={() => handleDelete(comment._id)}
                                        className="bg-red-700 text-white px-3 py-1 rounded">
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    );

};


export default ManageComments;