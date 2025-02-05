import React, { useState, useEffect } from "react";
import HomeHeading from "./HomeHeading.jsx";
import HomeIllustration from "./HomeIllustration.jsx";
import HomeInfos from "./HomeInfos.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        // Create an array of loading promises
        const loadingTasks = [
          // Simulate component loading times
          new Promise((resolve) => setTimeout(resolve, 200)), // Base delay

          // Check if fonts are loaded
          document.fonts.ready,

          // Add image loading checks if you have any
          ...Array.from(document.images).map((img) => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve, reject) => {
              img.addEventListener("load", resolve);
              img.addEventListener("error", reject);
            });
          }),
        ];

        // Update progress as each task completes
        const total = loadingTasks.length;
        let completed = 0;

        await Promise.all(
          loadingTasks.map((task) =>
            task.then(() => {
              completed++;
              setLoadingProgress((completed / total) * 100);
            })
          )
        );

        // Add a small delay to ensure smooth transition
        await new Promise((resolve) => setTimeout(resolve, 300));

        setIsLoading(false);
      } catch (error) {
        console.error("Error loading assets:", error);
        setIsLoading(false); // Fallback to show content even if loading fails
      }
    };

    loadAssets();
  }, []);

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-background"
        >
          <div className="font-Righteous text-3xl text-primary-light">
            Loading...
          </div>
          <div className="w-48 h-2 bg-background/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary-light rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <section className="relative w-full flex-col p-1 overflow-hidden bg-background">
            <article className="container mx-auto flex flex-col lg:flex-row justify-between items-center w-full px-4 sm:px-6 py-4 sm:py-5 gap-8 md:gap-16 relative z-20">
              {/* Mobile Description */}
              <div className="lg:hidden flex flex-col w-full text-copy gap-6 p-6 rounded-xl bg-gradient-to-br from-background/50 to-background/80 backdrop-blur-sm border border-primary/10 shadow-xl">
                <motion.h2
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl sm:text-3xl font-Righteous text-center text-primary-light text-shadow-lg"
                >
                  Code Together, Create Together
                </motion.h2>
                <motion.p
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="font-Righteous text-base sm:text-lg text-center leading-relaxed tracking-wide text-copy-lighter text-shadow-sm"
                >
                  Experience{" "}
                  <span className="font-Righteous text-primary-light">
                    real-time collaboration
                  </span>{" "}
                  in a modern development environment. Share and{" "}
                  <span className="font-Righteous text-primary">code</span>{" "}
                  amazing projects with developers{" "}
                  <span className="font-Righteous text-secondary-light">
                    worldwide
                  </span>
                  .
                </motion.p>
                <motion.button
                  onClick={() => navigate("/room")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-max mx-auto bg-primary-dark shadow-bg px-5 py-2 font-Righteous text-shadow-lg text-copy text-lg sm:text-xl rounded-md hover:bg-primary-dark/90 transition-colors"
                >
                  Start Coding
                </motion.button>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:block lg:w-1/2">
                <HomeHeading />
              </div>

              <div className="hidden lg:flex lg:w-1/2 text-copy flex-col gap-8 p-6 rounded-xl bg-gradient-to-br from-background/50 to-background/80 backdrop-blur-sm border border-primary/10 shadow-xl">
                <motion.h2
                  initial={{ x: 500 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-Righteous text-center lg:text-left text-primary-light text-shadow-lg"
                >
                  Code Together, Create Together
                </motion.h2>
                <motion.p
                  initial={{ x: 500 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-Righteous text-lg sm:text-xl md:text-2xl text-center lg:text-left leading-relaxed tracking-wide text-copy-lighter text-shadow-sm"
                >
                  Experience{" "}
                  <span className="text-primary-light">
                    real-time collaboration
                  </span>{" "}
                  in a modern development environment. Share and{" "}
                  <span className="text-primary">code</span> amazing projects
                  with developers{" "}
                  <span className="text-secondary-light">worldwide</span>.
                </motion.p>
                <motion.button
                  onClick={() => navigate("/room")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-max bg-primary-dark shadow-bg px-8 py-3 font-Righteous text-shadow-lg text-copy text-2xl rounded-md hover:bg-primary-dark/90 transition-colors"
                >
                  Start Coding
                </motion.button>
              </div>
            </article>

            <article className="container mx-auto mt-6 mb-6 sm:mt-8 sm:mb-8">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="w-full flex justify-center"
              >
                <HomeIllustration />
              </motion.div>
            </article>
          </section>
          <section className="bg-background w-full">
            <HomeInfos />
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Home;
