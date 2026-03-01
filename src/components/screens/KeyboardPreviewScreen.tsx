"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface KeyboardPreviewScreenProps {
  onBack: () => void;
}

type CoachState = "catching-up" | "needs-context" | "recommendation" | "refining" | "refined";

export default function KeyboardPreviewScreen({
  onBack,
}: KeyboardPreviewScreenProps) {
  const [coachState, setCoachState] = useState<CoachState>("catching-up");
  const [showStandardKb, setShowStandardKb] = useState(false);

  // Auto-advance from catching-up after mount
  useState(() => {
    const timer = setTimeout(() => setCoachState("recommendation"), 2000);
    return () => clearTimeout(timer);
  });

  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: "#1A0A14" }}
    >
      {/* Header */}
      <div className="pt-[12px] md:pt-[54px] px-5 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.button
            onClick={onBack}
            className="w-[36px] h-[36px] rounded-full flex items-center justify-center"
            style={{ background: "rgba(255, 248, 243, 0.05)" }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFF8F3" strokeWidth="2" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </motion.button>
          <h2 className="text-[18px] text-[#FFF8F3]" style={{ fontFamily: "var(--font-playfair)" }}>
            <span className="italic">Coach</span> Keyboard
          </h2>
        </div>
        {/* State selector pills */}
        <div className="flex gap-1">
          {(["recommendation", "needs-context", "refining"] as CoachState[]).map((s) => (
            <button
              key={s}
              onClick={() => {
                setCoachState(s);
                setShowStandardKb(false);
              }}
              className="px-2 py-1 rounded-full text-[9px] transition-all"
              style={{
                fontFamily: "var(--font-dm-sans)",
                background: coachState === s || (s === "recommendation" && coachState === "refined") ? "rgba(196, 149, 106, 0.2)" : "rgba(255, 248, 243, 0.05)",
                color: coachState === s || (s === "recommendation" && coachState === "refined") ? "#C4956A" : "rgba(255, 248, 243, 0.3)",
                border: `1px solid ${coachState === s || (s === "recommendation" && coachState === "refined") ? "rgba(196, 149, 106, 0.3)" : "transparent"}`,
              }}
            >
              {s === "recommendation" ? "ready" : s === "needs-context" ? "needs context" : "refine"}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area (simulating iMessage/WhatsApp) */}
      <div className="flex-1 flex flex-col mx-4 overflow-hidden">
        {/* Chat header bar */}
        <div
          className="rounded-t-2xl px-4 py-3 flex items-center gap-3"
          style={{
            background: "rgba(255, 248, 243, 0.04)",
            borderBottom: "1px solid rgba(255, 248, 243, 0.05)",
          }}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <span className="text-[12px] text-white font-medium" style={{ fontFamily: "var(--font-dm-sans)" }}>T</span>
          </div>
          <div className="flex-1">
            <p className="text-[14px] text-[#FFF8F3] font-medium" style={{ fontFamily: "var(--font-dm-sans)" }}>Tanya</p>
          </div>
          <p className="text-[10px] text-[#FFF8F3]/20" style={{ fontFamily: "var(--font-dm-sans)" }}>iMessage</p>
        </div>

        {/* Messages */}
        <div
          className="flex-1 px-4 py-3 flex flex-col gap-2.5 overflow-y-auto"
          style={{ background: "rgba(255, 248, 243, 0.02)" }}
        >
          <div className="flex justify-start">
            <div className="bg-[#2A1222] rounded-2xl rounded-bl-sm px-3.5 py-2 max-w-[220px]">
              <p className="text-[13px] text-[#FFF8F3]/70" style={{ fontFamily: "var(--font-dm-sans)" }}>
                That restaurant was incredible. We should go back sometime
              </p>
              <p className="text-[10px] text-[#FFF8F3]/20 mt-1 text-right" style={{ fontFamily: "var(--font-dm-sans)" }}>7:23 PM</p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-[#6B1D4A]/50 rounded-2xl rounded-br-sm px-3.5 py-2 max-w-[220px]">
              <p className="text-[13px] text-[#FFF8F3]/80" style={{ fontFamily: "var(--font-dm-sans)" }}>
                Agreed! The pasta was unreal
              </p>
              <p className="text-[10px] text-[#FFF8F3]/20 mt-1 text-right" style={{ fontFamily: "var(--font-dm-sans)" }}>7:24 PM</p>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-[#2A1222] rounded-2xl rounded-bl-sm px-3.5 py-2 max-w-[220px]">
              <p className="text-[13px] text-[#FFF8F3]/70" style={{ fontFamily: "var(--font-dm-sans)" }}>
                So what are you up to this weekend? 👀
              </p>
              <p className="text-[10px] text-[#FFF8F3]/20 mt-1 text-right" style={{ fontFamily: "var(--font-dm-sans)" }}>7:26 PM</p>
            </div>
          </div>
        </div>

        {/* Text input bar */}
        <div
          className="px-3 py-2"
          style={{ background: "rgba(255, 248, 243, 0.03)", borderTop: "1px solid rgba(255, 248, 243, 0.05)" }}
        >
          <div className="flex items-center gap-2 rounded-full px-3 py-2" style={{ background: "rgba(255, 248, 243, 0.05)" }}>
            <p className="flex-1 text-[13px] text-[#FFF8F3]/20" style={{ fontFamily: "var(--font-dm-sans)" }}>
              {coachState === "refined" ? "I had such a great time! Would you want to check out that new place on 5th this Saturday?" : "iMessage"}
            </p>
            {coachState === "refined" && (
              <motion.div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #C4956A, #D4A574)" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1A0A14" strokeWidth="3" strokeLinecap="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </motion.div>
            )}
          </div>
        </div>

        {/* ===== COACH KEYBOARD AREA ===== */}
        {/* This replaces the standard keyboard entirely */}
        <AnimatePresence mode="wait">
          {showStandardKb ? (
            /* Standard keyboard (when user switches back) */
            <motion.div
              key="standard"
              className="rounded-b-2xl pt-2 pb-3 px-1.5"
              style={{ background: "linear-gradient(180deg, #1C0E17, #150A11)", borderTop: "1px solid rgba(255,248,243,0.05)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[
                ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
                ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
                ["⇧", "z", "x", "c", "v", "b", "n", "m", "⌫"],
              ].map((row, ri) => (
                <div key={ri} className="flex justify-center gap-[3px] mb-[4px]">
                  {row.map((k) => (
                    <div key={k} className="flex items-center justify-center rounded-md text-[12px] text-[#FFF8F3]/40"
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        width: k === "⇧" || k === "⌫" ? "38px" : ri === 1 ? "30px" : "28px",
                        height: "34px",
                        background: "rgba(255,248,243,0.05)",
                      }}>
                      {k}
                    </div>
                  ))}
                </div>
              ))}
              <div className="flex justify-center gap-[3px]">
                <div className="flex items-center justify-center rounded-md text-[12px] text-[#FFF8F3]/40 w-[38px] h-[34px]"
                  style={{ background: "rgba(255,248,243,0.05)", fontFamily: "var(--font-dm-sans)" }}>123</div>
                <motion.button
                  onClick={() => setShowStandardKb(false)}
                  className="flex items-center justify-center rounded-md w-[34px] h-[34px]"
                  style={{ background: "rgba(196, 149, 106, 0.15)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4956A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </motion.button>
                <div className="flex-1 flex items-center justify-center rounded-md text-[12px] text-[#FFF8F3]/25 h-[34px]"
                  style={{ background: "rgba(255,248,243,0.05)", fontFamily: "var(--font-dm-sans)" }}>space</div>
                <div className="flex items-center justify-center rounded-md text-[12px] text-[#FFF8F3]/25 w-[50px] h-[34px]"
                  style={{ background: "rgba(255,248,243,0.05)", fontFamily: "var(--font-dm-sans)" }}>return</div>
              </div>
            </motion.div>
          ) : (
            /* Coach keyboard */
            <motion.div
              key="coach"
              className="rounded-b-2xl"
              style={{
                background: "linear-gradient(180deg, #1C0E17, #150A11)",
                borderTop: "1px solid rgba(196, 149, 106, 0.15)",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Coach bar */}
              <div className="flex items-center gap-2 px-4 pt-3 pb-2">
                <motion.div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #C4956A, #6B1D4A)" }}
                  animate={coachState === "catching-up" ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  <span className="text-[9px]">✦</span>
                </motion.div>
                <span className="text-[12px] text-[#C4956A] font-medium" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  Coach
                </span>
                <span className="text-[10px] ml-auto" style={{
                  fontFamily: "var(--font-dm-sans)",
                  color: coachState === "catching-up" ? "rgba(255,248,243,0.25)" : "#4A7C59",
                }}>
                  {coachState === "catching-up" ? "reading..." : "in context"}
                </span>
              </div>

              {/* State: Catching up */}
              <AnimatePresence mode="wait">
                {coachState === "catching-up" && (
                  <motion.div
                    key="catching-up"
                    className="px-4 pb-4 flex flex-col items-center py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex gap-1.5 mb-3">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-[#C4956A]"
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12 }}
                        />
                      ))}
                    </div>
                    <p className="text-[12px] text-[#FFF8F3]/25" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      Catching up on the conversation...
                    </p>
                  </motion.div>
                )}

                {/* State: Needs context (paste screenshot) */}
                {coachState === "needs-context" && (
                  <motion.div
                    key="needs-context"
                    className="px-4 pb-4"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-[12px] text-[#FFF8F3]/35 mb-3 leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      I need to see what happened since we last talked. Help me catch up?
                    </p>

                    <div className="flex gap-2 mb-3">
                      <motion.button
                        onClick={() => setCoachState("catching-up")}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl"
                        style={{
                          background: "rgba(196, 149, 106, 0.1)",
                          border: "1px solid rgba(196, 149, 106, 0.2)",
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4956A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        <span className="text-[12px] text-[#C4956A]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                          Paste screenshot
                        </span>
                      </motion.button>
                      <motion.button
                        onClick={() => setCoachState("catching-up")}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl"
                        style={{
                          background: "rgba(255, 248, 243, 0.04)",
                          border: "1px solid rgba(255, 248, 243, 0.08)",
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFF8F3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        <span className="text-[12px] text-[#FFF8F3]/40" style={{ fontFamily: "var(--font-dm-sans)" }}>
                          Paste text
                        </span>
                      </motion.button>
                    </div>

                    <p className="text-[10px] text-[#FFF8F3]/15 text-center" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      Screenshot the chat and paste it here — Coach will read it instantly
                    </p>
                  </motion.div>
                )}

                {/* State: Recommendation ready */}
                {coachState === "recommendation" && (
                  <motion.div
                    key="recommendation"
                    className="px-4 pb-3"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Context insight */}
                    <p className="text-[11px] text-[#FFF8F3]/30 mb-2.5 leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      They asked about your weekend — that&apos;s an opening. Be specific, suggest a plan.
                    </p>

                    {/* Recommended response */}
                    <motion.div
                      className="rounded-xl px-3.5 py-3 mb-2.5"
                      style={{
                        background: "linear-gradient(135deg, rgba(196, 149, 106, 0.1), rgba(107, 29, 74, 0.1))",
                        border: "1px solid rgba(196, 149, 106, 0.2)",
                      }}
                    >
                      <p className="text-[13px] text-[#FFF8F3]/70 leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        I had such a great time! Would you want to check out that new place on 5th this Saturday?
                      </p>
                    </motion.div>

                    {/* Actions */}
                    <div className="flex gap-2 mb-2">
                      <motion.button
                        onClick={() => setCoachState("refined")}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl"
                        style={{ background: "linear-gradient(135deg, #C4956A, #D4A574)" }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1A0A14" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                        <span className="text-[13px] text-[#1A0A14] font-medium" style={{ fontFamily: "var(--font-dm-sans)" }}>
                          Use this
                        </span>
                      </motion.button>
                      <motion.button
                        onClick={() => setCoachState("refining")}
                        className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl"
                        style={{
                          background: "rgba(255, 248, 243, 0.05)",
                          border: "1px solid rgba(255, 248, 243, 0.1)",
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span className="text-[13px] text-[#FFF8F3]/50" style={{ fontFamily: "var(--font-dm-sans)" }}>
                          Refine
                        </span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* State: Refining (chat with Coach) */}
                {coachState === "refining" && (
                  <motion.div
                    key="refining"
                    className="px-4 pb-3"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Mini chat thread with Coach */}
                    <div className="flex flex-col gap-2 mb-3 max-h-[120px] overflow-y-auto">
                      {/* Coach's original */}
                      <div className="flex gap-2 items-start">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: "linear-gradient(135deg, #C4956A, #6B1D4A)" }}>
                          <span className="text-[7px]">✦</span>
                        </div>
                        <div className="rounded-lg px-2.5 py-1.5" style={{ background: "rgba(196, 149, 106, 0.08)" }}>
                          <p className="text-[11px] text-[#FFF8F3]/50 leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                            I had such a great time! Would you want to check out that new place on 5th this Saturday?
                          </p>
                        </div>
                      </div>
                      {/* User's refinement */}
                      <div className="flex gap-2 items-start justify-end">
                        <div className="rounded-lg px-2.5 py-1.5" style={{ background: "rgba(107, 29, 74, 0.2)" }}>
                          <p className="text-[11px] text-[#FFF8F3]/60 leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                            make it more casual, less intense
                          </p>
                        </div>
                      </div>
                      {/* Coach's refined response */}
                      <div className="flex gap-2 items-start">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: "linear-gradient(135deg, #C4956A, #6B1D4A)" }}>
                          <span className="text-[7px]">✦</span>
                        </div>
                        <div className="rounded-lg px-2.5 py-1.5" style={{ background: "rgba(196, 149, 106, 0.08)", border: "1px solid rgba(196, 149, 106, 0.15)" }}>
                          <p className="text-[11px] text-[#FFF8F3]/60 leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                            haha same! have you tried that new spot on 5th? been wanting to go
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Input to talk to Coach */}
                    <div
                      className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-2"
                      style={{
                        background: "rgba(255, 248, 243, 0.04)",
                        border: "1px solid rgba(255, 248, 243, 0.08)",
                      }}
                    >
                      <p className="flex-1 text-[12px] text-[#FFF8F3]/20" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        Tell Coach how to adjust...
                      </p>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4956A" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5">
                        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => setCoachState("refined")}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl"
                        style={{ background: "linear-gradient(135deg, #C4956A, #D4A574)" }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span className="text-[12px] text-[#1A0A14] font-medium" style={{ fontFamily: "var(--font-dm-sans)" }}>
                          Use refined version
                        </span>
                      </motion.button>
                      <motion.button
                        onClick={() => setCoachState("recommendation")}
                        className="flex items-center justify-center px-3 py-2.5 rounded-xl"
                        style={{ background: "rgba(255, 248, 243, 0.05)" }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF8F3" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.3">
                          <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                        </svg>
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* State: Refined — message placed in text field */}
                {coachState === "refined" && (
                  <motion.div
                    key="refined"
                    className="px-4 pb-3"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center gap-2 mb-3 py-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A7C59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <p className="text-[12px] text-[#4A7C59]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        Message ready to send
                      </p>
                    </div>

                    <p className="text-[11px] text-[#FFF8F3]/25 text-center leading-relaxed mb-3" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      Your message has been placed in the text field above. Hit send when ready, or tap below for a new suggestion.
                    </p>

                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => setCoachState("recommendation")}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl"
                        style={{
                          background: "rgba(255, 248, 243, 0.05)",
                          border: "1px solid rgba(255, 248, 243, 0.08)",
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span className="text-[12px] text-[#FFF8F3]/40" style={{ fontFamily: "var(--font-dm-sans)" }}>
                          New suggestion
                        </span>
                      </motion.button>
                      <motion.button
                        onClick={() => setShowStandardKb(true)}
                        className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl"
                        style={{
                          background: "rgba(255, 248, 243, 0.05)",
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFF8F3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.35">
                          <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                        <span className="text-[10px] text-[#FFF8F3]/25" style={{ fontFamily: "var(--font-dm-sans)" }}>
                          keyboard
                        </span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Globe switcher at bottom — always visible in coach mode */}
              {coachState !== "catching-up" && coachState !== "needs-context" && (
                <div className="flex items-center justify-center gap-1.5 pb-3 pt-1">
                  <motion.button
                    onClick={() => setShowStandardKb(true)}
                    className="opacity-25 hover:opacity-50 transition-opacity"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF8F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom safe area */}
      <div className="h-[8px] md:h-[30px]" />
    </div>
  );
}
