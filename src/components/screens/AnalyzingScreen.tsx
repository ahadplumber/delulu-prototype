"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface AnalyzingScreenProps {
  onNext: () => void;
}

const analysisSteps = [
  { label: "Reading messages", icon: "📖" },
  { label: "Understanding dynamics", icon: "🔮" },
  { label: "Identifying patterns", icon: "✨" },
  { label: "Crafting insights", icon: "💭" },
];

export default function AnalyzingScreen({ onNext }: AnalyzingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < analysisSteps.length - 1) return prev + 1;
        return prev;
      });
    }, 1800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(stepInterval);
          setTimeout(onNext, 600);
          return 100;
        }
        return prev + 1.2;
      });
    }, 80);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [onNext]);

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, #3D0C2B 0%, #1A0A14 70%)",
      }}
    >
      {/* Ambient pulse */}
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#6B1D4A]/30 blur-[80px] animate-heartbeat" />

      {/* Heartbeat ring animation */}
      <motion.div
        className="relative mb-6 md:mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-[120px] h-[120px] flex items-center justify-center">
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#C4956A]/30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
          {/* Middle ring */}
          <motion.div
            className="absolute inset-2 rounded-full border border-[#C4956A]/20"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.1, 0.5] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.3,
            }}
          />
          {/* Center circle */}
          <motion.div
            className="w-[60px] h-[60px] rounded-full flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, #C4956A 0%, #6B1D4A 100%)",
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.span
              className="text-[24px]"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {analysisSteps[currentStep]?.icon}
            </motion.span>
          </motion.div>
        </div>
      </motion.div>

      {/* Analysis steps */}
      <div className="flex flex-col items-center gap-6 z-10 px-8">
        <motion.p
          className="text-[22px] text-[#FFF8F3] text-center"
          style={{ fontFamily: "var(--font-playfair)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="italic">Analyzing your conversation</span>
        </motion.p>

        {/* Steps */}
        <div className="flex flex-col gap-3 w-full max-w-[260px]">
          {analysisSteps.map((step, index) => (
            <motion.div
              key={step.label}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: index <= currentStep ? 1 : 0.2,
                x: 0,
              }}
              transition={{ delay: index * 0.4 + 0.5, duration: 0.4 }}
            >
              <motion.div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background:
                    index <= currentStep
                      ? "linear-gradient(135deg, #C4956A, #D4A574)"
                      : "rgba(196, 149, 106, 0.15)",
                }}
                animate={
                  index === currentStep
                    ? { scale: [1, 1.2, 1] }
                    : {}
                }
                transition={{ duration: 0.6, repeat: index === currentStep ? Infinity : 0 }}
              >
                {index < currentStep && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1A0A14"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </motion.div>
              <span
                className="text-[14px]"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  color:
                    index <= currentStep
                      ? "#FFF8F3"
                      : "rgba(255, 248, 243, 0.3)",
                }}
              >
                {step.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-[260px] mt-2">
          <div className="h-[3px] bg-[#FFF8F3]/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #C4956A, #D4A574, #C4956A)",
                backgroundSize: "200% 100%",
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p
            className="text-[11px] text-[#FFF8F3]/30 text-center mt-3"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {Math.min(Math.round(progress), 100)}%
          </p>
        </div>

        {/* Insights teaser — the carrot */}
        <motion.div
          className="w-full max-w-[260px] mt-4 rounded-2xl px-4 py-4"
          style={{ background: "rgba(196, 149, 106, 0.06)", border: "1px solid rgba(196, 149, 106, 0.1)" }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <p
            className="text-[11px] text-[#C4956A]/50 tracking-wide uppercase mb-3"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Waiting for you after setup
          </p>
          <div className="flex flex-col gap-2.5">
            {[
              { icon: "◈", text: "Your communication score" },
              { icon: "◈", text: "Hidden patterns in your texts" },
              { icon: "◈", text: "What to say next" },
            ].map((item, i) => (
              <motion.div
                key={item.text}
                className="flex items-center gap-2.5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 + i * 0.3, duration: 0.4 }}
              >
                <span className="text-[10px] text-[#C4956A]/40">{item.icon}</span>
                <span
                  className="text-[12px] text-[#FFF8F3]/50"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Privacy badge */}
        <motion.div
          className="flex items-center gap-2 mt-3 px-4 py-2.5 rounded-full"
          style={{ background: "rgba(196, 149, 106, 0.08)", border: "1px solid rgba(196, 149, 106, 0.12)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C4956A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span
            className="text-[11px] text-[#C4956A]/80 tracking-wide"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Encrypted &middot; Private &middot; Always
          </span>
        </motion.div>
      </div>
    </div>
  );
}
