import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"




function SnippetDetails() {
    const [snippet, setSnippet] = useState(null);

    const { id } = useParams();

    const getSnippet = async () => {

        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://localhost:5000/api/snippets/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }

            )

            setSnippet(response.data)
            console.log(response.data);




        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getSnippet();
    }, []);


    if (!snippet) {
        return <p>Loading...</p>;
    }


    return (
        <div>
            <h1>Snippet Details</h1>

            <h2>{snippet.title}</h2>

            <h4>{snippet.language}</h4>

            <pre>{snippet.code}</pre>

            <h4> Points: {snippet.points}</h4>
        </div>
    )
}

export default SnippetDetails
