"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WelcomeScreen from "@/components/screens/WelcomeScreen";
import AnalyzingScreen from "@/components/screens/AnalyzingScreen";
import KeyboardFeatureScreen from "@/components/screens/KeyboardFeatureScreen";
import AnalysisReadyScreen from "@/components/screens/AnalysisReadyScreen";
import DashboardScreen from "@/components/screens/DashboardScreen";
import ProjectDetailScreen from "@/components/screens/ProjectDetailScreen";
import KeyboardPreviewScreen from "@/components/screens/KeyboardPreviewScreen";

export type Screen =
  | "welcome"
  | "analyzing"
  | "keyboard-feature"
  | "analysis-ready"
  | "dashboard"
  | "project-detail"
  | "keyboard-preview";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const screenOrder: Screen[] = [
  "welcome",
  "analyzing",
  "keyboard-feature",
  "analysis-ready",
  "dashboard",
  "project-detail",
  "keyboard-preview",
];

export default function Home() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [direction, setDirection] = useState(1);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const navigateTo = useCallback(
    (target: Screen) => {
      const currentIndex = screenOrder.indexOf(screen);
      const targetIndex = screenOrder.indexOf(target);
      setDirection(targetIndex > currentIndex ? 1 : -1);
      setScreen(target);
    },
    [screen]
  );

  const handleSelectProject = useCallback(
    (projectId: string) => {
      setSelectedProject(projectId);
      navigateTo("project-detail");
    },
    [navigateTo]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] p-4">
      {/* iPhone Frame */}
      <div className="relative w-[375px] h-[812px] rounded-[50px] border-[3px] border-[#2A2A2A] bg-[#1A0A14] overflow-hidden shadow-[0_0_80px_rgba(107,29,74,0.3)]">
        {/* Dynamic Island */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-50" />

        {/* Status Bar */}
        <div className="absolute top-[12px] left-0 right-0 h-[34px] z-40 flex items-center justify-between px-8">
          <span className="text-[13px] font-semibold text-[#FFF8F3]/80" style={{ fontFamily: "var(--font-dm-sans)" }}>9:41</span>
          <div className="flex items-center gap-[5px]">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
              <rect x="0.5" y="5" width="3" height="7" rx="1" fill="#FFF8F3" fillOpacity="0.4"/>
              <rect x="5" y="3" width="3" height="9" rx="1" fill="#FFF8F3" fillOpacity="0.6"/>
              <rect x="9.5" y="1" width="3" height="11" rx="1" fill="#FFF8F3" fillOpacity="0.8"/>
              <rect x="14" y="0" width="3" height="12" rx="1" fill="#FFF8F3"/>
            </svg>
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <path d="M8.5 2.8C10.4 2.8 12.1 3.6 13.3 4.8L14.8 3.3C13.2 1.7 11 0.7 8.5 0.7C6 0.7 3.8 1.7 2.2 3.3L3.7 4.8C4.9 3.6 6.6 2.8 8.5 2.8Z" fill="#FFF8F3" fillOpacity="0.4"/>
              <path d="M8.5 5.8C9.8 5.8 11 6.3 11.8 7.2L13.3 5.7C12.1 4.5 10.4 3.8 8.5 3.8C6.6 3.8 4.9 4.5 3.7 5.7L5.2 7.2C6 6.3 7.2 5.8 8.5 5.8Z" fill="#FFF8F3" fillOpacity="0.6"/>
              <path d="M8.5 8.8C9.2 8.8 9.8 9.1 10.3 9.6L11.8 8.1C10.9 7.2 9.7 6.8 8.5 6.8C7.3 6.8 6.1 7.2 5.2 8.1L6.7 9.6C7.2 9.1 7.8 8.8 8.5 8.8Z" fill="#FFF8F3" fillOpacity="0.8"/>
              <circle cx="8.5" cy="11" r="1.2" fill="#FFF8F3"/>
            </svg>
            <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
              <rect x="0.5" y="1" width="22" height="11" rx="2.5" stroke="#FFF8F3" strokeOpacity="0.35" strokeWidth="1"/>
              <rect x="23.5" y="4.5" width="2.5" height="4" rx="0.7" fill="#FFF8F3" fillOpacity="0.4"/>
              <rect x="2" y="2.5" width="17" height="8" rx="1.5" fill="#FFF8F3"/>
            </svg>
          </div>
        </div>

        {/* Screen Content */}
        <div className="relative w-full h-full grain-overlay">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={screen}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0"
            >
              {screen === "welcome" && (
                <WelcomeScreen onNext={() => navigateTo("analyzing")} />
              )}
              {screen === "analyzing" && (
                <AnalyzingScreen onNext={() => navigateTo("keyboard-feature")} />
              )}
              {screen === "keyboard-feature" && (
                <KeyboardFeatureScreen onNext={() => navigateTo("analysis-ready")} />
              )}
              {screen === "analysis-ready" && (
                <AnalysisReadyScreen
                  onSeeInsights={() => navigateTo("dashboard")}
                  onDashboard={() => navigateTo("dashboard")}
                />
              )}
              {screen === "dashboard" && (
                <DashboardScreen
                  onSelectProject={handleSelectProject}
                  onAddNew={() => navigateTo("welcome")}
                  onKeyboardPreview={() => navigateTo("keyboard-preview")}
                />
              )}
              {screen === "project-detail" && (
                <ProjectDetailScreen
                  projectId={selectedProject || "tanya"}
                  onBack={() => navigateTo("dashboard")}
                  onOpenKeyboard={() => navigateTo("keyboard-preview")}
                />
              )}
              {screen === "keyboard-preview" && (
                <KeyboardPreviewScreen onBack={() => navigateTo("dashboard")} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-[#FFF8F3]/20 rounded-full z-50" />
      </div>
    </div>
  );
}
