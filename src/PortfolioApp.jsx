import React, { useState, useEffect } from "react";
import CyberCanvas from "./components/CyberCanvas";
import CustomCursor from "./components/CustomCursor";
import CyberNavbar from "./components/CyberNavbar";
import CyberHero from "./components/CyberHero";
import ArchitectureSection from "./components/ArchitectureSection";
import InteractiveSkills from "./components/InteractiveSkills";
import FeaturedProjects from "./components/FeaturedProjects";
import InteractiveTimeline from "./components/InteractiveTimeline";
import FuturisticContact from "./components/FuturisticContact";
import CyberFooter from "./components/CyberFooter";
import CommandPalette from "./components/CommandPalette";
import MatrixRain from "./components/MatrixRain";
import { sound } from "./utils/sound";

export default function PortfolioApp() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  // Toggle Sound FX
  const handleToggleSound = () => {
    const newState = sound.toggle();
    setIsSoundMuted(!newState);
  };

  // Keyboard shortcut for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Interactive 3D WebGL Three.js Background */}
      <CyberCanvas />

      {/* Fluid Interactive Neon Cursor */}
      <CustomCursor />

      {/* Ambient Cyber Grid Overlay */}
      <div className="fixed inset-0 cyber-grid pointer-events-none z-0 opacity-40" />

      {/* Sticky Glassmorphism Cyber Navbar */}
      <CyberNavbar
        onOpenCommandPalette={setCommandPaletteOpen}
        onTriggerMatrix={() => setIsMatrixActive(true)}
        isSoundMuted={isSoundMuted}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Stream */}
      <main className="relative z-10">
        {/* 01. Hero & Interactive Shell Terminal */}
        <CyberHero onTriggerMatrix={() => setIsMatrixActive(true)} />

        {/* 02. Live Backend Architecture Flow Simulator */}
        <ArchitectureSection />

        {/* 03. Core Competencies & Skills Matrix */}
        <InteractiveSkills />

        {/* 04. Signature Projects (XOTO.ae & Vani Voice Chat) */}
        <FeaturedProjects />

        {/* 05. Experience Timeline & Education */}
        <InteractiveTimeline />

        {/* 06. Futuristic Contact Console */}
        <FuturisticContact />
      </main>

      {/* Cyber Footer */}
      <CyberFooter />

      {/* Command Palette Modal (Cmd+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={setCommandPaletteOpen}
        onTriggerMatrix={() => setIsMatrixActive(true)}
        isSoundMuted={isSoundMuted}
        onToggleSound={handleToggleSound}
      />

      {/* Matrix Rain Easter Egg */}
      {isMatrixActive && (
        <MatrixRain onClose={() => setIsMatrixActive(false)} />
      )}
    </div>
  );
}