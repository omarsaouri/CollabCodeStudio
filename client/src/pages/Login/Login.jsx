import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import useHandleLoggedUser from "../../hooks/useHandleLoggedUser";
import { motion } from "framer-motion";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  useHandleLoggedUser();

  const loginUser = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/login",
        {
          email: email,
          password: password,
        }
      );
      response.data && setCookies("access_token", response.data.access_token);
      localStorage.setItem("username", response.data.user.name);
      localStorage.setItem("emoji", response.data.user.emoji);
      localStorage.setItem("color", response.data.user.color);
      localStorage.setItem("userId", response.data.user._id);
      navigate("/room");
      toast.success("Welcome Back " + response.data.user.name);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <section className="h-screen flex flex-col justify-center">
      <div className="flex flex-col gap-10 items-center justify-center text-white bg-foreground  md:w-full my-10 py-10 px-32 sm:w-96 rounded-lg shadow-lg ">
        <div className="flex flex-col gap-5 justify-center items-center">
          <h2 className="text-primary md:text-4xl sm:text-2xl font-Righteous font-bold text-shadow-l text-center">
            Login Now
          </h2>
          <p className="text-copy-lighter md:text-xl sm:text-xs font-bold text-center">
            Login into your account now
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginUser();
          }}
          className="flex flex-col items-center justify-center gap-10"
        >
          <div className="flex gap-2 items-center">
            <MdEmail className="text-primary size-6" />
            <motion.input
              className="p-2 md:w-72 sm:w-52 rounded-sm border-2 border-primary-light text-black placeholder:text-copy-lighter outline-none "
              whileFocus={{ scale: 1.01, border: "2px solid #ed7c3a" }}
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <RiLockPasswordFill className="text-primary size-6" />
            <motion.input
              className="p-2 md:w-72 sm:w-52 rounded-sm border-2 border-primary-light text-black placeholder:text-copy-lighter outline-none "
              whileFocus={{ scale: 1.01, border: "2px solid #ed7c3a" }}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <motion.button
            type="submit"
            className="bg-primary shadow-bg py-3 px-6 font-Righteous text-shadow-lg text-copy text-xl rounded-md mt-2"
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 1.05 }}
          >
            Login
          </motion.button>
        </form>

        <div className="flex gap-2 items-center">
          <p className="text-xs text-copy-lighter text-center">
            You dont have an account yet ?
          </p>
          <motion.button
            className=" sm:w-36 md:w-20 text-sm font-semibold text-secondary-dark border border-secondary-dark p-1 rounded-sm"
            onClick={() => {
              navigate("/signup");
            }}
            whileHover={{
              backgroundColor: "#e05f14",
              color: "white",
              scale: 1.1,
            }}
          >
            sign up
          </motion.button>
        </div>
      </div>
    </section>
  );
}
export default Login;
