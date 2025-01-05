import React from "react";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/usercontext";

function RegisterandLogin() {
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isloginorregister, setIsloginorregister] = useState('register');
    const {setUsername:setLoggedInUsername,setId}=useContext(UserContext);
    
   async function handleSubmit(event){
     event.preventDefault();
     const url=isloginorregister==='register'?'register':'login';
      const {data}=await axios.post(url,{username,password});
      setLoggedInUsername(data.username);
      setId(data.id);
    }

  return (
    <div className="bg-purple-300 h-screen flex items-center">
      <form className="w-1/4 mx-auto mb-16" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className="block w-full rounded-md p-2 mb-10 h-12 border"
          value={username}
          onChange={e=>setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="block w-full rounded-md p-2 mb-10 h-12 border"
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />
        <button className="bg-red-500 block w-full rounded-md text-white h-12">
         {isloginorregister==='register'?'Register':'Login'}
         </button>
         {isloginorregister==='register' && (
           <div className="text-center mt-4 ">
           Already a user? 
           <button
           onClick={()=>setIsloginorregister('login')}
           >Login here</button>
         </div>
         )}
         {isloginorregister==='login' && (
           <div className="text-center mt-4 ">
          Don't have an account? 
           <button
           onClick={()=>setIsloginorregister('register')}
           >Register here</button>
         </div>
         )}
        
       
      </form>
    </div>
  );
}

export default RegisterandLogin;
