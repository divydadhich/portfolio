import React, { useRef, useState } from "react";
import { sound } from "../utils/sound";

export default function TiltCard({
  children,
  className = "",
  glowColor = "cyan",
  onClick,
  maxTilt = 8,
}) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
    );

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseEnter = () => {
    sound.playHover();
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: transformStyle,
        transition: "transform 0.12s ease-out, box-shadow 0.2s ease",
      }}
      className={`relative group rounded-2xl overflow-hidden will-change-transform ${className}`}
    >
      {/* Specular Glare Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}) 0%, transparent 60%)`,
        }}
      />

      {/* Glow Accent Edge */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl border transition-colors duration-300 z-10 ${
          glowColor === "emerald"
            ? "border-emerald-500/20 group-hover:border-emerald-400/50 group-hover:shadow-neon-emerald"
            : glowColor === "violet"
            ? "border-purple-500/20 group-hover:border-purple-400/50 group-hover:shadow-neon-violet"
            : "border-cyan-500/20 group-hover:border-cyan-400/50 group-hover:shadow-neon"
        }`}
      />

      {children}
    </div>
  );
}
