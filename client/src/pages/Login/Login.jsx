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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useHandleLoggedUser();

  const loginUser = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 py-8">
      <div className="w-full max-w-md bg-foreground rounded-lg shadow-lg p-6 sm:p-8">
        <div className="flex flex-col gap-4 text-center mb-8">
          <h2 className="text-primary text-2xl sm:text-3xl md:text-4xl font-Righteous font-bold text-shadow-lg">
            Login Now
          </h2>
          <p className="text-copy-lighter text-sm sm:text-base md:text-lg">
            Login into your account now
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginUser();
          }}
          className="flex flex-col gap-6 w-full"
        >
          <div className="flex items-center gap-3 w-full">
            <MdEmail className="text-primary text-xl flex-shrink-0" />
            <div className="flex-grow">
              <motion.input
                className="w-full p-2.5 rounded-md border-2 border-primary-light text-black placeholder:text-copy-lighter outline-none text-sm sm:text-base"
                whileFocus={{ scale: 1.01, borderColor: "#ed7c3a" }}
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full">
            <RiLockPasswordFill className="text-primary text-xl flex-shrink-0" />
            <div className="flex-grow">
              <motion.input
                className="w-full p-2.5 rounded-md border-2 border-primary-light text-black placeholder:text-copy-lighter outline-none text-sm sm:text-base"
                whileFocus={{ scale: 1.01, borderColor: "#ed7c3a" }}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full bg-primary-dark shadow-bg py-2.5 sm:py-3 px-6 font-Righteous text-shadow-lg text-copy text-lg sm:text-xl rounded-md mt-4 relative"
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                <span>Logging in...</span>
              </div>
            ) : (
              "Login"
            )}
          </motion.button>
        </form>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-8 whitespace-nowrap">
          <p className="text-xs sm:text-sm text-copy-lighter">
            You don't have an account yet?
          </p>
          <motion.button
            className="text-xs sm:text-sm font-semibold text-secondary-dark border border-secondary-dark px-4 py-1.5 rounded-md"
            onClick={() => navigate("/signup")}
            whileHover={{
              backgroundColor: "#e05f14",
              color: "white",
              scale: 1.02,
            }}
          >
            Sign up
          </motion.button>
        </div>
      </div>
    </section>
  );
}
export default Login;
