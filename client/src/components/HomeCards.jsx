import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function HomeCards({ headingText, paragraphText, icon: Icon }) {
  return (
    <div className="flex flex-col items-center gap-4 p-6 w-full max-w-sm bg-gradient-to-br from-background/50 to-background/80 backdrop-blur-sm border border-primary/10 rounded-xl shadow-lg">
      <div className="p-3 rounded-lg bg-primary/10">
        <Icon className="text-primary-light w-8 h-8" />
      </div>
      <h3 className="font-Righteous text-2xl text-primary-light text-center">
        {headingText}
      </h3>
      <p className="font-Righteous text-center text-copy-lighter text-sm leading-relaxed">
        {paragraphText}
      </p>
    </div>
  );
}

export default HomeCards;
