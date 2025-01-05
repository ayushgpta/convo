import { UserContextProvider ,UserContext} from "./context/usercontext";
import { useContext } from "react";
import RegisterandLogin from "./components/RegisterandLogin"



export default function Routes(){
    const {username,id}=useContext(UserContext);
    if(username){
      return "logged in"+" "+username;
    }
    return (
       
        <RegisterandLogin/>
        
      )
}