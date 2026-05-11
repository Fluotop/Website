import { useEffect, useRef, useState } from "react";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

export function useHackerText(
  text,
  { speed = 50, step = 0.5, active = true, runId = 0 } = {}
) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
        setDisplay(text);
      }

      iteration += step;
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, [text, speed, step, active, runId]);

  return display;
}
