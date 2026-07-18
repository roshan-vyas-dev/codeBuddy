import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"




function SnippetDetails() {
    const [snippet, setSnippet] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [user, setUser] = useState(null);

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




        } catch (error) {
            console.log(error);

        }
    }

    const getComments = async () => {
        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `http://localhost:5000/api/comments/snippet/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }

                }
            )

            setComments(response.data);
        } catch (error) {
            console.log(error);

        }



    }

    const handleComment = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/api/comments",
                {
                    snippet: id,
                    text: comment
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            )

            setComment("");

            getComments();


        } catch (error) {
            console.log(error);

        }
    }

    const getMe = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/auth/me",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );


            setUser(response.data)


        } catch (error) {
            console.log(error);

        }

    }

    const handleDelete = async (commentId) => {

        try {
            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/comments/${commentId}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            )

            getComments();

        } catch (error) {
            console.log(error);

        }


    }

    useEffect(() => {
        getSnippet();
        getComments();
        getMe();

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

            <form onSubmit={handleComment} >
                <textarea value={comment} placeholder="type a comment" onChange={(e) =>
                    setComment(e.target.value)
                } />

                <button type="submit">Add comment</button>
            </form>


            <h3>Comments</h3>

            {comments.map((comment) => (
                <div key={comment._id}>

                    <h4>{comment.author.username}</h4>
                    <p>{comment.text}</p>

                    {user._id === comment.author._id && (
                        <button onClick={() => handleDelete(comment._id)}>
                            Delete
                        </button>
                    )}

                </div>
            ))}

        </div>
    )
}

export default SnippetDetails
