import { createContext, useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("Guest 007");
    
  useEffect(() => {

    async function userDetails() {
        
    try{

        const response = await fetch("http://localhost:3000/get-user-details",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        });

        if(response.status == 200){
            const username = await response.json();
            setUsername(username.username)
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
