import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import "./App.css";

const App = () => {
  const { token, user } = useContext(AuthContext);

  return (
    <>
      <Header />
      <Nav />
      {token && user && <Home />}
    </>
  );
};

export default App;
