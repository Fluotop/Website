import { useEffect, useRef, useState } from "react";
import { useHackerText } from "../../hooks/useHackerText";
import "./PanelShell.css";

export default function PanelShell({ name, children }) {
  const ref = useRef(null);
  const [runId, setRunId] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setRunId((id) => id + 1);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const scrambled = useHackerText(name, { active: inView, runId });

  return (
    <div className="panel" ref={ref}>
      <div className="header">
        <h2 className="panelname">{scrambled}</h2>
        <h2 className="openingbracket"> {"{"} </h2>
      </div>
      {children}
      <h2 className="closingbracket"> {"}"} </h2>
    </div>
  );
}
