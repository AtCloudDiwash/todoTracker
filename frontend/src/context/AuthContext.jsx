import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(null); 
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLogged(false);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_RENDERER_URL}/check-auth`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );

        if (response.status === 200) {
          setIsLogged(true);
        } else {
          localStorage.removeItem("token");
          setIsLogged(false);
        }
      } catch (err) {
        setIsLogged(false);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);
  

  return (
    <AuthContext.Provider value={{ isLogged, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
