import { useEffect, useState, useMemo, useRef } from "react";

const ACTIONS = [
  { id: "home", label: "Go to Home", section: "home", keywords: "start top" },
  { id: "about", label: "Go to About", section: "about", keywords: "who bio" },
  { id: "skills", label: "Go to Skills", section: "skills", keywords: "tech stack tools" },
  { id: "experience", label: "Go to Experience", section: "experience", keywords: "career jobs work" },
  { id: "projects", label: "Go to Projects", section: "projects", keywords: "work portfolio" },
  { id: "contact", label: "Go to Contact", section: "contact", keywords: "email hire" },
  { id: "email", label: "Send an email", href: "mailto:YOUR_EMAIL_HERE", keywords: "mail contact" },
  { id: "github", label: "Open GitHub", href: "https://github.com/divydadhich", keywords: "code repo" },
  { id: "linkedin", label: "Open LinkedIn", href: "https://linkedin.com/in/divydadhich", keywords: "profile social" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      const isK = e.key.toLowerCase() === "k";
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ACTIONS;
    return ACTIONS.filter(
      (a) => a.label.toLowerCase().includes(q) || a.keywords.includes(q)
    );
  }, [query]);

  const runAction = (action) => {
    if (!action) return;
    if (action.href) {
      window.open(action.href, action.href.startsWith("mailto") ? "_self" : "_blank");
    } else if (action.section) {
      const el = document.getElementById(action.section);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
    }
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    if (e.key === "Enter") { e.preventDefault(); runAction(results[active]); }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-[14vh] px-4"
      style={{ background: "rgba(11,18,32,0.55)", backdropFilter: "blur(4px)" }}
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-xl border shadow-2xl overflow-hidden"
        style={{ background: "var(--panel)", borderColor: "var(--border-hi)" }}
      >
        <div className="flex items-center gap-3 border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
          <span className="font-mono text-[var(--emerald)] text-sm">➜</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            onKeyDown={onKeyDown}
            placeholder="Jump to a section, project, or link..."
            className="w-full bg-transparent font-mono text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)]"
          />
          <kbd className="tag-chip rounded border border-[var(--border)] px-1.5 py-0.5 text-[var(--muted)]">esc</kbd>
        </div>
        <div className="max-h-[50vh] overflow-y-auto py-2">
          {results.length === 0 && (
            <p className="px-4 py-6 text-center font-mono text-xs text-[var(--muted)]">No matches</p>
          )}
          {results.map((r, i) => (
            <button
              key={r.id}
              onMouseEnter={() => setActive(i)}
              onClick={() => runAction(r)}
              className="flex w-full items-center justify-between px-4 py-2.5 text-left font-mono text-sm transition-colors"
              style={{
                background: i === active ? "var(--panel-hi)" : "transparent",
                color: i === active ? "var(--emerald)" : "var(--text)",
              }}
            >
              {r.label}
              {i === active && <span className="text-xs">↵</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}