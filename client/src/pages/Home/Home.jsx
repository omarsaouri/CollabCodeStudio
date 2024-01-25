import React from "react";
import { BoxesContainer } from "../../components/BoxesContainer.jsx";
import HomeHeading from "./HomeHeading.jsx";
import HomeIllustration from "./HomeIllustration.jsx";
import HomeInfos from "./HomeInfos.jsx";

function Home() {
  return (
    <>
      <section className="relative w-full flex-col p-1 overflow-hidden bg-background ">
        <div className="absolute inset-0 w-full h-full bg-background z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <BoxesContainer />
        <article className="flex flex-wrap flex-row w-full px-6 py-5 gap-52 relative z-20">
          <HomeHeading />
          <HomeIllustration />
        </article>
      </section>
      <section className="bg-background">
        <HomeInfos />
      </section>
    </>
  );
}

export default Home;
