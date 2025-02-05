import toast from "react-hot-toast";
import useAxiosClient from "../../hooks/useAxiosClient";
import { useNavigate } from "react-router-dom";

const roomApiRequests = (roomName, roomId) => {
  const navigate = useNavigate();
  const client = useAxiosClient();

  const joinRoom = async (roomId, noToast) => {
    try {
      // Check if roomId is provided
      if (!roomId || roomId.trim() === "") {
        toast.error("Please provide a valid room ID");
        return;
      }

      const response = await client.get(
        `${import.meta.env.VITE_API_URL}/room/join/${roomId}`
      );
      !noToast && toast.success("Welcome to " + response.data.name);
      navigate(`/room/${response.data.roomId}`);
    } catch (error) {
      // Handle different error cases
      if (!roomId) {
        toast.error("Please enter a room ID");
      } else if (error.response?.status === 404) {
        toast.error("Room not found");
      } else if (error.response?.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Failed to join room. Please try again.");
      }
      navigate("/room");
      return error;
    }
  };

  const createRoom = async (roomName) => {
    try {
      const response = await client.post(
        `${import.meta.env.VITE_API_URL}/room/new`,
        {
          roomName: roomName,
        }
      );
      toast.success("Welcome to " + response.data.name);
      navigate(`/room/${response.data.roomId}`);
    } catch (error) {
      toast.error(error.response?.data || "Failed to create room");
      return error;
    }
  };

  return { joinRoom, createRoom };
};

export default roomApiRequests;
