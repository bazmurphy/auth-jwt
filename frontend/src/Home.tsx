import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import UsersTable from "./UsersTable";

const Home = () => {
  const { token, user } = useContext(AuthContext);

  return (
    <>
      {token && user && (
        <div className="page-container">
          <h2>Home</h2>
          <p>
            Welcome back,{" "}
            <span className="email">{user.userEmail.split("@")[0]}</span> 😍
          </p>
          <div className="token-user-container">
            <p>
              🎫 token:
              <br />
              <span className="token">...{token.slice(-16)}</span>
            </p>
            <p>
              😎 user:
              <br />
              <span className="user">{JSON.stringify(user, null, 2)}</span>
            </p>
          </div>
          <UsersTable />
        </div>
      )}
    </>
  );
};

export default Home;
