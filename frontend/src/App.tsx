import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import "./App.css";

const App = () => {
  const { token, user } = useContext(AuthContext);

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
    <>
      <Header />
      {(!token || !user) && (
        <>
          <div className="buttons-container">
            <button onClick={handleRegisterClick}>Register</button>
            <button onClick={handleLoginClick}>Login</button>
          </div>
          <div>
            {showRegister && <Register />}
            {showLogin && <Login />}
          </div>
        </>
      )}
      {token && user && <Home />}
    </>
  );
};

export default App;
