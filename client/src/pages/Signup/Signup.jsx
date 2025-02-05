import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import HoverErrorMessage from "../../components/HoverErrorMessage";
import useHandleLoggedUser from "../../hooks/useHandleLoggedUser";
import checkFields from "./checkFields";
import { motion } from "framer-motion";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailFieldState, setEmailFieldState] = useState(false);
  const [nameFieldState, setNameFieldState] = useState(false);
  const [passwordFieldState, setPasswordFieldState] = useState(false);
  const [emailMsg, setEmailMsg] = useState("");
  const [nameMsg, setNameMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [triggerErrorMsg, setTriggerErrorMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useHandleLoggedUser();

  const registerUser = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/signup",
        {
          name: name,
          email: email,
          password: password,
        }
      );
      navigate("/login");
      toast.success(`Welcome ${response.data.name}`);
      localStorage.setItem("username", response.data.name);
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
            Create an Account
          </h2>
          <p className="text-copy-lighter text-sm sm:text-base md:text-lg">
            Sign up now to join us.
          </p>
        </div>

        <form
          className="flex flex-col gap-6 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            if (
              checkFields(
                email,
                name,
                password,
                setEmailFieldState,
                setNameFieldState,
                setPasswordFieldState,
                setEmailMsg,
                setNameMsg,
                setPasswordMsg
              )
            )
              registerUser();
            else setTriggerErrorMsg(true);
          }}
        >
          <div className="flex items-center gap-3 w-full">
            <FaUser className="text-primary text-xl flex-shrink-0" />
            <div className="flex-grow relative">
              <motion.input
                className="w-full p-2.5 rounded-md border-2 border-primary-light text-black placeholder:text-copy-lighter outline-none text-sm sm:text-base"
                whileFocus={{ scale: 1.01, borderColor: "#ed7c3a" }}
                type="name"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {triggerErrorMsg && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  {!nameFieldState && <HoverErrorMessage errorMsg={nameMsg} />}
                  {nameFieldState && (
                    <FaCheckCircle className="text-success text-lg" />
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full">
            <MdEmail className="text-primary text-xl flex-shrink-0" />
            <div className="flex-grow relative">
              <motion.input
                className="w-full p-2.5 rounded-md border-2 border-primary-light text-black placeholder:text-copy-lighter outline-none text-sm sm:text-base"
                type="text"
                placeholder="Email"
                whileFocus={{ scale: 1.01, borderColor: "#ed7c3a" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {triggerErrorMsg && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  {!emailFieldState && (
                    <HoverErrorMessage errorMsg={emailMsg} />
                  )}
                  {emailFieldState && (
                    <FaCheckCircle className="text-success text-lg" />
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full">
            <RiLockPasswordFill className="text-primary text-xl flex-shrink-0" />
            <div className="flex-grow relative">
              <motion.input
                className="w-full p-2.5 rounded-md border-2 border-primary-light text-black placeholder:text-copy-lighter outline-none text-sm sm:text-base"
                type="password"
                placeholder="Password"
                whileFocus={{ scale: 1.01, borderColor: "#ed7c3a" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {triggerErrorMsg && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  {!passwordFieldState && (
                    <HoverErrorMessage errorMsg={passwordMsg} />
                  )}
                  {passwordFieldState && (
                    <FaCheckCircle className="text-success text-lg" />
                  )}
                </div>
              )}
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full bg-primary-dark shadow-bg py-2.5 sm:py-3 px-6 font-Righteous text-shadow-lg text-copy text-lg sm:text-xl rounded-md mt-4"
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                <span>Signing up...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-8">
          <p className="text-xs sm:text-sm text-copy-lighter">
            You already have an account?
          </p>
          <motion.button
            className="text-xs sm:text-sm font-semibold text-secondary-dark border border-secondary-dark px-3 py-1 rounded-md"
            onClick={() => navigate("/login")}
            whileHover={{
              backgroundColor: "#e05f14",
              color: "white",
              scale: 1.02,
            }}
          >
            Login
          </motion.button>
        </div>
      </div>
    </section>
  );
}

export default Signup;
