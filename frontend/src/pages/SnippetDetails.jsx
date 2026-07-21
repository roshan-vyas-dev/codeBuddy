import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";




function SnippetDetails() {
    const [snippet, setSnippet] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [user, setUser] = useState(null);

    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    const [liked, setLiked] = useState(false);

    const [review, setReview] = useState("");
    const [loadingReview, setLoadingReview] = useState(false);

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

    const handleEdit = (comment) => {

        setEditingId(comment._id);
        setEditText(comment.text);

    }

    const handleCancel = () => {
        setEditingId(null);
        setEditText("");
    };

    const handleUpdate = async () => {

        try {

            const token = localStorage.getItem("token");

            await axios.put(
                `http://localhost:5000/api/comments/${editingId}`,
                {
                    text: editText

                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            await getComments();

            setEditText("");
            setEditingId(null)


        } catch (error) {
            console.log(error);
        }

    }


    const handleLike = async () => {
        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `http://localhost:5000/api/snippets/${id}/like`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            )

            await getSnippet();

            setLiked((prev) => !prev);


        } catch (error) {
            console.log(error);

        }

    }


    const handleReview = async () => {

        try {

            setLoadingReview(true)

            const token = localStorage.getItem("token");

            const response = await axios.post(
                `http://localhost:5000/api/snippets/${id}/review`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setReview(response.data.review)

        } catch (error) {
            console.log(error);

        } finally {
            setLoadingReview(false)
        }

    }

    useEffect(() => {
        getSnippet();
        getComments();
        getMe();

    }, []);

    useEffect(() => {

        if (snippet && user) {

            const likedByMe = snippet.likes.some(
                (id) => id.toString() === user._id
            );

            setLiked(likedByMe);
        }

    }, [snippet, user]);


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

            <h4>❤️ Likes: {snippet.likes.length}</h4>

            <button onClick={handleLike}>
                {liked ? "❤️ Liked" : "👍 Like"}
            </button>

            <button
                onClick={handleReview}
                disabled={loadingReview}
            >
                {loadingReview ? "⏳ Reviewing..." : "🤖 Review My Code"}
            </button>

            {review && (
                <div>
                    <h3>AI Review</h3>

                    <ReactMarkdown>
                        {review}
                    </ReactMarkdown>

                </div>
            )}

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


                    {editingId === comment._id ? (

                        <>
                            <textarea
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                            />

                            <button onClick={handleUpdate}>
                                Save
                            </button>

                            <button onClick={handleCancel}>
                                Cancel
                            </button>
                        </>


                    ) : (

                        <>
                            <p>{comment.text}</p>




                        </>

                    )}

                    {user._id === comment.author._id && (

                        <>
                            <button onClick={() => handleEdit(comment)}>
                                Edit
                            </button>

                            <button onClick={() => handleDelete(comment._id)}>
                                Delete
                            </button>
                        </>
                    )}

                </div>
            ))}

        </div>
    )
}

export default SnippetDetails
