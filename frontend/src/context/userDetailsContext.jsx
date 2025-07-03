import { createContext, useContext, useEffect, useState } from "react";

const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {

    const [username, setUsername] = useState("Guest 007");
    
  useEffect(() => {

    async function userDetails() {
        
    try{

        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_RENDERER_URL}/get-user-details`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        if(response.status == 200){
            const username = await response.json();
            setUsername(username.username)
        } else if(response.status === 500){
          localStorage.removeItem("token")
        }

    } catch(err){
        console.log(err);
    }
}
userDetails();
  }, []);

  return (
    <UserDetailsContext.Provider value={{username}}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export const useUserDetails = () => useContext(UserDetailsContext);
