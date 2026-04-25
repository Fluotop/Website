import { useState, useEffect } from "react";
import { panels } from "../../panelsData";
import "./Sidebar.css";

export default function Sidebar() {
  const [currentPanel, setCurrentPanel] = useState("hero");
  const root = document.getElementById("root");

  const handleDotClick = (panelId) => {
    const element = document.getElementById(panelId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    const panelItems = panels.filter((p) => p.panel === true);
    const panelPositions = panelItems.map(
      (p) => document.getElementById(p.id).offsetTop,
    );

    const onscroll = () => {
      var i;
      for (i = panelPositions.length - 1; i >= 0; i--) {
        if (root.scrollTop >= panelPositions[i]) {
          setCurrentPanel(panelItems[i].id);
          break;
        }
      }
      if (i == -1) {
        setCurrentPanel(panelItems[0].id);
      }
    };
    root.addEventListener("scroll", onscroll);
    return () => root.removeEventListener("scroll", onscroll);
  }, [root]);

  return (
    <div className="sidebar">
      {panels
        .filter((p) => p.panel === true)
        .map((p) => (
          <span
            className={`dot ${currentPanel === p.id ? "active" : ""}`}
            key={p.id}
            onClick={() => handleDotClick(p.id)}
          >
            ⬤
          </span>
        ))}
    </div>
  );
}
