import React from "react";
import { useState } from "react";
import { MdError } from "react-icons/md";
import { motion } from "framer-motion";

function HoverErrorMessage({ errorMsg }) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, x: -40 }}
      animate={{ scale: 1.1, x: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
    >
      <MdError
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        size={20}
        className="text-error"
      />

      {isHovering && (
        <motion.div className="absolute -top-2 left-8 bg-background z-10 p-1 rounded-md shadow-md">
          <span className="text-[0.7em] text-nowrap text-error text-shadow-md text-center">
            {errorMsg}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

export default HoverErrorMessage;
