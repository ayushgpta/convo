import { UserContextProvider ,UserContext} from "./context/usercontext";
import { useContext } from "react";
import Register from "./components/Register"



export default function Routes(){
    const {username,id}=useContext(UserContext);
    if(username){
      return "logged in";
    }
    return (
       
        <Register/>
        
      )
}