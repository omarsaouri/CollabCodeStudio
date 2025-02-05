import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FaFileCode } from "react-icons/fa6";
import TextAnimation from "./TextAnimation";
import { useMediaQuery } from "react-responsive";

function HomeIllustration() {
  const eleRef1 = useRef(null);
  const eleRef2 = useRef(null);
  const [distance, setDistance] = useState(200); // Default distance
  const isSmallScreen = useMediaQuery({ maxWidth: 932 });

  // Memoize animation props
  const animationProps = {
    initial: { x: 0 },
    animate: {
      x: [-50, 0, 50],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "reverse",
      },
    },
  };

  useEffect(() => {
    // Calculate distance once on mount and screen resize
    const calculateDistance = () => {
      if (eleRef1.current && eleRef2.current) {
        const rect1 = eleRef1.current.getBoundingClientRect();
        const rect2 = eleRef2.current.getBoundingClientRect();
        const distance = Math.abs(
          rect1.x + rect1.width / 2 - (rect2.x + rect2.width / 2)
        );
        setDistance(distance);
      }
    };

    // Debounce resize handler
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(calculateDistance, 100);
    };

    calculateDistance();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <figure className="flex-1 flex flex-col items-center gap-10 relative z-20">
      <div className="flex w-full flex-wrap gap-4 justify-center items-center">
        <div
          ref={eleRef1}
          className="bg-foreground sm:w-[200px] md:w-[200px] lg:w-[300px] pt-10 pb-3 px-3 rounded-xl shadow-xl"
        >
          <h2 className="text-xl mb-10 text-primary-light text-center font-bold text-shadow-md">
            Akram Saouri
          </h2>
          <TextAnimation
            delay={0.5}
            theme={tokyoNightStorm}
            distance={distance}
          />
        </div>

        {!isSmallScreen && (
          <motion.div {...animationProps} className="text-primary-light -z-10">
            <FaFileCode size={30} />
          </motion.div>
        )}

        <div
          ref={eleRef2}
          className="bg-foreground sm:w-[200px] md:w-[200px] lg:w-[300px] pt-10 pb-3 px-3 rounded-xl shadow-xl"
        >
          <h2 className="text-xl mb-10 text-secondary-light text-center font-bold text-shadow-md">
            Bill Gates
          </h2>
          <TextAnimation delay={0.8} theme={"dark"} distance={distance} />
        </div>
      </div>

      <figcaption className="flex flex-col gap-7">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="font-Righteous text-center text-primary-light text-shadow-xl text-2xl"
        >
          Live sync coding website!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-Righteous text-center text-copy-lighter text-l"
        >
          Code together, anytime, anywhere - virtual{" "}
          <span className="text-secondary">coding party</span> with friends!
        </motion.p>
      </figcaption>
    </figure>
  );
}

export default HomeIllustration;
