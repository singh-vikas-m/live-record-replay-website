const { Server } = require("socket.io");
const { createServer } = require("http");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.emit("hello", { greeting: "Hello Vikas" });
  console.log("connected", socket.id);

  //join a room instructed by client
  socket.on("new-user", function (room) {
    console.log(room + " created...");
    socket.join(room);
  });

  //emit recevied message to specified room
  socket.on("send-event", function (data) {
    console.log(data.room + " created...");
    io.to(data.room).emit("event", data.event);
  });

  // receive event from one client and send to other
  // socket.on("event", (data) => {
  //   //console.log(data);
  //   socket.broadcast.emit("event", data);
  // });
});

io.listen(3000);
console.log("socket io server started......");
