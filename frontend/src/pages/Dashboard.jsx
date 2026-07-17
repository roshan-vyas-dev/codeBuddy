import axios from "axios";
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom";



function Dashboard() {
  const [user, setUser] = useState(null);
  const [snippets, setSnippets] = useState([]);



  const navigate = useNavigate();

  const getProfile = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/auth/profile",
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

  const getSnippets = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/snippets",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSnippets(response.data)


    } catch (error) {
      console.log(error);

    }

  }


  useEffect(() => {
    getProfile();
    getSnippets();

  }, [])






  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const handleClick = () => {
    navigate("/create-snippet");
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <h1>Welcome, {user ? user.username : "Loading..."}</h1>

      <button onClick={handleClick}>Create Snippet</button>

      <button onClick={handleLogout}>Logout</button>

      {snippets.map((snippet) => (
        <div key={snippet._id}>
          <h4>{snippet.title}</h4>
          <h4>{snippet.language}</h4>
          <h4>{snippet.points}</h4>

          <Link to={`/snippets/${snippet._id}`}>
            View Details
          </Link>
        </div>
      ))}





    </div>
  )
}

export default Dashboard
