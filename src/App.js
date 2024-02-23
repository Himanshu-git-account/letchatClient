import React,{useEffect} from 'react'
import './App.css';
import {io} from 'socket.io-client'

function App() {
  const socket = io("http://localhost:3000/")
  useEffect(()=>{
    socket.on("connect",()=>{
      console.log("connected",socket.id)
    })

    socket.on("welcome",(data)=>{
      console.log(data)
    })
  },[])
  return (
    <div className="App">
     App
    </div>
  );
}

export default App;
