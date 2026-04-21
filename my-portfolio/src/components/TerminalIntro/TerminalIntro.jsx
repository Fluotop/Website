import { useState, useEffect, useRef } from "react";
import "./TerminalIntro.css";

const PREPOPULATED = [
  { text: "pwd", type: "typed" },
  { text: "/home/ben/Documents", type: "instant" },
  { text: "cd personal_website", type: "typed" },
  { text: "ls", type: "typed" },
  {
    text: "node_modules/ package-lock.json public/ src/ index.html package.json postcss.config.js README.md tailwind.config.ts tsconfig.json vite.config.ts ddaniel.dev",
    type: "instant",
  },
];

const SCRIPT = [
  { text: "cleat", type: "typed" },
  { text: "bash: cleat: command not found", type: "instant" },
  { text: "clear", type: "typed" },
  { text: "clear", type: "clear" },
  { text: "npm start", type: "typed" },
  { text: "Server starting...", type: "instant" },
  { text: "Server listening on http://localhost:5173/", type: "instant" },
];

const TYPE_SPEED = 80;
const PAUSE_AFTER_TYPE = 1000;

export default function TerminalTyping({ onComplete }) {
  const [lines, setLines] = useState(PREPOPULATED);
  const [currentTyped, setCurrentTyped] = useState("");
  const timeoutRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    const state = { lineIndex: 0, charIndex: 0 };

    function tick() {
      if (state.lineIndex >= SCRIPT.length) {
        onCompleteRef.current();
        return;
      }
      // fetch line in array
      const current = SCRIPT[state.lineIndex];

      if (current.type === "typed") {
        //add letter by letter until everything. then reset and go next line
        state.charIndex++;
        setCurrentTyped(current.text.substring(0, state.charIndex));

        if (state.charIndex === current.text.length) {
          setLines((prev) => [
            ...prev,
            { text: current.text, type: current.type },
          ]);

          setCurrentTyped("");
          state.lineIndex++;
          state.charIndex = 0;
          timeoutRef.current = setTimeout(tick, PAUSE_AFTER_TYPE);
          return;
        }

        timeoutRef.current = setTimeout(tick, TYPE_SPEED);
      } else if (current.type === "instant") {
       //add next line to display and reset go next line
        
        setLines((prev) => [
          ...prev,
          { text: current.text, type: current.type },
        ]);

        state.lineIndex++;
        timeoutRef.current = setTimeout(tick, PAUSE_AFTER_TYPE);
      } else if (current.type === "clear") {
        //clear display
        setLines([]);
        setCurrentTyped("");
        state.lineIndex++;
        timeoutRef.current = setTimeout(tick, 1000);
      }
    }
    //start looping, each loop call tick again
    timeoutRef.current = setTimeout(tick, 1000);
    return () => clearTimeout(timeoutRef.current);
  }, []);
  //loop over lines to output each tick
  return (
    <div className="terminal-overlay">
      {/* already typed lines i = line */}
      {lines.map((line, i) => (
        <p key={i}>
          {line.type === "typed" && (
            <span className="prompt">
              <strong>C:\Users\bendm\Desktop\Website</strong>&gt;{" "}
            </span>
          )}
          {line.text}
        </p>
      ))}
      {/* in progress lines if currenttyped exists */}
      {currentTyped && (
        <p>
          <span className="prompt">
            <strong>C:\Users\bendm\Desktop\Website</strong>&gt;{" "}
          </span>
          {currentTyped}
          <span className="cursor"></span>
        </p>
      )}
      <button
        className="skip-btn"
        onClick={() => {
          clearTimeout(timeoutRef.current);
          onComplete();
        }}
      >
        Skip Animation &gt;&gt;
      </button>
    </div>
  );
}
