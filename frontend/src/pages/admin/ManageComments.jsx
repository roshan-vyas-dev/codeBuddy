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

        <div className="w-full min-w-0">

            <h1 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl">
                Manage Comments
            </h1>

            <div className="w-full overflow-x-auto rounded-xl shadow">

                <table className="min-w-[750px] w-full bg-white">

                    <thead>

                        <tr className="border-b">

                            <th className="p-3 text-left sm:p-4">
                                Comment
                            </th>

                            <th className="p-3 text-left sm:p-4">
                                Author
                            </th>

                            <th className="p-3 text-left sm:p-4">
                                Snippet
                            </th>

                            <th className="p-3 text-left sm:p-4">
                                Created
                            </th>

                            <th className="p-3 text-left sm:p-4">
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

                                    <td className="p-3 sm:p-4">
                                        {comment.text}
                                    </td>

                                    <td className="p-3 sm:p-4">
                                        {
                                            comment.author
                                                ? comment.author.username
                                                : "Deleted User"
                                        }
                                    </td>

                                    <td className="p-3 sm:p-4">
                                        {
                                            comment.snippet
                                                ? comment.snippet.title
                                                : "Deleted Snippet"
                                        }
                                    </td>

                                    <td className="whitespace-nowrap p-3 sm:p-4">
                                        {
                                            new Date(comment.createdAt).toLocaleDateString()
                                        }
                                    </td>

                                    <td className="p-3 sm:p-4">

                                        <button
                                            onClick={() => handleDelete(comment._id)}
                                            className="whitespace-nowrap rounded bg-red-700 px-3 py-1 text-white hover:bg-red-800"
                                        >
                                            Delete
                                        </button>

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


export default ManageComments;