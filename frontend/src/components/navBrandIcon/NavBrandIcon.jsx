import Icon from "../../assets/navbrand.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function NavBrandIcon(){

      const navigate = useNavigate();
      const {isLogged} = useAuth();
    
      const gotoMain = ()=>{
            navigate("/landing")
      }
    return(

        <>

            <img src={Icon} alt="nav icon" style={{"cursor":"pointer"}} onClick={gotoMain}/>
        
        </>

    )
}