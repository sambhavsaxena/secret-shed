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
          I code and create things for the people.
          <br /> <br />
          As a student, I've been working on several web projects, of both
          personal and community scope.
          <br /> <br />
          Sometimes I team up and play Valorant, or look at the stars and think
          about humanity's dawn and dusk.
          <br /> <br />
          Other times, I play Chess take photos of natural sceneries.
        </p>
        <br />
        <h6>
          Checkout more about me{" "}
          <a
            href="https://interpreted.vercel.app"
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
