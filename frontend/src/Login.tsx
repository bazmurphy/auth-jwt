import { useState, useContext, ChangeEvent, FormEvent } from "react";
import { AuthContext } from "./AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error } = useContext(AuthContext);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const credentials = { email, password };
    // console.log("handleLogin > credentials", credentials);
    login(credentials);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div>
          <label>Email:</label>
          <input type="text" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button onClick={handleLogin} disabled={loading}>
          Login {error ? "🔴" : loading ? "🟠" : "🟢"}
        </button>
        {loading && <p className="loading">Logging In...</p>}
        {error && <p className="error">Error: {String(error)}</p>}
      </form>
    </div>
  );
};

export default Login;
