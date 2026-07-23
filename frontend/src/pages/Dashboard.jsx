import axios from "axios";
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom";



function Dashboard() {
  const [user, setUser] = useState(null);
  const [snippets, setSnippets] = useState([]);
  const [keyword, setKeyword] = useState("");



  const navigate = useNavigate();

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

  const handleSearch = async () => {
    console.log("Searching:", keyword);

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/snippets/search?keyword=${keyword}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSnippets(response.data);

    } catch (error) {
      console.log(error);
    }

  };


  useEffect(() => {
    getMe();
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

      <input type="text" placeholder="Search snippets..." value={keyword} onChange={(e) => {

          setKeyword(e.target.value);

          if (e.target.value === "") {
            getSnippets();
          }

        }} />

      <button onClick={handleSearch}>
        Search
      </button>
      <br />

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
