import toast from "react-hot-toast";
import useAxiosClient from "../../hooks/useAxiosClient";
import { useNavigate } from "react-router-dom";

const roomApiRequests = (roomName, roomId) => {
  const navigate = useNavigate();
  const client = useAxiosClient();
  const joinRoom = async (roomId, noToast) => {
    try {
      const response = await client.get(
        `${import.meta.env.VITE_API_URL}/room/join/${roomId}`
      );
      !noToast && toast.success("Welcome to " + response.data.name);
      navigate(`/room/${response.data.roomId}`);
    } catch (error) {
      toast.error(error.response.data);
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
      toast.error(error.response.data);
      return error;
    }
  };

  return { joinRoom, createRoom };
};
export default roomApiRequests;
