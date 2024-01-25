import { useCookies } from "react-cookie";
import axios from "axios";

const useAxiosClient = () => {
  const [cookies] = useCookies(["access_token"]);

  return axios.create({
    headers: {
      Authorization: "Bearer " + cookies.access_token,
    },
  });
};

export default useAxiosClient;
