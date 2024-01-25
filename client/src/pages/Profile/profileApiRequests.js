import toast from "react-hot-toast";
import useAxiosClient from "../../hooks/useAxiosClient";

const profileApiRequests = (userId) => {
  const client = useAxiosClient();
  const patchEmoji = async (emoji) => {
    try {
      const response = await client.patch(
        import.meta.env.VITE_API_URL + "/profile/emoji?userId=" + userId,
        {
          emoji: emoji,
        }
      );

      toast.success("Emoji updated succesfully!");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const patchColor = async (color) => {
    try {
      const response = await client.patch(
        import.meta.env.VITE_API_URL + "/profile/color?userId=" + userId,
        {
          color: color,
        }
      );

      toast.success("Color updated succesfully!");
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  return { patchEmoji, patchColor };
};

export default profileApiRequests;
