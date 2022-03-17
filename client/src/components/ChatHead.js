import React from 'react'
import { useSelector } from 'react-redux';

const ChatHead = () => {
    const { pic } = useSelector((state) => state);
  return (
    <div className="header">
<img className="picReciver"
        src={pic}
        alt=""
      />
    </div>
  )
}

export default ChatHead