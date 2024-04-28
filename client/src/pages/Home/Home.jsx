import React from "react";
import HomeHeading from "./HomeHeading.jsx";
import HomeIllustration from "./HomeIllustration.jsx";
import HomeInfos from "./HomeInfos.jsx";

function Home() {
  return (
    <>
      <section className="relative w-full flex-col p-1 overflow-hidden bg-background ">
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
