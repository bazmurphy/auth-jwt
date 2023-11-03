import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const Home = () => {
  const { token, user, logout } = useContext(AuthContext);

  return (
    <>
      <h2>Home</h2>
      <p>
        Welcome back,{" "}
        <span className="email">{user?.userEmail.split("@")[0]}</span> 😍
      </p>
      <p>
        🎫 token: <span className="token">~{token?.slice(-16)}</span>
      </p>
      <p>
        👤 user: <span className="user">{JSON.stringify(user)}</span>
      </p>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Home;
