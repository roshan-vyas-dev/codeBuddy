import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-white to-indigo-100">

      <div className="bg-white/80 backdrop-blur-md border border-white rounded-2xl shadow-xl p-10 text-center space-y-6 max-w-2xl">

        <h1 className="text-5xl font-bold text-indigo-600">
          CodeBuddy
        </h1>

        <p className="text-2xl text-gray-700 font-medium">
          Peer Code Review Platform
        </p>

        <p className="max-w-2xl text-gray-600 leading-7">
          Share your code, receive AI-powered reviews, collaborate with other developers,
          and continuously improve your programming skills.
        </p>

        <div className="flex gap-4 justify-center">

          <Link
            to="/login"
            className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition">
            Login
          </Link>

          <Link
            to="/register"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
            Register
          </Link>

        </div>


      </div>

    </div>
  );
};

export default Home;