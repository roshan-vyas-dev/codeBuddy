import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateSnippet() {
    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            const token = localStorage.getItem("token");


            await axios.post(
                "http://localhost:5000/api/snippets",
                {
                    title,
                    language,
                    code

                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    }
                }


            )

            toast.success("Snippet created successfully");
            navigate("/dashboard")


        } catch (error) {
            console.log(error);
            toast.error("Failed to create snippet");

        } finally {
            setLoading(false)
        }

    }


    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 p-8">


            <div className="max-w-3xl mx-auto">


                <div className="bg-white/80 backdrop-blur-md border border-white rounded-2xl shadow-lg p-8">

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="mb-6 text-indigo-600 font-medium hover:underline">
                        ← Back to Dashboard
                    </button>


                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Create Snippet
                    </h1>



                    <form onSubmit={handleSubmit} className="space-y-5">


                        <input
                            type="text"
                            value={title}
                            placeholder="Enter title"
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />



                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >

                            <option value="">
                                Select Language
                            </option>

                            <option value="JavaScript">
                                JavaScript
                            </option>

                            <option value="Python">
                                Python
                            </option>

                            <option value="Java">
                                Java
                            </option>

                            <option value="C++">
                                C++
                            </option>

                            <option value="C">
                                C
                            </option>

                        </select>




                        <textarea
                            value={code}
                            placeholder="Enter code"
                            onChange={(e) => setCode(e.target.value)}
                            rows="10"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                        />




                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium">
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">

                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                                    Creating...

                                </div>
                            ) : (
                                "Create Snippet"
                            )}
                        </button>



                    </form>


                </div>


            </div>


        </div>

    )
}

export default CreateSnippet
