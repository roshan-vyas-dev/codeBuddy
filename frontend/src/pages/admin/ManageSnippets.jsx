import { useEffect, useState } from "react";
import axios from "axios";


const ManageSnippets = () => {

    const [snippets, setSnippets] = useState([]);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this snippet?"
        );


        if (!confirmDelete) {
            return;
        }


        try {

            await axios.delete(
                `${import.meta.env.VITE_API_URL}/admin/snippets/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );


            fetchSnippets();


        } catch (error) {

            console.log(error);

        }

    };


    const fetchSnippets = async () => {

        try {

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/admin/snippets`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );


            setSnippets(response.data);


        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {
        fetchSnippets();
    }, []);




    return (

        <div className="w-full min-w-0">

            <h1 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl">
                Manage Snippets
            </h1>

            <div className="w-full overflow-x-auto rounded-xl shadow">

                <table className="min-w-[650px] w-full bg-white">

                    <thead>

                        <tr className="border-b">

                            <th className="p-3 text-left sm:p-4">
                                Title
                            </th>

                            <th className="p-3 text-left sm:p-4">
                                Language
                            </th>

                            <th className="p-3 text-left sm:p-4">
                                Author
                            </th>

                            <th className="p-3 text-left sm:p-4">
                                Points
                            </th>

                            <th className="p-3 text-left sm:p-4">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            snippets.map((snippet) => (

                                <tr
                                    key={snippet._id}
                                    className="border-b"
                                >

                                    <td className="p-3 sm:p-4">
                                        {snippet.title}
                                    </td>

                                    <td className="p-3 sm:p-4">
                                        {snippet.language}
                                    </td>

                                    <td className="p-3 sm:p-4">
                                        {snippet.author.username}
                                    </td>

                                    <td className="p-3 sm:p-4">
                                        {snippet.points}
                                    </td>

                                    <td className="p-3 sm:p-4">

                                        <button
                                            onClick={() => handleDelete(snippet._id)}
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


export default ManageSnippets;