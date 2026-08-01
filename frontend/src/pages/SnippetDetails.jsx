import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";




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
    const navigate = useNavigate();

    const getSnippet = async () => {

        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/snippets/${id}`,
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
                `${import.meta.env.VITE_API_URL}/comments/snippet/${id}`,
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
                `${import.meta.env.VITE_API_URL}/comments`,
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

    const handleDeleteSnippet = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this snippet?"
        );


        if (!confirmDelete) {
            return;
        }


        try {

            const token = localStorage.getItem("token");


            await axios.delete(
                `${import.meta.env.VITE_API_URL}/snippets/${snippet._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            toast.success("Snippet deleted successfully");

            navigate("/dashboard");


        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to delete snippet"
            );

        }

    };

    const getMe = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/auth/me`,
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
                `${import.meta.env.VITE_API_URL}/comments/${commentId}`,

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
                `${import.meta.env.VITE_API_URL}/comments/${editingId}`,
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

            const newLikedStatus = !liked;


            await axios.put(
                `${import.meta.env.VITE_API_URL}/snippets/${id}/like`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            )


            setLiked(newLikedStatus);

            await getSnippet();

            toast.success(
                newLikedStatus
                    ? "Snippet liked!"
                    : "Like removed");


        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");


        }

    }


    const handleReview = async () => {

        try {

            setLoadingReview(true)

            const token = localStorage.getItem("token");

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/snippets/${id}/review`,
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
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-indigo-100">

                <div className="flex flex-col items-center">

                    <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>

                    <p className="mt-4 text-indigo-600 font-medium">
                        Loading snippet...
                    </p>

                </div>

            </div>
        );
    }


    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 p-8">

            <div className="max-w-5xl mx-auto">

                <button
                    onClick={() => navigate("/dashboard")}
                    className="mb-6 text-indigo-600 font-medium hover:underline">
                    ← Back to Dashboard
                </button>

                <div className="bg-white/80 backdrop-blur-md border border-white rounded-2xl shadow-lg p-8 mb-6">

                    <h1 className="text-3xl font-bold text-gray-800 mb-3">
                        {snippet.title}
                    </h1>


                    <p className="text-indigo-600 font-medium mb-4">
                        {snippet.language}
                    </p>

                    <div className="flex gap-4 mb-6">

                        <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-medium">
                            ⭐ {snippet.points} points
                        </span>


                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
                            👍 {snippet.likes.length} likes
                        </span>

                    </div>


                    <div className="bg-gray-900 rounded-2xl p-6 mb-6 overflow-x-auto">

                        <pre className="text-gray-100 text-sm">
                            {snippet.code}
                        </pre>

                    </div>


                    {
                        user &&
                        snippet.author &&
                        user._id === snippet.author._id && (

                            <div className="flex gap-3">

                                <button
                                    onClick={() => navigate(`/edit-snippet/${snippet._id}`)}
                                    className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition">
                                    Edit Snippet
                                </button>


                                <button
                                    onClick={handleDeleteSnippet}
                                    className="bg-red-600 text-white px-5 py-3 rounded-lg hover:bg-red-700 transition">
                                    Delete Snippet
                                </button>

                            </div>

                        )
                    }

                </div>


                <div className="flex gap-4 mb-8">
                    <button
                        onClick={handleLike}
                        className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition">
                        {liked ? "Liked" : "Like"}
                    </button>


                    <button
                        onClick={handleReview}
                        disabled={loadingReview}
                        className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50">
                        {loadingReview ? (
                            <div className="flex items-center justify-center gap-2">

                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                                Reviewing...

                            </div>
                        ) : (
                            "Review Code"
                        )}
                    </button>


                </div>

                {review && (

                    <div className="bg-white/80 backdrop-blur-md border border-white rounded-2xl shadow-lg p-6 mb-8">

                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            AI Code Review
                        </h3>


                        <div className="prose max-w-none text-gray-700">

                            <ReactMarkdown>
                                {review}
                            </ReactMarkdown>

                        </div>


                    </div>

                )}

                <div className="bg-white/80 backdrop-blur-md border border-white rounded-2xl shadow-lg p-6 mb-8">


                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Add Comment
                    </h3>


                    <form onSubmit={handleComment} className="space-y-4">


                        <textarea
                            value={comment}
                            placeholder="Share your feedback..."
                            onChange={(e) => setComment(e.target.value)}
                            rows="4"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                        />


                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition" >
                            Add Comment
                        </button>


                    </form>


                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-5">
                    Comments
                </h3>

                {comments.length === 0 ? (

                    <div className="bg-white/80 backdrop-blur-md border border-white rounded-2xl shadow p-8 text-center mb-6">

                        <p className="text-gray-700 text-lg font-medium">
                            No comments yet
                        </p>

                        <p className="text-gray-500 mt-2">
                            Be the first person to review this code.
                        </p>

                    </div>

                ) : (

                    comments.map((comment) => (

                        <div
                            key={comment._id}
                            className="bg-white/80 backdrop-blur-md border border-white rounded-xl shadow p-5 mb-4">

                            <Link
                                to={`/profile/${comment.author._id}`}
                                className="text-indigo-600 font-semibold hover:underline">
                                {comment.author.username}
                            </Link>

                            {editingId === comment._id ? (

                                <>
                                    <textarea
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
                                    />

                                    <div className="flex gap-3">

                                        <button
                                            onClick={handleUpdate}
                                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                                            Save
                                        </button>

                                        <button
                                            onClick={handleCancel}
                                            className="border border-gray-400 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                                            Cancel
                                        </button>

                                    </div>
                                </>

                            ) : (

                                <>
                                    <p className="text-gray-700 mt-3">
                                        {comment.text}
                                    </p>
                                </>

                            )}

                            {user._id === comment.author._id && (

                                <div className="flex gap-3 mt-4">

                                    <button
                                        onClick={() => handleEdit(comment)}
                                        className="text-indigo-600 hover:underline">
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(comment._id)}
                                        className="text-red-600 hover:underline">
                                        Delete
                                    </button>

                                </div>

                            )}

                        </div>

                    ))

                )}


            </div>

        </div>
    )
}

export default SnippetDetails
