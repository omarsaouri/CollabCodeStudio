import toast from "react-hot-toast";

const initializeSocket = async (socket, id, setUsers) => {
  function removeDuplicates(users, key) {
    const uniqueUsers = users.reduce((accumulator, currentUser) => {
      const existingUser = accumulator.find(
        (user) => user[key] === currentUser[key]
      );

      if (!existingUser) {
        accumulator.push(currentUser);
      }

      return accumulator;
    }, []);

    return uniqueUsers;
  }

  try {
    socket.on("connect", () => {
      console.log("Connected to the server.");
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    socket.on("connect_failed", (err) => {
      console.error("Connection failed:", err);
    });

    socket.emit("JOIN", {
      roomId: id,
      username: localStorage.username,
      emoji: localStorage.emoji,
      color: localStorage.color,
    });

    socket.on("JOINED", ({ users, username, socketId }) => {
      if (username !== localStorage.username && username) {
        toast(username + " joined.", {
          icon: "👏",
          id: "unique",
        });
      }
      const uniqueUsers = removeDuplicates(users, "username");
      setUsers(uniqueUsers);
    });

    socket.on("DISCONNECTED", ({ socketId, username }) => {
      toast(username.username + " left.", {
        icon: "👏",
        id: "unique",
      });

      setUsers((prev) => {
        return prev.filter((user) => user.socketId !== socketId);
      });
    });
  } catch (error) {
    console.error("Socket initialization error:", error);
  }
};

export default initializeSocket;
