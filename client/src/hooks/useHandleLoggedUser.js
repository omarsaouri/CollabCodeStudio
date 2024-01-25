import { useEffect } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useHandleLoggedUser = () => {
  const [cookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.access_token) {
      navigate("/");
    }
  }, []);
};

export default useHandleLoggedUser;
