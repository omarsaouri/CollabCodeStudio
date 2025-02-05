import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

function HomeHeading() {
  const navigate = useNavigate();
  return (
    <div className="flex-2 flex flex-row lg:flex-col items-center lg:items-start tracking-widest gap-2 sm:gap-4 lg:gap-8 w-full px-4 sm:px-0">
      <motion.h1
        initial={{ x: -500 }}
        animate={{ x: 0 }}
        transition={{ delay: 0 }}
        className="font-Righteous text-3xl sm:text-4xl lg:text-8xl text-shadow-lg text-primary-light text-center lg:text-left"
      >
        Collab
      </motion.h1>

      <motion.h1
        initial={{ x: -500 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2 }}
        className="font-Righteous text-3xl sm:text-4xl lg:text-8xl text-shadow-lg text-primary text-center lg:text-left"
      >
        Code
      </motion.h1>

      <motion.h1
        initial={{ x: -500 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.4 }}
        className="font-Righteous text-3xl sm:text-4xl lg:text-8xl text-shadow-lg text-primary-dark text-center lg:text-left"
      >
        Studio
      </motion.h1>
    </div>
  );
}

export default HomeHeading;
