import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isLogged, setIsLogged] = useState(false);
    

  useEffect(() => {

    async function checkAuth() {

    const token = localStorage.getItem("token");

    try{
        const response = await fetch("http://localhost:3000/check-auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        if(response.status === 200){
            setIsLogged(true);
        } else {
          localStorage.removeItem("token");
             setIsLogged(false);
        }
    } catch(err){
        console.log("Network error");
        setIsLogged(false);
    }
}
checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
