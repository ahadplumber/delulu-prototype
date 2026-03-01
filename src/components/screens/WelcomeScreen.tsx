"use client";

import { motion } from "framer-motion";

interface WelcomeScreenProps {
  onNext: () => void;
}

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between overflow-hidden"
      style={{ background: "linear-gradient(170deg, #1A0A14 0%, #3D0C2B 40%, #6B1D4A 70%, #3D0C2B 100%)" }}
    >
      {/* Ambient glow orbs */}
      <div className="absolute top-[15%] left-[-20%] w-[300px] h-[300px] rounded-full bg-[#6B1D4A]/40 blur-[100px] animate-pulse-warm" />
      <div className="absolute bottom-[20%] right-[-15%] w-[250px] h-[250px] rounded-full bg-[#C4956A]/20 blur-[80px] animate-pulse-warm" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-[50%] left-[30%] w-[200px] h-[200px] rounded-full bg-[#8A2E5E]/30 blur-[90px] animate-pulse-warm" style={{ animationDelay: "0.7s" }} />

      {/* Top spacer for status bar */}
      <div className="h-[100px]" />

      {/* Logo & Tagline */}
      <motion.div
        className="flex flex-col items-center z-10 px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h1
          className="text-[52px] leading-none tracking-[-0.02em] text-[#FFF8F3]"
          style={{ fontFamily: "var(--font-playfair)" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="italic">Delulu</span>
        </motion.h1>

        <motion.p
          className="text-[15px] text-[#F2D5CE]/70 mt-3 tracking-[0.08em] uppercase"
          style={{ fontFamily: "var(--font-dm-sans)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Love, decoded
        </motion.p>

        <motion.p
          className="text-[17px] text-[#FFF8F3]/50 mt-8 text-center leading-relaxed max-w-[280px]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          Upload a conversation and let your personal coach reveal what&apos;s really going on.
        </motion.p>
      </motion.div>

      {/* Upload Options */}
      <motion.div
        className="flex flex-col gap-3 w-full px-8 z-10 mb-[20px]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Upload Chat Export */}
        <motion.button
          onClick={onNext}
          className="w-full py-[18px] rounded-2xl text-[15px] font-medium tracking-wide relative overflow-hidden"
          style={{
            fontFamily: "var(--font-dm-sans)",
            background: "linear-gradient(135deg, #C4956A 0%, #D4A574 50%, #C4956A 100%)",
            color: "#1A0A14",
          }}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center justify-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            Upload Chat Export
          </div>
        </motion.button>

        {/* Upload Screenshots */}
        <motion.button
          onClick={onNext}
          className="w-full py-[18px] rounded-2xl text-[15px] font-medium tracking-wide border border-[#C4956A]/30 text-[#F2D5CE]"
          style={{
            fontFamily: "var(--font-dm-sans)",
            background: "rgba(196, 149, 106, 0.08)",
          }}
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01, borderColor: "rgba(196, 149, 106, 0.5)" }}
        >
          <div className="flex items-center justify-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            Upload Screenshots
          </div>
        </motion.button>

        {/* Privacy note */}
        <motion.p
          className="text-[11px] text-[#FFF8F3]/25 text-center mt-2 flex items-center justify-center gap-1.5"
          style={{ fontFamily: "var(--font-dm-sans)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          End-to-end encrypted. Your chats never leave your device.
        </motion.p>
      </motion.div>

      {/* Bottom safe area */}
      <div className="h-[30px]" />
    </div>
  );
}
