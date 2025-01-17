import React, { useEffect, useState ,useContext} from "react";
import SendIcon from "../icons/SendIcon";
import Chaticon from "../icons/Chaticon";
import Avatar from "../assets/Avatar";
import {UserContext} from "../context/Usercontext"

function Chat() {
  const [ws, setWs] = useState(null);
  const [onlinepeople, setOnlinepeople] = useState({});
  const [selecteduserid, setselecteduserid] = useState(null);
  const {username,id}=useContext(UserContext)
  
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setWs(ws);
    ws.addEventListener("message", handlemessage);
  }, []);
  function showonlinepeople(peoplearray) {
    const people = {};
    peoplearray.forEach(({ userId, username }) => {
      people[userId] = username;
    });
    setOnlinepeople(people);
  }
  function handlemessage(event) {
    const messagedata = JSON.parse(event.data);
    if ("online" in messagedata) {
      showonlinepeople(messagedata.online);
    }
  }

   const onlinepeopleexceptuser={...onlinepeople};
   delete onlinepeopleexceptuser[id];
  return (
    <div className="flex h-screen">
      <div className="bg-white w-1/3 ">
        <div className="text-blue-700 font-bold flex gap-2 mb-4 p-4">
          <Chaticon />
          Convo Chat
          
        </div>
        {Object.keys(onlinepeopleexceptuser).map(userId => (
          <div key={userId} onClick={()=>setselecteduserid(userId)} 
          className={"border-b border-grey py-2 pl-4 flex items-center gap-2 cursor-pointer " +(userId===selecteduserid?'bg-blue-50':'')}>
            {userId === selecteduserid  && (
              <div className="w-1 bg-blue-500 h-12 rounded-r-md"></div>
            )}
            <div className=" flex gap-2 py-2 pl-4 items-center">
            <Avatar username={onlinepeople[userId]} userId={userId} />
            <span className="text-gray-800">{onlinepeople[userId]}</span>
            </div>
            
            
          </div>
        ))}
      </div>
      <div className="bg-blue-200 w-2/3 p-2 flex flex-col">
        <div className="flex-grow">
          {!selecteduserid && (
            <div className="flex h-full items-center justify-center">
              <div className="text-gray-600">&larr;Select a  person from contact list</div>
              </div>
          )}
        </div>
        <div className="flex gap-2 mx-2">
          <input
            type="text"
            placeholder="type your message here"
            className="bg-white border p-2 w-full rounded-md "
          />
          <button className="bg-blue-600 p-2 text-white rounded-md">
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
