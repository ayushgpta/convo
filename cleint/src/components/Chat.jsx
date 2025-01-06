import React from "react";
import SendIcon from "../icons/SendIcon";

function Chat() {
  return (
    <div className="flex h-screen">
      <div className="bg-white w-1/3">
        contacts
    </div>
    <div className="bg-blue-200 w-2/3 p-2 flex flex-col">
        <div className="flex-grow">
            messages
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
