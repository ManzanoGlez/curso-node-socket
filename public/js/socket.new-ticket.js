// command to 
var socket = io();

socket.on('connect',  () => {
    console.log('Conectado al servidor');
});

// escuchar
socket.on('disconnect',  () => {
    console.log('Perdimos conexión con el servidor');
});


// Escuchar información
socket.on("currentState",  (data)=> {
  document.getElementById("lblNuevoTicket").innerText = data.lastTicket.msg;
 });

//Al hacer click sobre uel btn de nuevo ticket
document.getElementById("new-ticket")
.addEventListener("click", () => {

    // Enviar información
    socket.emit('newTicket', { user: 'Manzano', msg: 'Solicitud nuevo ticket'  }, 
     (resp) => {

    document.getElementById("lblNuevoTicket").innerText = resp.msg;
       
    });

});


