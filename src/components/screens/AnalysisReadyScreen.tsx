"use client";

import { motion } from "framer-motion";

interface AnalysisReadyScreenProps {
  onSeeInsights: () => void;
  onDashboard: () => void;
}

export default function AnalysisReadyScreen({
  onDashboard,
}: AnalysisReadyScreenProps) {
  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-between overflow-hidden"
      style={{
        background:
          "linear-gradient(170deg, #1A0A14 0%, #3D0C2B 45%, #1A0A14 100%)",
      }}
    >
      {/* Ambient glow */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-[#C4956A]/8 blur-[100px] animate-pulse-warm" />

      {/* Top spacer */}
      <div className="h-[100px]" />

      {/* Main content */}
      <div className="flex flex-col items-center z-10 px-8">
        {/* Subtle working indicator — not a celebration, a promise */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-[72px] h-[72px]">
            {/* Soft spinning ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: "2px solid rgba(196, 149, 106, 0.15)" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px solid transparent",
                borderTopColor: "#C4956A",
                borderRightColor: "rgba(196, 149, 106, 0.4)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "rgba(196, 149, 106, 0.1)" }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-[18px]">✦</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.h2
          className="text-[26px] text-[#FFF8F3] text-center leading-tight mb-3"
          style={{ fontFamily: "var(--font-playfair)" }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          You&apos;re <span className="italic">all set</span>
        </motion.h2>

        <motion.p
          className="text-[15px] text-[#FFF8F3]/45 text-center leading-relaxed max-w-[280px]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Coach is finishing up your analysis. Your insights will be waiting for you inside.
        </motion.p>

        {/* Teaser stats — subtle, not the main event */}
        <motion.div
          className="flex items-center gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[
            { value: "3", label: "patterns" },
            { value: "·", label: "" },
            { value: "78", label: "vibe score" },
            { value: "·", label: "" },
            { value: "5", label: "tips" },
          ].map((item, i) =>
            item.label === "" ? (
              <span key={i} className="text-[#FFF8F3]/10 text-[14px]">·</span>
            ) : (
              <div key={i} className="flex items-baseline gap-1.5">
                <span
                  className="text-[18px] text-[#C4956A]/70 font-medium"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {item.value}
                </span>
                <span
                  className="text-[11px] text-[#FFF8F3]/25"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {item.label}
                </span>
              </div>
            )
          )}
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        className="w-full px-8 pb-[50px] z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.button
          onClick={onDashboard}
          className="w-full py-[18px] rounded-2xl text-[15px] font-medium tracking-wide text-[#1A0A14]"
          style={{
            fontFamily: "var(--font-dm-sans)",
            background: "linear-gradient(135deg, #C4956A 0%, #D4A574 100%)",
          }}
          whileTap={{ scale: 0.97 }}
        >
          Let&apos;s go
        </motion.button>

        <motion.p
          className="text-[11px] text-[#FFF8F3]/20 text-center mt-3"
          style={{ fontFamily: "var(--font-dm-sans)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          Your full analysis will be ready when you arrive
        </motion.p>
      </motion.div>
    </div>
  );
}
