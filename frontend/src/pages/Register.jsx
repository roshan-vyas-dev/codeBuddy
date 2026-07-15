import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"


function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username,
          email,
          password
        }
      );



      navigate("/login");


    } catch (error) {
      console.log(error);

    }
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>

        <input type="text" value={username} placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
        <input type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />


        <button type="submit">Regsiter</button>


      </form>

      <p>
        Already have an account?

        <Link to="/login">Login</Link>
      </p>

    </div>
  )
}

export default Register
