import { UserContextProvider ,UserContext} from "./context/usercontext";
import { useContext } from "react";
import RegisterandLogin from "./components/RegisterandLogin"
import Chat from "./components/chat"


export default function Routes(){
    const {username,id}=useContext(UserContext);
    if(username){
      return <Chat/>
    }
    return (
       
        <RegisterandLogin/>
        
      )
}