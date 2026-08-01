import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";




function Profile() {

    const [user, setUser] = useState(null);
    const [snippets, setSnippets] = useState([]);

    const { id } = useParams();

    useEffect(() => {

        const fetchUser = async () => {

            try {

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/users/${id}`
                );

                setUser(response.data);

            } catch (error) {
                console.log(error);
            }

        };

        fetchUser();

    }, [id]);


    useEffect(() => {

        const fetchSnippets = async () => {

            try {

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/users/${id}/snippets`
                );

                setSnippets(response.data);

            } catch (error) {
                console.log(error);
            }

        };

        fetchSnippets();

    }, [id]);

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 p-8">


            <div className="max-w-5xl mx-auto">

                <Link
                    to="/dashboard"
                    className="mb-6 inline-block text-indigo-600 font-medium hover:underline"
                >
                    ← Back to Dashboard
                </Link>


                {user && (

                    <div className="bg-white/80 backdrop-blur-md border border-white rounded-2xl shadow-lg p-8 mb-8">


                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            {user.username}
                        </h1>


                        <div className="inline-block bg-indigo-100 text-indigo-700 px-5 py-2 rounded-full font-medium mb-5">
                            ⭐ Reputation: {user.reputation}
                        </div>


                        <p className="text-gray-600 text-lg">
                            {user.bio || "No bio added yet"}
                        </p>


                    </div>

                )}




                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    My Snippets
                </h2>




                {snippets.length === 0 ? (

                    <div className="bg-white/80 backdrop-blur-md border border-white rounded-2xl shadow p-8 text-center">

                        <p className="text-gray-600 text-lg">
                            No snippets created yet
                        </p>

                    </div>


                ) : (


                    <div className="grid md:grid-cols-2 gap-6">


                        {snippets.map((snippet) => (

                            <div
                                key={snippet._id}
                                className="bg-white/80 backdrop-blur-md border border-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">


                                <Link to={`/snippets/${snippet._id}`}>

                                    <h3 className="text-xl font-bold text-indigo-600 hover:underline mb-3">
                                        {snippet.title}
                                    </h3>

                                </Link>



                                <p className="text-gray-600">
                                    {snippet.language}
                                </p>


                                <div className="mt-4 text-sm text-gray-500">
                                    ⭐ {snippet.points} points
                                </div>


                            </div>

                        ))}


                    </div>

                )}



            </div>


        </div>

    )
}

export default Profile
