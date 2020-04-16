var socket = io();

socket.on("connect", () => {
  console.log("Conectado al servidor");
});

// escuchar
socket.on("disconnect", () => {
  console.log("Perdimos conexión con el servidor");
});


// Escuchar información
socket.on("currentState",  (data)=> {

  //Recibimos los ultimos 4 justo despues de conectarnos

    for(let i = 1 ;i <= 4;i++){

      let lf = data.lastFour[i -1];
      
      document.getElementById(`lblTicket${i}`).innerText = `Ticket #${lf.number}`;
      document.getElementById(`lblEscritorio${i}`).innerText = `Escritorio #${lf.desktop}`;

    }

    //Emitir sonido de actualización
     let audio = new Audio('/audio/new-ticket.mp3');

     audio.play();


 });
