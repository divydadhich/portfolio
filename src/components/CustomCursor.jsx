import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const requestRef = useRef(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentTrailing = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      setIsVisible(true);
      targetPos.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering interactive element
      const target = e.target;
      const isInteractive =
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest(".interactive") ||
        target.closest("[role='button']");

      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Smooth spring animation for the outer ring
    const animateTrailing = () => {
      const dx = targetPos.current.x - currentTrailing.current.x;
      const dy = targetPos.current.y - currentTrailing.current.y;

      currentTrailing.current.x += dx * 0.18;
      currentTrailing.current.y += dy * 0.18;

      setTrailingPos({
        x: currentTrailing.current.x,
        y: currentTrailing.current.y,
      });

      requestRef.current = requestAnimationFrame(animateTrailing);
    };

    requestRef.current = requestAnimationFrame(animateTrailing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Center Laser Dot */}
      <div
        className="custom-cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicked ? 0.6 : 1})`,
        }}
      />

      {/* Fluid Trailing Glowing Ring */}
      <div
        className={`custom-cursor-ring ${isHovered ? "active-hover" : ""}`}
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicked ? 0.85 : 1})`,
        }}
      />
    </>
  );
}
