import { createContext, useEffect, useState } from "react";

interface User {
  userId: string;
  userEmail: string;
}

interface Credentials {
  email: string;
  password: string;
}

interface AuthContextType {
  token: string | null;
  setToken: (token: string) => void;
  user: User | null;
  setUser: (user: User) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  error: Error | null;
  setError: (error: Error) => void;
  register: (credentials: Credentials) => void;
  login: (credentials: Credentials) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!); // added a !

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // retrieve the token from Local Storage if it exists
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      const payload = storedToken.split(".")[1];
      // console.log("AuthProvider > payload", payload);
      const decodedPayload = JSON.parse(atob(payload));
      // console.log("AuthProvider > decodedPayload", decodedPayload);
      setUser({
        userId: decodedPayload.userId,
        userEmail: decodedPayload.userEmail,
      });
    }
  }, []);

  const register = async (credentials: Credentials) => {
    // console.log("AuthProvider > register > credentials", credentials);
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        console.error("AuthProvider > register > response NOT ok", response);
        const data = await response.json();
        console.log("AuthProvider > register > response NOT ok > data", data);
        setError(data.message);
        return;
      }

      const data = await response.json();
      // console.log("AuthProvider > register > data", data);

      const token = data.token;
      // console.log("AuthProvider > register > token", token);
      setToken(token);

      localStorage.setItem("token", token);
      // console.log(
      //   `AuthProvider > register > localStorage.getItem("token")`,
      //   localStorage.getItem("token")
      // );

      const payload = token.split(".")[1];
      // console.log("AuthProvider > register > payload", payload);
      const decodedPayload = JSON.parse(atob(payload));
      // console.log("AuthProvider > register > decodedPayload", decodedPayload);

      setUser({
        userId: decodedPayload.userId,
        userEmail: decodedPayload.userEmail,
      });
    } catch (error) {
      console.error("AuthProvider > register > catch > Error:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: Credentials) => {
    // console.log("AuthProvider > login > credentials", credentials);
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );
      // console.log("AuthProvider > login > response", response);

      if (!response.ok) {
        console.error("AuthProvider > login > response NOT ok", response);
        const data = await response.json();
        console.log("AuthProvider > login > response NOT ok > data", data);
        setError(data.message);
        return;
      }

      const data = await response.json();
      // console.log("AuthProvider > login > data", data);
      const token = data.token;
      // console.log("AuthProvider > login > token", token);
      setToken(token);

      localStorage.setItem("token", token);
      // console.log(
      //   `AuthProvider > login > localStorage.getItem("token")`,
      //   localStorage.getItem("token")
      // );

      const payload = token.split(".")[1];
      // console.log("AuthProvider > login > payload", payload);

      const decodedPayload = JSON.parse(atob(payload));
      // console.log("AuthProvider > login > decodedPayload", decodedPayload);

      setUser({
        userId: decodedPayload.userId,
        userEmail: decodedPayload.userEmail,
      });
    } catch (error) {
      console.error("AuthProvider > login > catch > Error:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  const value = {
    token,
    setToken,
    user,
    setUser,
    loading,
    setLoading,
    error,
    setError,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
