import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


function EditSnippet() {

    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);


    const { id } = useParams();
    const navigate = useNavigate();



    // Fetch existing snippet data

    useEffect(() => {

        const fetchSnippet = async () => {

            try {

                const token = localStorage.getItem("token");


                const response = await axios.get(
                    `http://localhost:5000/api/snippets/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );


                setTitle(response.data.title);
                setLanguage(response.data.language);
                setCode(response.data.code);


            } catch (error) {

                console.log(error);
                toast.error("Failed to load snippet");

            }

        };


        fetchSnippet();


    }, [id]);





    const handleSubmit = async (e) => {

        e.preventDefault();


        try {

            setLoading(true);


            const token = localStorage.getItem("token");


            await axios.put(

                `http://localhost:5000/api/snippets/${id}`,

                {
                    title,
                    language,
                    code
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );


            toast.success("Snippet updated successfully");


            navigate(`/snippets/${id}`);



        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to update snippet"
            );


        } finally {

            setLoading(false);

        }

    };




    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 p-8">


            <div className="max-w-3xl mx-auto">


                <div className="bg-white/80 backdrop-blur-md border border-white rounded-2xl shadow-lg p-8">


                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Edit Snippet
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

                            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50"

                        >

                            {
                                loading
                                    ? "Updating..."
                                    : "Update Snippet"
                            }

                        </button>



                    </form>



                </div>



            </div>



        </div>

    );

}


export default EditSnippet;