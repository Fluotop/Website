import "./Header.css";
import { useState } from "react";
import { panels } from "../../panelsData";

function CreateLink({ number, text, onClick }) {
  return (
    <>
      {number !== 0 && <span className="LinePart">|</span>}
      <a href={"#" + text} onClick={onClick}>
        <span className="NumberPart">{number}. </span>
        <span className="TextPart">{text.toUpperCase()}</span>
      </a>
    </>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="text">DRAG ANYWHERE</div>

      <button
        className={`hamburger ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
      </button>

      <nav className={open ? "nav active" : "nav"}>
        {panels
          .filter((p) => p.nav === true)
          .map((p, i) => (
            <CreateLink
              key={p.id}
              number={i}
              text={p.id}
              onClick={() => setOpen(!open)}
            />
          ))}
      </nav>
    </header>
  );
}
