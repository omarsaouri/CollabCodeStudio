const dotenv = require("dotenv").config();
const port = process.env.PORT;

const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

//socket server init
const { Server } = require("socket.io");
const { createServer } = require("http");
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://collab-code-studio-ccs.onrender.com",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

// database connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Database connection failed", error);
  });

app.use(express.json());

// cookies middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/", require("./src/routes/auth/authRoutes"));
app.use("/room", require("./src/routes/room/roomRoutes"));
app.use("/profile", require("./src/routes/profile/profileRoutes"));

const userSocketMap = {};
const getAllConnectedUsers = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId].username,
        emoji: userSocketMap[socketId].emoji,
        color: userSocketMap[socketId].color,
      };
    }
  );
};

io.on("connection", (socket) => {
  //JOIN

  socket.on("JOIN", ({ roomId, username, color, emoji }) => {
    userSocketMap[socket.id] = { username, emoji, color };

    socket.join(roomId);
    console.log(socket.id, "joined ", roomId);

    const users = getAllConnectedUsers(roomId);

    users.forEach(({ socketId }) => {
      io.to(socketId).emit("JOINED", {
        users,
        username,
        color,
        emoji,
        socketId: socket.id,
      });
    });
  });
  //CODE_CHANGE
  socket.on("CODE_CHANGE", ({ roomId, code }) => {
    socket.in(roomId).emit("CODE_CHANGE", { code });
  });
  //SYNC_CODE
  socket.on("SYNC_CODE", ({ roomId, value }) => {
    socket.in(roomId).emit("UPDATE_CODE", value);
  });
  // Disconnect
  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit("DISCONNECTED", {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

//establish server connection
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
