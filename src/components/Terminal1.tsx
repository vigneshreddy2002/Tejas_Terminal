import React, { useEffect } from 'react';
export default function Terminal({c,sclr}:any){
  let i:number=0;
  function sendMessage() {
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
        iframe?.contentWindow?.postMessage(message, "*");
      }
      window.addEventListener('message', function(event) {
      try{
      var x=JSON.parse(event.data);
      if(x!=null){
      if(Object.keys(x).length===2){
        console.log("Message received from the child: " + x.Command_Execution_Status+x.Execution_Time);
        (document.getElementById("Time") as HTMLInputElement).value=x.Execution_Time;
        const b= document.getElementById('CES') as HTMLInputElement;
        if(x.Command_Execution_Status==='0')
        sclr("green");
    else
        sclr("red");console.log('red');
    }
    }
      }
      catch(err){console.log(err);}});
      
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
        <iframe id="myFrame" src="http://localhost:8888" style={{position:"fixed",bottom:0, width:"100%",height:"30vh"}}/>

        </>
        )
}
