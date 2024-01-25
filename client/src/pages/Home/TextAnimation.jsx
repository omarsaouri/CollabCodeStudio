import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";

function TextAnimation({ delay, theme, distance }) {
  const texts = [
    "console.log('Hello');",
    "const x = 69;",
    "const msg = 'Fun!';",
    "const happy = true;",
    "tired ? work() : work()",
    "// Happy coding!",
  ];

  const textIndex = useMotionValue(0);
  const baseText = useTransform(textIndex, (latest) => texts[latest] || "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.get().slice(0, latest)
  );
  const updatedThisRound = useMotionValue(true);
  const [text, setText] = useState("");

  useEffect(() => {
    const animation = animate(count, 60, {
      type: "tween",
      delay: delay,
      duration: 1,
      ease: "easeIn",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 1,
      onUpdate(latest) {
        if (updatedThisRound.get() === true && latest > 0) {
          updatedThisRound.set(false);
        } else if (updatedThisRound.get() === false && latest === 0) {
          if (textIndex.get() === texts.length - 1) {
            textIndex.set(0);
          } else {
            textIndex.set(textIndex.get() + 1);
          }
          updatedThisRound.set(true);
        }
        const currentText = baseText.get().slice(0, Math.round(latest));
        setText(currentText);
      },
    });

    return () => {
      animation.stop();
    };
  }, []);

  return (
    <motion.div className="flex w-full select-none items-center justify-center">
      <CodeMirror
        value={text}
        height="150px"
        className="sm:w-[200px] md:w-[200px] lg:w-[300px]"
        autoFocus={false}
        readOnly={true}
        extensions={javascript()}
        theme={theme}
      />
    </motion.div>
  );
}

export default TextAnimation;
