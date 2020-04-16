const {io} = require('../server')
const { TicketControl } = require('./classes/ticket-control');

const ticketControl = new TicketControl();


io.on("connection", (client) => {
  console.log("Cliente conectado");

  //Enviar el estado actual
  client.emit("currentState",{
    lastTicket:ticketControl.getLastTicket(),
    lastFour:ticketControl.getLastFour()
  });

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  client.on("event", (data) => {
    console.log("Cliente evento");
  });

  //Escuchando a cliente
  client.on("newTicket", (data, callback) => {

      let newTicket = ticketControl.nextTicket();

        // contestando con el callback
             callback(newTicket);
        });


  client.on("attendTicket", (data, callback) => {

          if(!data.desktop){
              callback({
                status:false,
                msg:"El escritorio es obligatorio"
              });
          }

          let attendTicket = ticketControl.attendTicket(data.desktop);

          if (attendTicket.hasOwnProperty('msg')) {
                callback({
                  status: false,
                  msg: attendTicket.msg,
                });
          }else{
                callback({
                  status: true,
                  attendTicket,
                });
          }


     client.broadcast.emit("currentState", {
       lasTicket: ticketControl.getLastTicket(),
       lastFour: ticketControl.getLastFour(),
     });


  });   


});
