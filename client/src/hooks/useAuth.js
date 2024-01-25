import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosClient from "./useAxiosClient";

const useAuth = (doFetchProfile, userId) => {
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const client = useAxiosClient();
  const [user, setUser] = useState({});
  let timeoutId;

  const checkIsUserLoggedIn = () => {
    return cookies.access_token ? true : false;
  };

  const isUserLoggedIn = checkIsUserLoggedIn();
  const handleUserNotLoggedIn = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      toast.error("Must Login In first !");
      navigate("/login");
    }, 0);
  };

  const fetchProfile = async () => {
    try {
      const response = await client.get(
        import.meta.env.VITE_API_URL + "/profile",
        {
          params: {
            userId: userId,
          },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (doFetchProfile)
      isUserLoggedIn ? fetchProfile() : handleUserNotLoggedIn();
    else !isUserLoggedIn && handleUserNotLoggedIn();
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return { isUserLoggedIn, user };
};

export default useAuth;
