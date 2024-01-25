import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

function HomeHeading() {
  const navigate = useNavigate();
  return (
    <div className="flex-2 flex flex-col tracking-widest gap-10">
      <motion.h1
        initial={{ x: -500 }}
        animate={{ x: 0 }}
        transition={{ delay: 0 }}
        className="font-Righteous sm:text-9xl md:text-7xl lg:text-8xl  text-shadow-lg text-primary-light"
      >
        Collab
      </motion.h1>

      <motion.h1
        initial={{ x: -500 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2 }}
        className="font-Righteous sm:text-9xl md:text-7xl lg:text-8xl text-shadow-lg text-primary"
      >
        Code
      </motion.h1>

      <motion.h1
        initial={{ x: -500 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.4 }}
        className="font-Righteous  sm:text-9xl md:text-7xl lg:text-8xl text-shadow-lg text-primary-dark"
      >
        Studio
      </motion.h1>

      <motion.button
        onClick={() => {
          navigate("/room");
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-max bg-primary-dark shadow-bg  px-10 py-3 font-Righteous text-shadow-lg text-copy sm:text-lg md:text-2xl lg:text-3xl  rounded-md"
      >
        New Room
      </motion.button>
    </div>
  );
}

export default HomeHeading;
