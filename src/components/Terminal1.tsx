import React, { useEffect } from 'react';

  
export default function Terminal({c,sclr}:any){
  let i:number=0;
  function sendMessage() {
    //the below if else condition is optional. Only to prevent user from executing when there is a command running already.
    //only the body of else condition is important
      if(sessionStorage.command_state==='1'){
      alert("You have a command running in the terminal. Please wait for its completion. You can open a new tab for entering commands if needed");}
      else{
      //value of the postmessage function; nothing but command; make sure command value is put here.
        var message:any='';
        console.log(c);
        if( !c.includes("&&")){
        let singleLineTexts = c.split("\n");
        for( i=0;i<singleLineTexts.length;i++)
        {
          if(i==singleLineTexts.length-1)
          message+=singleLineTexts[i]
          else
         message+=(singleLineTexts[i]+" && ")   
        }
      }
      else
      message+=c;
        console.log(message);
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
      // console.log("Command ID received from the child: " + x.Command_ID);
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
        sclr("green");
    else
        sclr("red");console.log('red');
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
    sclr("green");
    else
    sclr("red");
        socket.close()
    });
    }
useEffect(()=>{

  sendMessage()
  },[c])
    return(
        <>
        <div>
        {/* <button id="CES">Command Execution Status</button><br/> */}
        <input id="Time" type="text" readOnly/>
        {/* <input id="command_id" type="text" readOnly/> */}
        </div>
        <iframe id="myFrame" src="http://localhost:8888?hostname=192.168.138.133&&username=vignesh&&password=dG9vcg==" style={{position:"fixed",bottom:0, width:"100%",height:"30vh"}}/>

        </>
        )
}

    