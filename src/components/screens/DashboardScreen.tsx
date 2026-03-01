"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface DashboardScreenProps {
  onSelectProject: (id: string) => void;
  onAddNew: () => void;
  onKeyboardPreview: () => void;
}

const mockProjects = [
  {
    id: "tanya",
    name: "Tanya",
    initial: "T",
    lastAnalyzed: "2 hours ago",
    insight: "Strong emotional connection. Watch the texting pace.",
    score: 78,
    gradient: "linear-gradient(135deg, #C4956A, #6B1D4A)",
  },
  {
    id: "jordan",
    name: "Jordan",
    initial: "J",
    lastAnalyzed: "1 day ago",
    insight: "Early stage — keep the mystery alive.",
    score: 65,
    gradient: "linear-gradient(135deg, #8A2E5E, #3D0C2B)",
  },
  {
    id: "sam",
    name: "Sam",
    initial: "S",
    lastAnalyzed: "3 days ago",
    insight: "Fading interest detected. Time to re-engage.",
    score: 42,
    gradient: "linear-gradient(135deg, #6B1D4A, #1A0A14)",
  },
];

type Tab = "connections" | "insights" | "settings";

export default function DashboardScreen({
  onSelectProject,
  onAddNew,
  onKeyboardPreview,
}: DashboardScreenProps) {
  const [activeTab, setActiveTab] = useState<Tab>("connections");

  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: "#1A0A14" }}
    >
      {/* Header */}
      <div className="pt-[16px] md:pt-[64px] px-6 pb-4">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <p
              className="text-[12px] text-[#C4956A]/60 tracking-[0.15em] uppercase mb-1"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Your
            </p>
            <h1
              className="text-[28px] text-[#FFF8F3] leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              <span className="italic">Connections</span>
            </h1>
          </div>
          <motion.button
            onClick={onAddNew}
            className="w-[44px] h-[44px] rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #C4956A, #D4A574)",
              boxShadow: "0 4px 20px rgba(196, 149, 106, 0.3)",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1A0A14"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Project cards */}
      <div className="flex-1 overflow-y-auto px-6 pb-[100px]">
        <div className="flex flex-col gap-3">
          {mockProjects.map((project, index) => (
            <motion.button
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className="w-full text-left rounded-2xl p-4 relative overflow-hidden"
              style={{
                background: "rgba(255, 248, 243, 0.03)",
                border: "1px solid rgba(255, 248, 243, 0.06)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-3.5">
                {/* Avatar */}
                <div
                  className="w-[48px] h-[48px] rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: project.gradient }}
                >
                  <span
                    className="text-[18px] text-[#FFF8F3] font-medium"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {project.initial}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3
                      className="text-[16px] text-[#FFF8F3] font-medium"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {project.name}
                    </h3>
                    <span
                      className="text-[11px] text-[#FFF8F3]/25"
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    >
                      {project.lastAnalyzed}
                    </span>
                  </div>

                  <p
                    className="text-[13px] text-[#FFF8F3]/40 leading-relaxed mb-3 line-clamp-2"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {project.insight}
                  </p>

                  {/* Score bar */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex-1 h-[3px] bg-[#FFF8F3]/8 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${project.score}%`,
                          background:
                            project.score > 70
                              ? "linear-gradient(90deg, #4A7C59, #6B9E6B)"
                              : project.score > 50
                              ? "linear-gradient(90deg, #C4956A, #D4A574)"
                              : "linear-gradient(90deg, #8A2E5E, #6B1D4A)",
                        }}
                      />
                    </div>
                    <span
                      className="text-[11px] font-medium"
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        color:
                          project.score > 70
                            ? "#6B9E6B"
                            : project.score > 50
                            ? "#C4956A"
                            : "#8A2E5E",
                      }}
                    >
                      {project.score}
                    </span>
                  </div>
                </div>

                {/* Chevron */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFF8F3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-4 opacity-20 flex-shrink-0"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Coach keyboard teaser */}
        <motion.button
          onClick={onKeyboardPreview}
          className="w-full mt-4 rounded-2xl p-4 text-left"
          style={{
            background:
              "linear-gradient(135deg, rgba(196, 149, 106, 0.1), rgba(107, 29, 74, 0.1))",
            border: "1px solid rgba(196, 149, 106, 0.15)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #C4956A, #6B1D4A)" }}
            >
              <span className="text-[16px]">✦</span>
            </div>
            <div className="flex-1">
              <p
                className="text-[14px] text-[#FFF8F3] font-medium"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Install Coach Keyboard
              </p>
              <p
                className="text-[12px] text-[#FFF8F3]/30"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Get real-time advice in any app
              </p>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C4956A"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </motion.button>
      </div>

      {/* Bottom Nav */}
      <div
        className="absolute bottom-0 left-0 right-0 pb-[12px] md:pb-[30px] pt-3 px-8"
        style={{
          background: "linear-gradient(180deg, transparent, #1A0A14 30%)",
        }}
      >
        <div className="flex items-center justify-around">
          {(
            [
              {
                id: "connections" as Tab,
                label: "Connections",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                ),
              },
              {
                id: "insights" as Tab,
                label: "Insights",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                ),
              },
              {
                id: "settings" as Tab,
                label: "Settings",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                  </svg>
                ),
              },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center gap-1"
            >
              <div
                style={{
                  color:
                    activeTab === tab.id
                      ? "#C4956A"
                      : "rgba(255, 248, 243, 0.25)",
                }}
              >
                {tab.icon}
              </div>
              <span
                className="text-[10px]"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  color:
                    activeTab === tab.id
                      ? "#C4956A"
                      : "rgba(255, 248, 243, 0.25)",
                }}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
