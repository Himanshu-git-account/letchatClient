import React,{useEffect, useState,useMemo} from 'react'
import './App.css';
import {io} from 'socket.io-client'

function App() {

  const [message,setMessage] = useState("");
  const [room,setRoom] = useState("");
  const [roomName,setRoomName] = useState("");
  const [recievedMessage,setRecievedMessage] = useState([]);
  const [socketId,setSockedID] = useState("")
  const socket = useMemo(()=>io("http://localhost:3000/"),[]);
  
  const handleSendMessage=()=>{

  
      socket.emit("message",{message:message,room:room});
    
    setMessage("")
  }

  const handleJoinRoom = ()=>{

    socket.emit('join-room',roomName);
    setRoomName("")
  }
  useEffect(()=>{
    socket.on("connect",()=>{
      setSockedID(socket.id)
      console.log("connected",socket.id)
    })

    socket.on("welcome",(data)=>{
      console.log(data)
    })
    socket.on("recieve-message",(data)=>{
      console.log("recieve-message",data)
      setRecievedMessage((preMesage)=>[...preMesage,data])
    })
  },[])
  return (
    <div className="App">
      <div className='container'>
      <h3>ID - {socketId}</h3>
      <div className='formContainer'>
   
        <input type='text' className='input-feild' value={roomName} placeholder='Enter new room' onChange={(e)=>setRoomName(e.target.value)}/>

        <button className="button" onClick={handleJoinRoom}>Join</button>
      
        </div>
        <div className='formContainer'>
      
        <input type='text' className='input-feild' value={room} placeholder='Enter Room ID' onChange={(e)=>setRoom(e.target.value)}/>

        <input type='textArea' className='input-feild' placeholder='Enter Text' value={message} onChange={(e)=>setMessage(e.target.value)}/>
        <button className="button" onClick={handleSendMessage}>Send</button>
      
        </div>
   
      {recievedMessage.length>0 && <div className='list'>
        <ul>
          { recievedMessage.map((item)=>{
            return <li>{item}</li>
          })}
        </ul>
    </div>}
    </div>
    </div>
  );
}

export default App;
