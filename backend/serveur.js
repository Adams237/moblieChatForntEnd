const http = require("http");
const server = http.createServer();
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("Un utilisateur est connecté");

  socket.on("locationUpdate", (data) => {
    console.log("Nouvelle position reçue :", data);
    // Faites ce que vous voulez avec les données de localisation ici
  });

  socket.on("disconnect", () => {
    console.log("Utilisateur déconnecté");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Serveur Socket.IO écoutant sur le port ${PORT}`);
});
