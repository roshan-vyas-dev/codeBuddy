import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>CodeBuddy</h1>

      <p>Peer Code Review Platform</p>

      <p>
        Share your code, get AI reviews, receive feedback, and improve your
        programming skills.
      </p>

      <Link to="/login">
        <button>Login</button>
      </Link>

      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
};

export default Home;