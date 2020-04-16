var socket = io();

//escuchar sucesos especiales
socket.on("connect", function () {
  console.log("Conectado al servidor");
});

socket.on("disconnect", function () {
  console.log("Conexión perdida con el servidor");
});

//emit =  enviar informacion al servidor
socket.emit(
  "sendMsg",
  {
    msg: "Hola bb desde cliente",
  },
  (resp) => {
    console.log(resp.msg);
  }
);

//Escuchando a servidor
socket.on("sendMsg", (data) => {
  console.log(data.msg);
});
