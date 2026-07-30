import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoading(true);

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem("token", response.data.token);


            localStorage.setItem(
                "user",
                JSON.stringify({
                    _id: response.data._id,
                    username: response.data.username,
                    email: response.data.email,
                    role: response.data.role
                })
            );

            toast.success("Login successful");

            if (response.data.role === "admin") {
                navigate("/admin/dashboard");
            } else {
                navigate("/dashboard");
            }



        } catch (error) {
            console.log(error);
            toast.error("Invalid email or password");

        } finally {

            setLoading(false);

        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-indigo-100">


            <div className="bg-white/80 backdrop-blur-md border border-white rounded-2xl shadow-xl p-10 w-full max-w-md">

                <h1 className="text-3xl font-bold text-indigo-600 text-center mb-6">
                    Login
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />

                    <input type="password" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" />

                    {/* login button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="text-center text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-indigo-600 font-medium hover:underline">
                        Register
                    </Link>
                </p>




            </div>

        </div>
    )
}

export default Login
