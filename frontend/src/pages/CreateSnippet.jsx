import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateSnippet() {
    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("");
    const [code, setCode] = useState("");

    const navigate=useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const token =localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/api/snippets",
                {
                    title,
                    language,
                    code

                },
                {
                    headers:{
                         Authorization: `Bearer ${token}`,

                    }
                }

                
            )
            console.log("Snippet created successfully!");
            navigate("/dashboard")


        }catch(error){
            console.log(error);
            
        }

    }


    return (
        <div>
            <form onSubmit={handleSubmit} >

                <input type="text" value={title} placeholder="Enter title" onChange={(e) => setTitle(e.target.value)} />

                <select value={language} onChange={(e) => setLanguage(e.target.value)}>

                    <option value="">Select Language</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="C++">C++</option>
                    <option value="C">C</option>

                </select>


                <textarea value={code} placeholder="Enter code" onChange={(e) => setCode(e.target.value)} />

                <button type="submit">Create Snippet</button>


            </form>

        </div>
    )
}

export default CreateSnippet
