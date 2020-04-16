var socket = io();
 
var urlParams = new URLSearchParams( window.location.search);

if (!urlParams.has("escritorio")) {
    window.location.href = 'index.html'
    throw new Error(`El escritorio es necesario.`)
}

var desktop = urlParams.get("escritorio");

document.getElementById("title-desktop").innerText = `Escritorio ${desktop}`;

document.getElementById("btn-attend-ticket")
.addEventListener("click",()=>{

    socket.emit('attendTicket',{desktop},(resp)=>{
      
          if(resp.status){
            
            document.getElementById("attendTicket").innerText = `ticket: #${resp.attendTicket.number}`;
          }else{

            document.getElementById("attendTicket").innerText = `... ${resp.msg}`;
          }

    });

 });


socket.on("connect", () => {
  console.log("Conectado al servidor");
});

// escuchar
socket.on("disconnect", () => {
  console.log("Perdimos conexión con el servidor");
});
