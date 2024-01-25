const { v4: uuidv4 } = require("uuid");
const Room = require("../../models/room");

const newRoom = async (req, res) => {
  const { roomName } = req.body;
  if (!roomName) return res.status(400).send("Room name required.");
  const room = {
    roomId: uuidv4(),
    name: roomName,
  };
  await Room.create(room);
  res.json(room);
};

const joinRoom = async (req, res) => {
  const { roomId } = req.params;
  let foundRoom = await Room.findOne({ roomId });
  if (!foundRoom) return res.status(400).send("No room found.");
  res.json(foundRoom);
};

module.exports = {
  newRoom,
  joinRoom,
};
