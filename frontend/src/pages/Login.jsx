import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");

            console.log("Token saved successfully!");


        } catch (error) {
            console.log(error);

        }

    }

    return (
        <div>


            <h1>login</h1>

            <form onSubmit={handleSubmit}>
                <input type="email" value={email} placeholder="Enter email" onChange={(e) =>
                    setEmail(e.target.value)} />

                <input type="password" value={password} placeholder="Enter password" onChange={(e) =>
                    setPassword(e.target.value)} />

                {/* login button */}
                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    )
}

export default Login
