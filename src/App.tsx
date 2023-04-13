import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import About from './pages/About';
import Analytics from './pages/Analytics';
import Users from './pages/Users';
import Revenue from './pages/Revenue';
import Post from './components/Post';
import Terminal1 from './components/Terminal';
// import { FaStopwatch20 } from 'react-icons/fa';
import Stag0 from './pages/Stag0';
import Stag1 from './pages/Stag1';
import Stag2 from './pages/Stag2';
import Stag3 from './pages/Stag3';
import Stag4 from './pages/Stag4';
import Header1 from './components/Header';
import Tab from './components/Tabs';
import {useState,useEffect} from 'react'
import Terminal2 from './components/Terminal2';

// Render the component

function App() {
  // const [term, setTerm] = useState(false);

  const [cmd, setCmd] = useState("Hello World");
  // const [labelColor, setLabelColor] = useState("");
  var labelColor:any;

  function sendMessage() {
    //the below if else condition is optional. Only to prevent user from executing when there is a command running already.
    //only the body of else condition is important
      if(sessionStorage.command_state==='1'){
      alert("You have a command running in the terminal. Please wait for its completion. You can open a new tab for entering commands if needed");}
      else{
      //value of the postmessage function; nothing but command; make sure command value is put here.
        const message = cmd;
        
        const iframe = document.querySelector("iframe");
        iframe?.contentWindow?.postMessage(message, "*");}
      }
      //function to receive command id, status and time from the server.
      //command id display is optional. However session storage part is important for the pending command part following this code.
      window.addEventListener('message', function(event) {
      try{
      var x=JSON.parse(event.data);
      if(x!=null){
      if(Object.keys(x).length===1){
      console.log("Command ID received from the child: " + x.Command_ID);
      (document.getElementById("command_id") as HTMLInputElement).value=x.Command_ID;
      sessionStorage.Command_ID=x.Command_ID
      sessionStorage.command_state=1
      }
    //to display command status and time. When we recieve them, we set command state as 0.
      else if(Object.keys(x).length===2){
        console.log("Message received from the child: " + x.Command_Execution_Status+x.Execution_Time);
        (document.getElementById("Time") as HTMLInputElement).value=x.Execution_Time;
        sessionStorage.command_state=0;
        const b= document.getElementById('CES') as HTMLInputElement;
        if(x.Command_Execution_Status==='0')
    labelColor='green';
    else
    labelColor='red';
    }
    }
      }
      catch(err){console.log(err);}});
      
      //the pending command execution part. When user reloads and a command was running; 
      const pageAccessedByReload = (
      (window.performance.navigation && window.performance.navigation.type === 1) ||
        window.performance
          .getEntriesByType('navigation')
          .map((nav) => (nav as any).type)
          .includes('reload')
    );
    
    if(pageAccessedByReload && sessionStorage.Command_ID!=null && sessionStorage.command_state==='1'){
    console.log("Websocket for pending command activated");
    const socket = new WebSocket('ws://localhost:8888/sql/');
    socket.addEventListener('open', function (event) {
        socket.send(sessionStorage.Command_ID);
    });
    socket.addEventListener('message', function (event) {
    const x=JSON.parse(event.data);
    (document.getElementById("Time") as HTMLInputElement).value=x.Execution_Time;
    sessionStorage.command_state=0
    const b= document.getElementById('CES') as HTMLInputElement;
    if(x.Command_Execution_Status==='0')
    b.style.background='green';
    else
    b.style.background='red';
        socket.close()
    });
    }
    //****************************************************
     
  

// console.log(cmd)
  // function changeTerm()
  // {
  //     setTerm((prev)=> !prev)
  // }


  return (
    
    <>
    
    
    
    <div className='Appy'>
    
    <BrowserRouter>
    
    <Header1></Header1>
    <div style={{"display":"flex"}}>
    <Sidebar ></Sidebar>
    {/* <Post></Post> */}
    <div className='foot_mark'>
    <Tab></Tab>
    <Routes>
      <Route path='/overview' element={<Overview></Overview>}/>
      <Route path='/about' element={<About></About>}/>
      <Route path='/analytics' element={<Analytics></Analytics>}/>
      <Route path='/overview/users' element={<Users></Users>}/>
      <Route path='/overview/revenue' element={<Revenue></Revenue>}/>
      <Route path='/install' element={<Stag0></Stag0>}/>
      <Route path='/s0' element={<Stag0 cmd={setCmd} clr={labelColor}></Stag0>}/>
      <Route path='/s1' element={<Stag1 cmd={setCmd} clr={labelColor}></Stag1>}/>
      <Route path='/s2' element={<Stag2 cmd={setCmd} clr={labelColor}></Stag2>}/>
      <Route path='/s3' element={<Stag3 cmd={setCmd} clr={labelColor}></Stag3>}/>
      <Route path='/s4' element={<Stag4 cmd={setCmd} clr={labelColor}></Stag4>}/>
      
    </Routes>
    <div id="app">
  {/* <input id="message" type="text" />
  <button id="sendMessage" onClick={sendMessage}>Send Message</button><br/> */}
  <>{sendMessage()}</>
  <button id="CES">Command Execution Status</button><br/>
  <input id="Time" type="text" readOnly/>
  <input id="command_id" type="text" readOnly/>
</div>
    
    
    {/* <Footer data={"hello"}></Footer> */}
    <div>
    {/* <Terminal1 c={cmd} sclr={setLabelColor}></Terminal1> */}
    <iframe id="myFrame" src="http://localhost:8888?hostname=kali&&username=kali&&password=a2FsaQ==" style={{position:"absolute",bottom:"0px",width:"100%",height:"300px"}}/>
    </div>
    </div>
    </div>
    </BrowserRouter>
    </div>
    
    </>
    
  );
}

export default App;
