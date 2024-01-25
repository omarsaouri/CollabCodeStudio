import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function HomeCards({ headingText, paragraphText, icon }) {
  const Icon = icon;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
  );

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative lg:h-96 lg:w-72 md:h-72 md:w-52 sm:h-52 sm:w-48 bg-gradient-to-br mb-20 from-primary-light via-primary-light to-primary-dark  rounded-xl"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute lg:inset-4 md:inset-2  sm:inset-1 flex flex-col justify-between p-10 items-center  rounded-xl text-copy bg-foreground shadow-lg"
      >
        <Icon className="text-primary text-shadow-2xl lg:size-20 sm:size-10" />
        <h3 className="font-Righteous text-primary-light sm:text-xl md:text-2xl lg:text-4xl text-shadow-lg text-center">
          {headingText}
        </h3>
        <p className="text-center sm:text-[7px] sm:hidden md:inline md:text-xs lg:inline lg:text-sm text-copy-lighter">
          {paragraphText}
        </p>
      </div>
    </motion.div>
  );
}

export default HomeCards;
