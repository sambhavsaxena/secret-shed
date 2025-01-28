import React from "react";
import MainScreen from "../components/MainScreen";

const About = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MainScreen title="About the developer">
        <p style={{ marginTop: "20%" }}>
          Hi, I'm Sambhav Saxena.
          <br /> <br />
          I troll the internet on a daily basis.
          <br /> <br />
          As a student, I've been working on several web projects, and this is one of them.
          <br /> <br />
          Sometimes I team up and play Valorant, or look at the stars, or read.
          <br /> <br />
          Other times, I document life.
        </p>
        <br />
        <h6>
          Read my blogs{" "}
          <a
            href="https://interpreted.vercel.app/blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </h6>
      </MainScreen>
    </div>
  );
};

export default About;
