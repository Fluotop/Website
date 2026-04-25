import { useEffect, useState } from "react";
import "./HeroPanel.css";

const LINES = [
  "DATA ENGINEER",
  "CODE WIZARD",
  "FULL STACK DEVELOPER",
  "EXPERT GOOGLE SEARCHER",
  "DATA ANALYST",
  "CLOUD EXPERT",
  "BUG DEVELOPER",
];

const TYPE_SPEED = 80;
const DELETE_SPEED = 40;
const PAUSE_AFTER_TYPE = 800;
const PAUSE_AFTER_DELETE = 300;

export default function HeroPanel() {
  const [text, setText] = useState("");

  useEffect(() => {
    let timeoutId;
    const state = { lineIndex: 0, charIndex: 0, isDeleting: false };

    function tick() {
      const current = LINES[state.lineIndex];

      if (!state.isDeleting) {
        state.charIndex++;
        setText(current.substring(0, state.charIndex));

        if (state.charIndex === current.length) {
          state.isDeleting = true;
          timeoutId = setTimeout(tick, PAUSE_AFTER_TYPE);
          return;
        }
      } else {
        state.charIndex--;
        setText(current.substring(0, state.charIndex));

        if (state.charIndex === 0) {
          state.isDeleting = false;
          state.lineIndex = (state.lineIndex + 1) % LINES.length;
          {
            /*go back to first */
          }
          timeoutId = setTimeout(tick, PAUSE_AFTER_DELETE);
          return;
        }
      }

      timeoutId = setTimeout(
        tick,
        state.isDeleting ? DELETE_SPEED : TYPE_SPEED,
      );
    }

    timeoutId = setTimeout(tick, TYPE_SPEED);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className="panel">
      <div className="blob blob--yellow"></div>
      <div className="blob blob--green"></div>
      <div className="blob blob--black"></div>
      <div className="hero-content">
        <h1>Bendm</h1>
        <div className="terminal">
          <span className="terminal-text">{text}</span>
          <span className="cursor"></span>
        </div>
        <p>Profesional gamer</p>
        <div className="infolinks">
          <a href="#contact" className="contact-link">
            <button>Contact Me</button>
          </a>
          <a href="#about" className="about-link">
            <button>Learn More →</button>
          </a>
        </div>
      </div>
    </section>
  );
}
