import { useState, useContext, ChangeEvent, FormEvent } from "react";
import { AuthContext } from "./AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register, loading, error } = useContext(AuthContext);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();
    const credentials = { email, password };
    // console.log("handleRegister > credentials", credentials);
    register(credentials);
  };

  return (
    <>
      <h2>Register</h2>
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
        <button onClick={handleRegister}>
          Register {error ? "🔴" : loading ? "🟠" : "🟢"}
        </button>
        {loading && <p className="loading">Logging In...</p>}
        {error && <p className="error">Error: {String(error)}</p>}
      </form>
    </>
  );
};

export default Register;
