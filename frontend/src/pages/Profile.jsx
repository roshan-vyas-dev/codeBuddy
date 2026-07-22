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
                    `http://localhost:5000/api/users/${id}`
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
                    `http://localhost:5000/api/users/${id}/snippets`
                );

                setSnippets(response.data);

            } catch (error) {
                console.log(error);
            }

        };

        fetchSnippets();

    }, [id]);

    return (
        <div>

            {user && (
                <div>
                    <h1>{user.username}</h1>
                    <p>⭐ Reputation: {user.reputation}</p>
                    <p>{user.bio}</p>
                </div>
            )}


            <h2>My Snippets</h2>

            {snippets.map((snippet) => (
                <div key={snippet._id}>

                    <Link to={`/snippets/${snippet._id}`}>
                        <h3>{snippet.title}</h3>
                    </Link>

                    <p>{snippet.language}</p>

                </div>
            ))}

        </div>
    )
}

export default Profile
