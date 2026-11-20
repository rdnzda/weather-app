"use client";

import { CloudSun, Star, SlidersHorizontal } from "lucide-react";

const TABS = [
  { id: "weather", label: "Météo", Icon: CloudSun },
  { id: "favorites", label: "Favoris", Icon: Star },
  { id: "settings", label: "Paramètres", Icon: SlidersHorizontal },
];

export default function BottomMenu({ currentTab, setCurrentTab }) {
  return (
    <nav
      aria-label="Navigation principale"
      className="border-t border-line bg-ink safe-bottom"
    >
      <ul className="mx-auto flex max-w-5xl sm:px-8">
        {TABS.map(({ id, label, Icon }) => {
          const active = currentTab === id;
          return (
            <li key={id} className="flex-1 sm:flex-none">
              <button
                type="button"
                onClick={() => setCurrentTab(id)}
                aria-current={active ? "page" : undefined}
                className={`relative flex h-16 w-full flex-col items-center justify-center gap-1 px-2 text-xs font-medium transition-colors sm:h-14 sm:flex-row sm:gap-2 sm:px-6 sm:text-sm cursor-pointer focus-visible:outline-offset-[-2px] ${
                  active ? "text-fg" : "text-dim hover:text-fg"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 top-0 h-[2px] sm:inset-x-6 ${
                    active ? "bg-sky" : "bg-transparent"
                  }`}
                />
                <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                <span>{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
