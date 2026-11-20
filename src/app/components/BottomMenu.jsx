"use client";

import { FaCloudSun, FaCog, FaHeart } from "react-icons/fa";

const TABS = [
  { id: "weather", label: "Météo", Icon: FaCloudSun },
  { id: "favorites", label: "Favoris", Icon: FaHeart },
  { id: "settings", label: "Paramètres", Icon: FaCog },
];

export default function BottomMenu({ currentTab, setCurrentTab }) {
  return (
    <nav
      aria-label="Navigation principale"
      className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-2xl border border-white/10 bg-[rgb(12_16_22/0.92)] p-1.5 shadow-lg shadow-black/30"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      {TABS.map(({ id, label, Icon }) => {
        const active = currentTab === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => setCurrentTab(id)}
            aria-current={active ? "page" : undefined}
            className={`flex min-w-[5.5rem] flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
              active
                ? "bg-white/15 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon size={20} aria-hidden="true" />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
