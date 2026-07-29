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
                `http://localhost:5000/api/admin/snippets/${id}`,
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
                "http://localhost:5000/api/admin/snippets",
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

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Manage Snippets
            </h1>


            <table className="w-full table-fixed bg-white rounded-xl shadow">

                <thead>

                    <tr className="border-b">

                        <th className="p-4 text-left">
                            Title
                        </th>

                        <th className="p-4 text-left">
                            Language
                        </th>

                        <th className="p-4 text-left">
                            Author
                        </th>

                        <th className="p-4 text-left">
                            Points
                        </th>

                        <th className="p-4 text-left">
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

                                <td className="p-4">
                                    {snippet.title}
                                </td>


                                <td className="p-4">
                                    {snippet.language}
                                </td>


                                <td className="p-4">
                                    {snippet.author.username}
                                </td>


                                <td className="p-4">
                                    {snippet.points}
                                </td>


                                <td className="p-4">

                                    <button
                                        onClick={() => handleDelete(snippet._id)}
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


export default ManageSnippets;