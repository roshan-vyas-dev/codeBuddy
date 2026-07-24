import { Link } from "react-router-dom";

const NotFound = () => {
    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-indigo-100 p-8">

            <div className="text-center bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-10">

                <h1 className="text-6xl font-bold text-indigo-600">
                    404
                </h1>

                <h2 className="text-2xl font-bold text-gray-800 mt-4">
                    Page Not Found
                </h2>

                <p className="text-gray-600 mt-2 mb-6">
                    The page you are looking for does not exist.
                </p>


                <Link
                    to="/dashboard"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                >
                    Go to Dashboard
                </Link>

            </div>

        </div>

    );
};

export default NotFound;