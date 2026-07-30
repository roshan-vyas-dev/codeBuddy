import axios from "axios";
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom";



function Dashboard() {
  const [user, setUser] = useState(null);
  const [snippets, setSnippets] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



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


      setUser(response.data);
      console.log(response.data);


    } catch (error) {
      console.log(error);

    }

  }

  const getSnippets = async () => {
    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/snippets",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSnippets(response.data);
      setError("");



    } catch (error) {
      console.log(error);

      setError("Failed to load snippets");

    } finally {
      setLoading(false);
    }

  }



  useEffect(() => {
    getMe();
    getSnippets();

  }, [])






  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  const handleClick = () => {
    navigate("/create-snippet");
  };

  const displayedSnippets = snippets.filter((snippet) => {

    const searchMatch =
      keyword === "" ||
      snippet.title.toLowerCase().includes(keyword.toLowerCase());


    const languageMatch =
      selectedLanguage === "" ||
      snippet.language === selectedLanguage;


    return searchMatch && languageMatch;

  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-100 p-8">

      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-8">


          <h1 className="text-4xl font-bold text-gray-800">
            Dashboard
          </h1>


          <div className="flex gap-3">


            {user && (
              <Link
                to={`/profile/${user._id}`}
                className="border border-indigo-600 text-indigo-600 px-5 py-2 rounded-lg hover:bg-indigo-50 transition"
              >
                My Profile
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition">
              Logout
            </button>


          </div>


        </div>

        <p className="text-lg text-gray-600 mb-8">
          Welcome back,
          <span className="font-semibold text-indigo-600">
            {" "}
            {user?.username || "User"}
          </span>
        </p>


        <div className="flex flex-col md:flex-row gap-4 mb-6">

          <input
            type="text"
            placeholder="Search snippets..."
            value={keyword}
            onChange={(e) => {

              setKeyword(e.target.value);

              if (e.target.value === "") {
                getSnippets();
              }

            }}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>

          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >

            <option value="">All Languages</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="C++">C++</option>
            <option value="C">C</option>

          </select>

        </div>





        <div className="flex flex-col md:flex-row  mb-6">

          <button
            onClick={handleClick}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Create Snippet
          </button>

        </div>






        {loading ? (

          <div className="bg-white/80 backdrop-blur-md border border-white rounded-2xl shadow-lg p-10 text-center">

            <div className="flex flex-col items-center justify-center">

              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>

              <p className="text-lg text-indigo-600 font-medium mt-4">
                Loading snippets...
              </p>

            </div>

          </div>

        ) : error ? (

          <div className="bg-red-50 border border-red-200 rounded-2xl p-10 text-center">

            <p className="text-lg text-red-600 font-medium">
              {error}
            </p>

          </div>


        ) : displayedSnippets.length === 0 ? (

          <div className="bg-white/80 backdrop-blur-md border border-white rounded-2xl shadow-lg p-10 text-center">

            <h3 className="text-xl font-semibold text-gray-700">
              No snippets found
            </h3>

            <p className="text-gray-500 mt-2">
              Try changing your search or language filter.
            </p>

          </div>


        ) : (
          <div className="space-y-4">

            {displayedSnippets.map((snippet) => (

              <div
                key={snippet._id}
                className="bg-white/80 backdrop-blur-md border border-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition duration-200">

                <h2 className="text-xl font-bold text-gray-800">
                  {snippet.title}
                </h2>


                <p className="text-gray-600">
                  {snippet.language}
                </p>


                <p className="text-indigo-600 font-medium">
                  ⭐ {snippet.points} points
                </p>


                <Link
                  to={`/snippets/${snippet._id}`}
                  className="inline-block mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                  View Details
                </Link>


              </div>

            ))}

          </div>

        )}


      </div>

    </div>
  );
}

export default Dashboard
