import { useEffect, useRef } from "react";
import "./Clicktrail.css";

const N = 6; // number of trail points (more = smoother but slower)
const EASE = 0.1; // how quickly each point follows the previous (0-1, lower = more lag)
const MAX_W = 15; // ribbon width at its widest point (center)
const SETTLE_DIST_SQ = 9; // distance squared threshold before fade starts (head to target, in pixels)
const FADE_SPEED = 0.04; // how fast opacity decreases per frame (0-1)

export default function ClickTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let active = false;
    let opacity = 0;
    let fading = false;
    let initialized = false;

    const target = { x: 0, y: 0 };
    const pts = Array.from({ length: N }, () => ({ x: 0, y: 0 }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const color = getComputedStyle(document.documentElement)
      .getPropertyValue("--click-trail-color")
      .trim();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      if (active) {
        target.x = e.clientX;
        target.y = e.clientY;
      }
    };

    const onDown = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      // Only snap on first appearance; otherwise continue from current position
      if (!initialized) {
        pts.forEach((p) => { p.x = e.clientX; p.y = e.clientY; });
        initialized = true;
      }
      active = true;
      fading = false;
      opacity = 1;
    };

    const onUp = () => {
      active = false;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Lerp chain — no velocity, no overshoot
      pts[0].x += (target.x - pts[0].x) * EASE;
      pts[0].y += (target.y - pts[0].y) * EASE;
      for (let i = 1; i < N; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * EASE;
        pts[i].y += (pts[i - 1].y - pts[i].y) * EASE;
      }

      if (!active) {
        const dx = pts[0].x - target.x;
        const dy = pts[0].y - target.y;
        if (dx * dx + dy * dy < SETTLE_DIST_SQ) fading = true;
      }

      if (fading) opacity = Math.max(0, opacity - FADE_SPEED);

      const ribbonLen = Math.hypot(
        pts[0].x - pts[N - 1].x,
        pts[0].y - pts[N - 1].y,
      );

      if (opacity > 0 && ribbonLen > 3) {
        const normals = pts.map((_, i) => {
          let dx, dy;
          if (i === 0) {
            dx = pts[1].x - pts[0].x;
            dy = pts[1].y - pts[0].y;
          } else if (i === N - 1) {
            dx = pts[i].x - pts[i - 1].x;
            dy = pts[i].y - pts[i - 1].y;
          } else {
            dx = pts[i + 1].x - pts[i - 1].x;
            dy = pts[i + 1].y - pts[i - 1].y;
          }
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          return { x: -dy / len, y: dx / len };
        });

        const left = pts.map((p, i) => {
          const w = MAX_W * Math.sin((i / (N - 1)) * Math.PI);
          return { x: p.x + normals[i].x * w, y: p.y + normals[i].y * w };
        });
        const right = pts.map((p, i) => {
          const w = MAX_W * Math.sin((i / (N - 1)) * Math.PI);
          return { x: p.x - normals[i].x * w, y: p.y - normals[i].y * w };
        });

        ctx.beginPath();
        ctx.moveTo(left[0].x, left[0].y);
        for (let i = 0; i < N - 1; i++) {
          const mx = (left[i].x + left[i + 1].x) / 2;
          const my = (left[i].y + left[i + 1].y) / 2;
          ctx.quadraticCurveTo(left[i].x, left[i].y, mx, my);
        }
        ctx.lineTo(left[N - 1].x, left[N - 1].y);
        for (let i = N - 1; i > 0; i--) {
          const mx = (right[i].x + right[i - 1].x) / 2;
          const my = (right[i].y + right[i - 1].y) / 2;
          ctx.quadraticCurveTo(right[i].x, right[i].y, mx, my);
        }
        ctx.lineTo(right[0].x, right[0].y);
        ctx.closePath();

        ctx.globalAlpha = opacity;
        ctx.fillStyle = color;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return <canvas ref={canvasRef} className="click-trail-canvas" />;
}
