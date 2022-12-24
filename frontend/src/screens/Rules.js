import React from "react";
import MainScreen from "../components/MainScreen";
import { Card } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

const Rules = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MainScreen title="Rules for content markdown">
        <br />
        <br />
        <Card.Body>
          <ReactMarkdown>
            1) (`#`) to define the font size. More hashtags makes font size
            smaller. Used like this: `## Heading`.
          </ReactMarkdown>
          <ReactMarkdown>
            2) (`*`) to define the font weight. Enclose the text in asterisks to
            make it bold like so: `** bold **`.
          </ReactMarkdown>
          <ReactMarkdown>
            3) To add links, write the link info like so: `[link title
            text](www.thelinkaddress.com)`.
          </ReactMarkdown>
          <ReactMarkdown>
            4) To add images, start with an exclamation mark `!`, and add the
            image url instead (see point 3).
          </ReactMarkdown>
          <ReactMarkdown>
            5) Use single asterisk for italics, double for bold, as shown :
            (`*italic*`) and (`**bold**`).
          </ReactMarkdown>
          <ReactMarkdown>
            6) Use (`&gt;`) for writing a block-quote, while (`*** bold-italics
            ***`) for italicizing.
          </ReactMarkdown>
          <ReactMarkdown>
            7) Use hyphen (`-`) for unordered lists, nested hyphens will create
            a nested list.
          </ReactMarkdown>
          <ReactMarkdown>
            8) For horizontal lines, use hyphens like this: (`---`), which can
            be replaced by underscores (`___`).
          </ReactMarkdown>
        </Card.Body>
        <br />
        Consider visiting{" "}
        <a
          href="https://www.markdownguide.org/basic-syntax"
          rel="noreferrer noopener"
          target="_blank"
        >
          this
        </a>{" "}
        page for more info.
      </MainScreen>
    </div>
  );
};

export default Rules;
