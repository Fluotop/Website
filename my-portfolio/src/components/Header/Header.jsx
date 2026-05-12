import "./Header.css";
import { useEffect, useState } from "react";
import { panels } from "../../panelsData";

const VISITOR_API =
  "https://jonxbuc736.execute-api.us-east-1.amazonaws.com/prod/visitors";

function CreateLink({ number, text, href, download, onClick }) {
  return (
    <>
      {number !== 0 && <span className="LinePart">|</span>}
      <a
        href={href ?? "#" + text}
        onClick={onClick}
        {...(download ? { download: true } : {})}
      >
        <span className="NumberPart">{number}. </span>
        <span className="TextPart">{text.toUpperCase()}</span>
      </a>
    </>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [views, setViews] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(VISITOR_API, { method: "POST" });
        const data = await response.json();
        if (!cancelled) setViews(data.amount);
      } catch (err) {
        console.error("Visitor counter failed:", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header>
      <div className="text">
        DRAG ANYWHERE
        {views !== null && <span className="counter">VIEWS: {views}</span>}
      </div>

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
              href={p.href}
              download={!!p.href}
              onClick={() => setOpen(!open)}
            />
          ))}
      </nav>
    </header>
  );
}
