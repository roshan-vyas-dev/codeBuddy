import axios from "axios";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";



function Dashboard() {
  const [user, setUser] = useState(null);

 

  const navigate = useNavigate();

  useEffect(() => {

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
    getProfile();

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

    </div>
  )
}

export default Dashboard
