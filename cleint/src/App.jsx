import Routes from "./routes";
import axios
 from "axios";
import { UserContextProvider ,UserContext} from "./context/usercontext";
import { useContext } from "react";

function App() {
  axios.defaults.baseURL='http://localhost:8080';
  axios.defaults.withCredentials=true;
  
  return (
    <UserContextProvider>
    <Routes/>
    </UserContextProvider>
  )
}

export default App
