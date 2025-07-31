"use client";

import { FaCloudSun, FaCog, FaHeart } from "react-icons/fa";

export default function BottomMenu({ currentTab, setCurrentTab }) {
  return (
    <nav className="fixed bottom-12 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg z-50 rounded-2xl flex">
      <button
        onClick={() => setCurrentTab("weather")}
        className={`flex flex-col items-center px-3 py-2 rounded-xl transition-all ${
          currentTab === "weather"
            ? "bg-white/20 text-primary font-semibold"
            : "text-muted-foreground hover:bg-white/10"
        }`}
      >
        <FaCloudSun size={25} />
      </button>
      <button
        onClick={() => setCurrentTab("favorites")}
        className={`flex flex-col items-center px-3 py-2 rounded-xl transition-all ${
          currentTab === "favorites"
            ? "bg-white/20 text-primary font-semibold"
            : "text-muted-foreground hover:bg-white/10"
        }`}
      >
        <FaHeart size={25} />
      </button>
      <button
        onClick={() => setCurrentTab("settings")}
        className={`flex flex-col items-center px-3 py-2 rounded-xl transition-all ${
          currentTab === "settings"
            ? "bg-white/20 text-primary font-semibold"
            : "text-muted-foreground hover:bg-white/10"
        }`}
      >
        <FaCog size={25} />
      </button>
    </nav>
  );
}
