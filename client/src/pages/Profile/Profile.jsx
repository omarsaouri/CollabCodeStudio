import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoIosColorFill } from "react-icons/io";
import { MdEmojiEmotions, MdLogout } from "react-icons/md";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../../components/ProfileCard.jsx";
import useAuth from "../../hooks/useAuth.js";
import useAxiosClient from "../../hooks/useAxiosClient.js";
import ColorModal from "./ColorModal.jsx";
import EmojiModal from "./EmojiModal.jsx";

function Profile() {
  const userId = localStorage.userId;
  const { user, isUserLoggedIn } = useAuth(true, userId);
  const client = useAxiosClient();
  const [userEmoji, setUserEmoji] = useState();
  const [userColor, setUserColor] = useState();
  const [emojiModalIsOpen, setEmojiModalIsOpen] = useState(false);
  const [colorModalIsOpen, setColorModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies();

  const openEmojiModal = () => {
    setEmojiModalIsOpen(true);
  };
  const openColorModal = () => {
    setColorModalIsOpen(true);
  };
  useEffect(() => {
    user.emoji && setUserEmoji(user.emoji);
  }, [user.emoji]);

  useEffect(() => {
    user.color && setUserColor(user.color);
  }, [user.color]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("emoji");
    localStorage.removeItem("color");
    setCookies("access_token", null);
    navigate("/");
  };

  const btnMotion = {
    hover: {
      scale: 1.1,
      boxShadow: "none",
    },
  };

  const btnTextMotion = {
    rest: {
      x: 0,
    },
    hover: {
      x: -17,
      transition: {
        duration: 0.4,
        type: "spring",
        ease: "easeIn",
      },
    },
  };

  const btnIconMotion = {
    rest: {
      opacity: 1,
    },
    hover: {
      opacity: 0,
    },
  };

  return (
    <motion.section
      className="text-white  h-screen  items-center pt-20"
      initial={{ y: 400 }}
      animate={{ y: 0 }}
    >
      <div className=" bg-foreground flex flex-col items-center p-20 gap-5 rounded-xl shadow-xl border-2 border-primary-dark">
        <ProfileCard emoji={userEmoji} color={userColor} />
        <h2 className="text-4xl font-Righteous text-primary text-shadow-lg tracking-wider">
          {user.name}
        </h2>
        <p className="text-xs font-semibold text-copy-lighter">{user.email}</p>
        <div className="flex gap-10 mt-10">
          <motion.button
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.9 }}
            animate="rest"
            onClick={openEmojiModal}
            variants={btnMotion}
            className="flex items-center gap-2 bg-primary rounded-lg shadow-md"
          >
            <motion.div variants={btnIconMotion}>
              <MdEmojiEmotions
                className="bg-primary-dark p-1 rounded-l-lg border-r-2 border-primary-light"
                size={40}
              />
            </motion.div>

            <motion.span
              variants={btnTextMotion}
              className="pr-2 font-bold text-shadow-md text-copy"
            >
              Modify
            </motion.span>
          </motion.button>
          <EmojiModal
            userId={userId}
            emojiModalIsOpen={emojiModalIsOpen}
            setEmojiModalIsOpen={setEmojiModalIsOpen}
            setUserEmoji={setUserEmoji}
          />

          <motion.button
            onClick={openColorModal}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.9 }}
            animate="rest"
            variants={btnMotion}
            className="flex items-center gap-2 bg-secondary rounded-lg shadow-md"
          >
            <motion.div variants={btnIconMotion}>
              <IoIosColorFill
                className="bg-secondary-dark p-1 rounded-l-lg border-r-2 border-secondary-light"
                size={40}
              />
            </motion.div>

            <motion.span
              variants={btnTextMotion}
              className="pr-2 font-bold text-shadow-md text-copy"
            >
              Modify
            </motion.span>
          </motion.button>

          <ColorModal
            userId={userId}
            userColor={userColor}
            setUserColor={setUserColor}
            colorModalIsOpen={colorModalIsOpen}
            setColorModalIsOpen={setColorModalIsOpen}
          />

          <motion.button
            onClick={handleLogout}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.9 }}
            animate="rest"
            variants={btnMotion}
            className="flex items-center gap-2 bg-error rounded-lg shadow-md"
          >
            <motion.div variants={btnIconMotion}>
              <MdLogout
                className="bg-error p-1 rounded-l-lg border-r-2 border-copy-lighter"
                size={40}
              />
            </motion.div>

            <motion.span
              variants={btnTextMotion}
              className="pr-2 font-bold text-shadow-md text-copy"
            >
              Logout
            </motion.span>
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}

export default Profile;
