import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function MatrixRain({ onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "0123456789ABCDEFDIVYDADHICHMERNREACTNODEEXPRESSMONGODBSOCKETS";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(3, 7, 18, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#10b981"; // Emerald Matrix green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Auto close after 12s
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 12000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto bg-black/60 backdrop-blur-sm transition-opacity duration-500">
      <canvas ref={canvasRef} className="block w-full h-full" />
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-slate-900/80 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20 transition-all flex items-center gap-2 text-xs font-mono"
      >
        <X className="w-4 h-4" /> Exit Matrix Mode
      </button>
    </div>
  );
}
