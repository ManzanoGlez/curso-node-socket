const {io} = require('../server')

io.on("connection", (client) => {
  console.log("Cliente conectado");

  //Enviar mensaje a cliente 1 - 1
  client.emit("sendMsg", {
    msg: "Hola bb desde el server",
  });

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  client.on("event", (data) => {
    console.log("Cliente evento");
  });

  //Escuchando a cliente
  client.on("sendMsg", (data, callback) => {

    //Contestando con otro emit
        // client.emit("sendMsg",{
        //     msg:"Soy el servidor"
        // });

        //Contestando con broadtcast a todo el mundo menos al mismo
        client.broadcast.emit("sendMsg",{
            msg:data.msg
        });


        console.log(data.msg);

        //contestando con el callback
            // callback({
            //   msg: "OK",
            // });
        });
});
