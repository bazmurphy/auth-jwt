import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import Register from "./Register";
import Login from "./Login";

const Nav = () => {
  const { token, user, logout, verify, loading } = useContext(AuthContext);

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  return (
    <nav>
      {(!token || !user) && (
        <>
          <div className="buttons-container">
            <button
              onClick={handleRegisterClick}
              className={showRegister ? "button-active" : ""}
            >
              📃 Register
            </button>
            <button
              onClick={handleLoginClick}
              className={showLogin ? "button-active" : ""}
            >
              🪪 Login
            </button>
          </div>
          <div className="page-container">
            {showRegister && <Register />}
            {showLogin && <Login />}
          </div>
        </>
      )}
      {token && user && (
        <div className="buttons-container">
          <button onClick={logout}>👋 Logout</button>
          <button onClick={verify}>
            Verify Token{" "}
            <span className="verify-status">{loading ? "⌛" : "✅"}</span>
          </button>
        </div>
      )}
    </nav>
  );
};
export default Nav;
