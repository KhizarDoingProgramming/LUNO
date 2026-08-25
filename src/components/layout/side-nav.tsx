"use client";

import { useState, useEffect } from "react";

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "hero", label: "Start" },
  { id: "languages", label: "Languages" },
  { id: "features", label: "Features" },
  { id: "method", label: "How It Works" },
  { id: "gamification", label: "Gamification" },
  { id: "cta", label: "Get Started" },
];

export function SideNav() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="side-nav" aria-label="Section navigation">
      {navItems.map((item, index) => {
        const isActive = activeSection === item.id;
        const isPast = navItems.findIndex((n) => n.id === activeSection) > index;

        return (
          <div key={item.id} className="flex flex-col items-center">
            <button
              className={`side-nav-dot ${isActive ? "active" : ""}`}
              onClick={() => scrollTo(item.id)}
              aria-label={`Go to ${item.label}`}
              aria-current={isActive ? "true" : undefined}
            >
              <span className="side-nav-label">{item.label}</span>
            </button>
            {index < navItems.length - 1 && (
              <div
                className={`side-nav-line ${isPast ? "active" : ""}`}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
