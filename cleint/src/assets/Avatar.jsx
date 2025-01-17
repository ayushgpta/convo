import React from 'react'

function Avatar({userId,username}) {
    const colors=['bg-blue-300','bg-red-700','bg-green-300','bg-yellow-300','bg-indigo-300','bg-purple-500','bg-pink-300'];
    const useridbase10=parseInt(userId,16);
    const colorindex=(useridbase10 %colors.length);
    const randomcolor=colors[colorindex];
  return (
    <div className={"w-8 h-8 rounded-full  flex items-center " +randomcolor}>
        <div className='text-center w-full opacity-70'> {username[0]}</div>
       
    </div>
  )
}

export default Avatar