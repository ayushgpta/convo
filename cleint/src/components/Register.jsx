import React from "react";
import { useState } from "react";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  return (
    <div className="bg-purple-300 h-screen flex items-center">
      <form className="w-1/4 mx-auto mb-16">
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
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
