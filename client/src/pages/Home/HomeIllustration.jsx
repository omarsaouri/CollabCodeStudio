import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FaFileCode } from "react-icons/fa6";
import TextAnimation from "./TextAnimation";
import { useMediaQuery } from "react-responsive";

function HomeIllustration() {
  const eleRef1 = useRef(null);
  const eleRef2 = useRef(null);
  const [distance, setDistance] = useState();
  const isSmallScreen = useMediaQuery({ maxWidth: 932 });

  const animationPropsX = {
    initial: { x: -100 },
    animate: {
      x: [-distance / 2, 0, distance / 2],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
        repeatType: "reverse",
        repeatDelay: 1,
      },
    },
  };

  useEffect(() => {
    const calculateDistance = () => {
      if (eleRef1.current && eleRef2.current) {
        const rect1 = eleRef1.current.getBoundingClientRect();
        const rect2 = eleRef2.current.getBoundingClientRect();

        const distanceX =
          rect1.x + rect1.width / 2 - (rect2.x + rect2.width / 2);
        const distanceY =
          rect1.y + rect1.height / 2 - (rect2.y + rect2.height / 2);

        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        setDistance(distance);
      }
    };
    calculateDistance();

    const handleResize = () => {
      calculateDistance();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [distance]);

  return (
    <figure className="flex-1 flex flex-col  items-center  gap-10 relative z-20">
      <div className="flex w-full  flex-wrap gap-4 justify-center items-center">
        <div
          ref={eleRef1}
          className="bg-foreground sm:w-[200px] md:w-[200px] lg:w-[300px] pt-10 pb-3 px-3 rounded-xl shadow-xl "
        >
          <h2 className="text-xl mb-10 text-primary-light text-center font-bold text-shadow-md">
            Akram Saouri
          </h2>
          <TextAnimation
            delay={1}
            theme={tokyoNightStorm}
            distance={distance}
          />
        </div>
        {!isSmallScreen ? (
          <motion.div
            initial={{ x: -100 }}
            animate={{
              x: [-distance / 2, 0, distance / 2],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                repeatType: "reverse",
                repeatDelay: 1,
              },
            }}
            className="-z-10"
          >
            <FaFileCode size={30} className="text-primary-light" />
          </motion.div>
        ) : null}
        <div
          ref={eleRef2}
          className="bg-foreground sm:w-[200px] md:w-[200px] lg:w-[300px] pt-10 pb-3 px-3  rounded-xl shadow-xl"
        >
          <h2 className="text-xl mb-10 text-secondary-light text-center font-bold text-shadow-md">
            Bill Gates
          </h2>
          <TextAnimation delay={1.3} theme={"dark"} distance={distance} />
        </div>
      </div>

      <figcaption className="flex flex-col gap-7">
        <h3 className="font-Righteous text-center text-primary-light text-shadow-xl text-2xl">
          Live sync coding website!
        </h3>
        <p className="font-Righteous text-center text-copy-lighter text-l">
          Code together, anytime, anywhere - virtual{" "}
          <span className="font-Righteous text-center text-secondary text-l">
            coding party
          </span>{" "}
          with friends!
        </p>
      </figcaption>
    </figure>
  );
}

export default HomeIllustration;
