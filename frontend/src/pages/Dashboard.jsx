import axios from "axios";
import { useState, useEffect } from "react"



function Dashboard() {
  const [user, setUser] = useState(null);

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

        console.log(response.data);

        setUser(response.data)


      } catch (error) {
        console.log(error);

      }



    }
    getProfile();

  }, [])

  return (
    <div>
      <h1>Dashboard</h1>

      <h1>Welcome, {user ? user.username : "Loading..."}</h1>

      <button>Create Snippet</button>

      <button>Logout</button>

    </div>
  )
}

export default Dashboard
