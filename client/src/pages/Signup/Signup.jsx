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
  const navigate = useNavigate();
  useHandleLoggedUser();

  const registerUser = async () => {
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
      console.log(error.response.data);
    }
  };

  return (
    <section className="h-screen flex flex-col justify-center">
      <div className="flex flex-col gap-10 items-center justify-center text-white bg-foreground  md:w-full my-10 py-10 px-32 sm:w-96 rounded-lg shadow-lg ">
        <div className="flex flex-col gap-5 justify-center items-center">
          <h2 className="text-primary md:text-4xl sm:text-2xl font-Righteous font-bold text-shadow-l text-center">
            Create an Account
          </h2>
          <p className="text-copy-lighter md:text-xl sm:text-sm font-bold text-center">
            Sign up now to join us.
          </p>
        </div>

        <form
          className="flex flex-col items-center justify-center gap-10"
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
          <div className="flex gap-2 items-center">
            <FaUser className="text-primary size-6" />
            <motion.input
              className="p-2 md:w-72 sm:w-52 rounded-sm border-2 border-primary-light text-black placeholder:text-copy-lighter outline-none "
              whileFocus={{ scale: 1.01, border: "2px solid #ed7c3a" }}
              type="name"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {triggerErrorMsg && (
              <>
                {!nameFieldState && <HoverErrorMessage errorMsg={nameMsg} />}
                {nameFieldState && (
                  <FaCheckCircle size={20} className="text-success" />
                )}
              </>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <MdEmail className="text-primary size-6 " />
            <motion.input
              className="p-2 md:w-72 sm:w-52 rounded-sm border-2 border-primary-light text-black placeholder:text-copy-lighter outline-none "
              type="text"
              placeholder="Email"
              whileFocus={{ scale: 1.01, border: "2px solid #ed7c3a" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {triggerErrorMsg && (
              <>
                {!emailFieldState && <HoverErrorMessage errorMsg={emailMsg} />}
                {emailFieldState && (
                  <FaCheckCircle size={20} className="text-success" />
                )}
              </>
            )}
          </div>

          <div className="flex gap-2 items-center">
            <RiLockPasswordFill className="text-primary size-6" />
            <motion.input
              className="p-2 md:w-72 sm:w-52 rounded-sm border-2 border-primary-light text-black placeholder:text-copy-lighter outline-none "
              type="password"
              placeholder="Password"
              whileFocus={{ scale: 1.01, border: "2px solid #ed7c3a" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {triggerErrorMsg && (
              <>
                {!passwordFieldState && (
                  <HoverErrorMessage errorMsg={passwordMsg} />
                )}
                {passwordFieldState && (
                  <FaCheckCircle size={20} className="text-success" />
                )}
              </>
            )}
          </div>

          <motion.button
            type="submit"
            className="bg-primary-dark shadow-bg py-3 px-6 font-Righteous text-shadow-lg text-copy text-xl rounded-md mt-2"
            whileHover={{ scale: 0.9 }}
            whileTap={{ scale: 1.05 }}
          >
            Sign Up
          </motion.button>
        </form>

        <div className="flex gap-2 items-center">
          <p className="text-xs text-copy-lighter text-center">
            You already have an account ?
          </p>
          <motion.button
            className="text-sm font-semibold text-secondary-dark border border-secondary-dark p-1 rounded-sm"
            onClick={() => {
              navigate("/login");
            }}
            whileHover={{
              backgroundColor: "#e05f14",
              color: "white",
              scale: 1.1,
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
