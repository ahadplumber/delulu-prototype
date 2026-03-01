"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface KeyboardFeatureScreenProps {
  onNext: () => void;
}

// step 0: standard keyboard, globe pulses
// step 1: keyboard picker popup (iOS style)
// step 2: Coach loading ("reading conversation...")
// step 3: Coach recommendation ready
// step 4: Refine — user types feedback
// step 4.5: Coach thinking on refinement
// step 5: Refined recommendation
// step 6: Message sent — appears in chat

const chatHistory = [
  { from: "you", text: "that view from your rooftop was unreal" },
  { from: "tanya", text: "the view was okay. I was distracted by something better 😏" },
  { from: "you", text: "smooth talker" },
  { from: "tanya", text: "only when it's worth it" },
  { from: "you", text: "careful, I might start believing you" },
  { from: "tanya", text: "that's the plan 😌" },
];

const latestMessage = { from: "tanya", text: "hey, I had a really great time last night 😊" };

const firstSuggestion = "I had an amazing time too! I'd love to do that again — are you free this weekend?";

const refineResponses: Record<string, string> = {
  "more flirty": "I haven't stopped thinking about it either... when can I see you again? 😏",
  "play it cool": "Yeah it was fun. We should do something again sometime",
  "be direct": "I really like you. Are you free Saturday? I want to take you somewhere special.",
};

export default function KeyboardFeatureScreen({
  onNext,
}: KeyboardFeatureScreenProps) {
  const [step, setStep] = useState(0);
  const [sentMessage, setSentMessage] = useState<string | null>(null);
  const [refineInput, setRefineInput] = useState("");
  const [refineRequest, setRefineRequest] = useState("");
  const [refinedSuggestion, setRefinedSuggestion] = useState("");
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const refineTimerRef = useRef<NodeJS.Timeout | null>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const refineInputRef = useRef<HTMLInputElement>(null);

  // Auto-advance from loading to recommendation
  useEffect(() => {
    if (step === 2) {
      loadingTimerRef.current = setTimeout(() => setStep(3), 1800);
    }
    return () => {
      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    };
  }, [step]);

  // Auto-advance from refine-thinking to refined result
  useEffect(() => {
    if (step === 4.5) {
      refineTimerRef.current = setTimeout(() => setStep(5), 1200);
    }
    return () => {
      if (refineTimerRef.current) clearTimeout(refineTimerRef.current);
    };
  }, [step]);

  // Scroll chat to bottom when sent
  useEffect(() => {
    if (sentMessage && chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [sentMessage]);

  // Focus input when entering refine step
  useEffect(() => {
    if (step === 4 && refineInputRef.current) {
      refineInputRef.current.focus();
    }
  }, [step]);

  const handleGlobeTap = () => {
    if (step === 0) setStep(1);
    else if (step >= 3) setStep(0);
  };

  const handlePickKeyboard = (kb: string) => {
    if (kb === "delulu") {
      setStep(2);
    } else {
      setStep(0);
    }
  };

  const handleSend = (message: string) => {
    setSentMessage(message);
    setStep(6);
  };

  const handleRefine = () => {
    setRefineInput("");
    setStep(4); // show text input
  };

  const submitRefine = (text: string) => {
    if (!text.trim()) return;
    setRefineRequest(text.trim());
    // Find closest matching response or use a default
    const key = Object.keys(refineResponses).find((k) =>
      text.toLowerCase().includes(k)
    );
    setRefinedSuggestion(
      key
        ? refineResponses[key]
        : refineResponses["more flirty"] // fallback
    );
    setStep(4.5); // Coach thinking
  };

  const subtitleText =
    step === 0
      ? "Hold the globe icon to switch keyboards."
      : step === 1
      ? "Select Delulu Coach from your keyboards."
      : step === 2
      ? "Coach is reading the conversation..."
      : step === 6
      ? "Sent. They'll never know."
      : step === 4
      ? "Tell Coach how to adjust it."
      : step === 4.5
      ? "Coach is refining..."
      : step === 5
      ? "How about this instead?"
      : "Coach has a recommendation ready.";

  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #1A0A14 0%, #2A1222 50%, #1A0A14 100%)",
      }}
    >
      {/* Ambient glow */}
      <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-[350px] h-[250px] bg-[#6B1D4A]/20 blur-[100px] rounded-full" />

      {/* Header */}
      <div className="flex flex-col items-center pt-[72px] px-6 z-10 shrink-0">
        <motion.p
          className="text-[12px] tracking-[0.2em] uppercase text-[#C4956A]/60 mb-3"
          style={{ fontFamily: "var(--font-dm-sans)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          The magic
        </motion.p>

        <motion.h2
          className="text-[26px] text-[#FFF8F3] text-center leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="italic">Coach</span> replaces your keyboard
        </motion.h2>

        <motion.p
          key={subtitleText}
          className="text-[14px] text-[#FFF8F3]/40 text-center mt-3 max-w-[280px] leading-relaxed"
          style={{ fontFamily: "var(--font-dm-sans)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {subtitleText}
        </motion.p>
      </div>

      {/* Interactive demo */}
      <motion.div
        className="flex-1 flex flex-col justify-end px-4 pb-[60px] z-10 min-h-0"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Chat area — scrollable */}
        <div className="rounded-t-2xl bg-[#0D0609] border border-[#FFF8F3]/5 border-b-0 flex flex-col overflow-hidden">
          {/* Chat header */}
          <div className="flex items-center gap-2 px-4 pt-3 pb-2 shrink-0" style={{ borderBottom: "1px solid rgba(255,248,243,0.05)" }}>
            <div className="w-6 h-6 rounded-full bg-[#3D0C2B] flex items-center justify-center">
              <span className="text-[10px] text-[#FFF8F3]/60" style={{ fontFamily: "var(--font-dm-sans)" }}>A</span>
            </div>
            <span className="text-[13px] text-[#FFF8F3]/60 font-medium" style={{ fontFamily: "var(--font-dm-sans)" }}>Tanya</span>
          </div>

          {/* Scrollable messages */}
          <div ref={chatScrollRef} className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2" style={{ maxHeight: "160px" }}>
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "you" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-2xl px-3.5 py-2 max-w-[200px] ${
                    msg.from === "you"
                      ? "bg-[#1D5BA6] rounded-br-sm"
                      : "bg-[#2A1222] rounded-bl-sm"
                  }`}
                >
                  <p className="text-[12px] text-[#FFF8F3]/70 leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}

            {/* Time separator */}
            <div className="flex items-center justify-center py-1">
              <span className="text-[10px] text-[#FFF8F3]/15" style={{ fontFamily: "var(--font-dm-sans)" }}>Today</span>
            </div>

            {/* Latest message from Tanya */}
            <div className="flex justify-start">
              <div className="bg-[#2A1222] rounded-2xl rounded-bl-sm px-3.5 py-2 max-w-[200px]">
                <p className="text-[12px] text-[#FFF8F3]/70 leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  {latestMessage.text}
                </p>
              </div>
            </div>

            {/* Sent message — appears after user taps Send */}
            <AnimatePresence>
              {sentMessage && (
                <motion.div
                  className="flex justify-end"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <div className="bg-[#1D5BA6] rounded-2xl rounded-br-sm px-3.5 py-2 max-w-[200px]">
                    <p className="text-[12px] text-[#FFF8F3]/90 leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      {sentMessage}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Text field */}
          <div className="px-3 pb-2 shrink-0">
            <div
              className="flex items-center gap-2 rounded-full px-3.5 py-2"
              style={{ background: "rgba(255, 248, 243, 0.05)", border: "1px solid rgba(255, 248, 243, 0.08)" }}
            >
              <p className="flex-1 text-[12px] text-[#FFF8F3]/25" style={{ fontFamily: "var(--font-dm-sans)" }}>
                iMessage
              </p>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF8F3" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Keyboard area */}
        <div
          className="rounded-b-2xl overflow-hidden relative"
          style={{
            background: "linear-gradient(180deg, #1C0E17 0%, #150A11 100%)",
            border: "1px solid rgba(255,248,243,0.05)",
            borderTop: "none",
            minHeight: "220px",
          }}
        >
          <AnimatePresence mode="wait">
            {/* ===== STEP 0: Standard keyboard ===== */}
            {step === 0 && (
              <motion.div
                key="standard-kb"
                className="pt-2 pb-3 px-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {[
                  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
                  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
                  ["⇧", "z", "x", "c", "v", "b", "n", "m", "⌫"],
                ].map((row, ri) => (
                  <div key={ri} className="flex justify-center gap-[4px] mb-[5px]">
                    {row.map((k) => (
                      <div key={k} className="flex items-center justify-center rounded-md text-[13px] text-[#FFF8F3]/50"
                        style={{
                          fontFamily: "var(--font-dm-sans)",
                          width: k === "⇧" || k === "⌫" ? "42px" : ri === 1 ? "33px" : "31px",
                          height: "38px",
                          background: "rgba(255, 248, 243, 0.06)",
                        }}>
                        {k}
                      </div>
                    ))}
                  </div>
                ))}
                <div className="flex justify-center gap-[4px]">
                  <div className="flex items-center justify-center rounded-md text-[13px] text-[#FFF8F3]/50 w-[42px] h-[38px]"
                    style={{ background: "rgba(255,248,243,0.06)", fontFamily: "var(--font-dm-sans)" }}>123</div>
                  <motion.button
                    onClick={handleGlobeTap}
                    className="flex items-center justify-center rounded-md w-[34px] h-[38px] relative cursor-pointer"
                    style={{ background: "rgba(196, 149, 106, 0.15)", border: "1px solid rgba(196, 149, 106, 0.3)" }}
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C4956A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <motion.div
                      className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg"
                      style={{ background: "rgba(196, 149, 106, 0.2)", border: "1px solid rgba(196, 149, 106, 0.3)" }}
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <p className="text-[10px] text-[#C4956A] font-medium" style={{ fontFamily: "var(--font-dm-sans)" }}>hold</p>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                        style={{ background: "rgba(196, 149, 106, 0.2)", borderRight: "1px solid rgba(196, 149, 106, 0.3)", borderBottom: "1px solid rgba(196, 149, 106, 0.3)" }} />
                    </motion.div>
                  </motion.button>
                  <div className="flex-1 flex items-center justify-center rounded-md text-[13px] text-[#FFF8F3]/30 h-[38px]"
                    style={{ background: "rgba(255,248,243,0.06)", fontFamily: "var(--font-dm-sans)" }}>space</div>
                  <div className="flex items-center justify-center rounded-md text-[13px] text-[#FFF8F3]/30 w-[50px] h-[38px]"
                    style={{ background: "rgba(255,248,243,0.06)", fontFamily: "var(--font-dm-sans)" }}>return</div>
                </div>
              </motion.div>
            )}

            {/* ===== STEP 1: iOS Keyboard picker popup ===== */}
            {step === 1 && (
              <motion.div
                key="picker"
                className="absolute inset-0 flex items-end justify-center pb-3 px-3 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-b-2xl" onClick={() => setStep(0)} />

                <motion.div
                  className="relative w-full rounded-xl overflow-hidden"
                  style={{
                    background: "rgba(60, 60, 67, 0.85)",
                    backdropFilter: "blur(40px)",
                    WebkitBackdropFilter: "blur(40px)",
                  }}
                  initial={{ y: 30, opacity: 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 20, opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                >
                  <button onClick={() => setStep(0)} className="w-full px-4 py-3 text-left"
                    style={{ borderBottom: "0.5px solid rgba(255,255,255,0.12)" }}>
                    <span className="text-[15px] text-white/90" style={{ fontFamily: "var(--font-dm-sans)" }}>Keyboard Settings...</span>
                  </button>
                  <button onClick={() => setStep(0)} className="w-full px-4 py-3 text-left"
                    style={{ borderBottom: "0.5px solid rgba(255,255,255,0.12)" }}>
                    <span className="text-[15px] text-white/90" style={{ fontFamily: "var(--font-dm-sans)" }}>Emoji</span>
                  </button>
                  <button onClick={() => setStep(0)} className="w-full px-4 py-3 text-left"
                    style={{ background: "rgba(0, 122, 255, 0.85)", borderBottom: "0.5px solid rgba(255,255,255,0.12)" }}>
                    <span className="text-[15px] text-white font-medium" style={{ fontFamily: "var(--font-dm-sans)" }}>English</span>
                  </button>
                  <motion.button
                    onClick={() => handlePickKeyboard("delulu")}
                    className="w-full px-4 py-3.5 text-left flex items-center gap-2.5 relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, rgba(196, 149, 106, 0.18), rgba(107, 29, 74, 0.15))" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Pulsing border glow */}
                    <motion.div
                      className="absolute inset-0 rounded-sm pointer-events-none"
                      style={{ border: "1.5px solid rgba(196, 149, 106, 0.4)" }}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.span
                      className="text-[14px]"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      ✦
                    </motion.span>
                    <div className="flex-1">
                      <span className="text-[15px] text-[#C4956A] font-semibold" style={{ fontFamily: "var(--font-dm-sans)" }}>Delulu Coach</span>
                      <span className="text-[12px] text-white/40 ml-1.5" style={{ fontFamily: "var(--font-dm-sans)" }}>English</span>
                    </div>
                    <motion.span
                      className="text-[10px] text-[#C4956A] font-medium px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(196, 149, 106, 0.15)", border: "1px solid rgba(196, 149, 106, 0.3)", fontFamily: "var(--font-dm-sans)" }}
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      tap
                    </motion.span>
                  </motion.button>
                  <div className="flex items-center justify-center gap-6 py-3" style={{ borderTop: "0.5px solid rgba(255,255,255,0.12)" }}>
                    <svg width="22" height="18" viewBox="0 0 24 20" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4">
                      <rect x="1" y="3" width="22" height="14" rx="2" />
                      <line x1="5" y1="7" x2="7" y2="7" /><line x1="9" y1="7" x2="11" y2="7" /><line x1="13" y1="7" x2="15" y2="7" /><line x1="17" y1="7" x2="19" y2="7" />
                      <line x1="7" y1="13" x2="17" y2="13" />
                    </svg>
                    <div className="px-3 py-1.5 rounded-md" style={{ background: "rgba(0, 122, 255, 0.85)" }}>
                      <svg width="22" height="18" viewBox="0 0 24 20" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="3" width="22" height="14" rx="2" />
                        <line x1="5" y1="7" x2="7" y2="7" /><line x1="9" y1="7" x2="11" y2="7" /><line x1="13" y1="7" x2="15" y2="7" /><line x1="17" y1="7" x2="19" y2="7" />
                        <line x1="7" y1="13" x2="17" y2="13" />
                      </svg>
                    </div>
                    <svg width="22" height="18" viewBox="0 0 24 20" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.4">
                      <rect x="1" y="3" width="22" height="14" rx="2" />
                      <line x1="5" y1="7" x2="7" y2="7" /><line x1="9" y1="7" x2="11" y2="7" /><line x1="13" y1="7" x2="15" y2="7" /><line x1="17" y1="7" x2="19" y2="7" />
                      <line x1="7" y1="13" x2="17" y2="13" />
                    </svg>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* ===== STEPS 2-3: Coach keyboard — loading & recommendation ===== */}
            {(step === 2 || step === 3) && (
              <motion.div
                key="coach-kb"
                className="p-4 flex flex-col"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Coach header */}
                <div className="flex items-center gap-2 mb-3">
                  <motion.div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #C4956A, #6B1D4A)" }}
                    animate={step === 2 ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1.5, repeat: step === 2 ? Infinity : 0, ease: "easeInOut" }}
                  >
                    <span className="text-[11px]">✦</span>
                  </motion.div>
                  <span className="text-[13px] text-[#C4956A] font-medium" style={{ fontFamily: "var(--font-dm-sans)" }}>Coach</span>
                  <AnimatePresence mode="wait">
                    {step === 2 && (
                      <motion.span key="reading" className="text-[11px] text-[#FFF8F3]/30" style={{ fontFamily: "var(--font-dm-sans)" }}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        reading conversation...
                      </motion.span>
                    )}
                    {step === 3 && (
                      <motion.span key="ready" className="text-[11px] text-[#4A7C59]" style={{ fontFamily: "var(--font-dm-sans)" }}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        ready
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {step === 2 && (
                  <motion.div className="flex-1 flex flex-col items-center justify-center py-6"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div key={i} className="w-2 h-2 rounded-full bg-[#C4956A]"
                          animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
                      ))}
                    </div>
                    <p className="text-[12px] text-[#FFF8F3]/25 mt-3" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      Understanding the vibe...
                    </p>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <p className="text-[11px] text-[#FFF8F3]/30 mb-3 leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      They enjoyed last night and are signaling interest. Match their energy, and make a move.
                    </p>
                    <div className="rounded-xl px-4 py-3 mb-2"
                      style={{ background: "linear-gradient(135deg, rgba(196, 149, 106, 0.12), rgba(107, 29, 74, 0.12))", border: "1px solid rgba(196, 149, 106, 0.25)" }}>
                      <p className="text-[13px] text-[#FFF8F3]/75 leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {firstSuggestion}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleSend(firstSuggestion)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl cursor-pointer"
                        style={{ background: "linear-gradient(135deg, #C4956A, #D4A574)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A0A14" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                        <span className="text-[13px] text-[#1A0A14] font-medium" style={{ fontFamily: "var(--font-dm-sans)" }}>Send this</span>
                      </motion.button>
                      <motion.button
                        onClick={handleRefine}
                        className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl cursor-pointer"
                        style={{ background: "rgba(255, 248, 243, 0.05)", border: "1px solid rgba(255, 248, 243, 0.1)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-[13px] text-[#FFF8F3]/50" style={{ fontFamily: "var(--font-dm-sans)" }}>Refine</span>
                      </motion.button>
                    </div>
                    <motion.button onClick={handleGlobeTap}
                      className="flex items-center justify-center gap-1.5 mt-3 w-full opacity-40 hover:opacity-60 transition-opacity cursor-pointer"
                      whileTap={{ scale: 0.95 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFF8F3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      <span className="text-[10px] text-[#FFF8F3]/30" style={{ fontFamily: "var(--font-dm-sans)" }}>switch to regular keyboard</span>
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* ===== STEP 4: Refine — user types feedback ===== */}
            {step === 4 && (
              <motion.div
                key="refine-input"
                className="p-4 flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #C4956A, #6B1D4A)" }}>
                    <span className="text-[11px]">✦</span>
                  </div>
                  <span className="text-[13px] text-[#C4956A] font-medium" style={{ fontFamily: "var(--font-dm-sans)" }}>Coach</span>
                </div>

                <p className="text-[12px] text-[#FFF8F3]/40 mb-3" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  How should I adjust this?
                </p>

                {/* Quick-pick chips */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {["more flirty", "play it cool", "be direct"].map((chip) => (
                    <motion.button
                      key={chip}
                      onClick={() => submitRefine(chip)}
                      className="px-3 py-1.5 rounded-full text-[11px] cursor-pointer"
                      style={{
                        background: "rgba(196, 149, 106, 0.1)",
                        border: "1px solid rgba(196, 149, 106, 0.25)",
                        color: "#C4956A",
                        fontFamily: "var(--font-dm-sans)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {chip}
                    </motion.button>
                  ))}
                </div>

                {/* Text input */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitRefine(refineInput);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={refineInputRef}
                    type="text"
                    value={refineInput}
                    onChange={(e) => setRefineInput(e.target.value)}
                    placeholder="or type your own..."
                    className="flex-1 bg-transparent rounded-xl px-3.5 py-2.5 text-[12px] text-[#FFF8F3]/70 placeholder-[#FFF8F3]/20 outline-none"
                    style={{
                      border: "1px solid rgba(255, 248, 243, 0.1)",
                      fontFamily: "var(--font-dm-sans)",
                    }}
                  />
                  <motion.button
                    type="submit"
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 cursor-pointer"
                    style={{
                      background: refineInput.trim()
                        ? "linear-gradient(135deg, #C4956A, #D4A574)"
                        : "rgba(255, 248, 243, 0.05)",
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke={refineInput.trim() ? "#1A0A14" : "rgba(255,248,243,0.25)"}
                      strokeWidth="2.5" strokeLinecap="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </motion.button>
                </form>
              </motion.div>
            )}

            {/* ===== STEP 4.5: Coach thinking on refinement ===== */}
            {step === 4.5 && (
              <motion.div
                key="refine-thinking"
                className="p-4 flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <motion.div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #C4956A, #6B1D4A)" }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="text-[11px]">✦</span>
                  </motion.div>
                  <span className="text-[13px] text-[#C4956A] font-medium" style={{ fontFamily: "var(--font-dm-sans)" }}>Coach</span>
                  <span className="text-[11px] text-[#FFF8F3]/30" style={{ fontFamily: "var(--font-dm-sans)" }}>refining...</span>
                </div>

                {/* User's refine request */}
                <div className="flex justify-end mb-3">
                  <div className="rounded-xl px-3.5 py-2 bg-[#1D5BA6]/40 max-w-[200px]">
                    <p className="text-[12px] text-[#FFF8F3]/70" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      {refineRequest}
                    </p>
                  </div>
                </div>

                {/* Loading dots */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1.5 py-4">
                    {[0, 1, 2].map((i) => (
                      <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-[#C4956A]"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ===== STEP 5: Refined recommendation ===== */}
            {step === 5 && (
              <motion.div
                key="refined"
                className="p-4 flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #C4956A, #6B1D4A)" }}>
                    <span className="text-[11px]">✦</span>
                  </div>
                  <span className="text-[13px] text-[#C4956A] font-medium" style={{ fontFamily: "var(--font-dm-sans)" }}>Coach</span>
                  <motion.span className="text-[11px] text-[#4A7C59]" style={{ fontFamily: "var(--font-dm-sans)" }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    refined
                  </motion.span>
                </div>

                {/* User's request shown small */}
                <div className="flex justify-end mb-2">
                  <div className="rounded-xl px-3 py-1.5 bg-[#1D5BA6]/20 max-w-[160px]">
                    <p className="text-[10px] text-[#FFF8F3]/40" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      {refineRequest}
                    </p>
                  </div>
                </div>

                {/* Refined suggestion */}
                <motion.div
                  className="rounded-xl px-4 py-3 mb-2"
                  style={{ background: "linear-gradient(135deg, rgba(196, 149, 106, 0.15), rgba(107, 29, 74, 0.15))", border: "1px solid rgba(196, 149, 106, 0.3)" }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <p className="text-[13px] text-[#FFF8F3]/80 leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    {refinedSuggestion}
                  </p>
                </motion.div>

                <div className="flex gap-2">
                  <motion.button
                    onClick={() => handleSend(refinedSuggestion)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl cursor-pointer"
                    style={{ background: "linear-gradient(135deg, #C4956A, #D4A574)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A0A14" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    <span className="text-[13px] text-[#1A0A14] font-medium" style={{ fontFamily: "var(--font-dm-sans)" }}>Send this</span>
                  </motion.button>
                  <motion.button
                    onClick={() => setStep(3)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl cursor-pointer"
                    style={{ background: "rgba(255, 248, 243, 0.05)", border: "1px solid rgba(255, 248, 243, 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-[13px] text-[#FFF8F3]/50" style={{ fontFamily: "var(--font-dm-sans)" }}>Back</span>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ===== STEP 6: Sent — success state ===== */}
            {step === 6 && (
              <motion.div
                key="sent"
                className="p-4 flex flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ minHeight: "180px" }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{ background: "linear-gradient(135deg, rgba(74, 124, 89, 0.2), rgba(74, 124, 89, 0.05))", border: "1px solid rgba(74, 124, 89, 0.3)" }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.2 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4A7C59" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
                <motion.p
                  className="text-[14px] text-[#FFF8F3]/60 font-medium mb-1"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Message sent
                </motion.p>
                <motion.p
                  className="text-[11px] text-[#FFF8F3]/25"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  They&apos;ll never know Coach helped
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Picker overlay keyboard behind */}
          {step === 1 && (
            <div className="absolute inset-0 pt-2 pb-3 px-1.5 opacity-30 pointer-events-none">
              {[
                ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
                ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
                ["⇧", "z", "x", "c", "v", "b", "n", "m", "⌫"],
              ].map((row, ri) => (
                <div key={ri} className="flex justify-center gap-[4px] mb-[5px]">
                  {row.map((k) => (
                    <div key={k} className="flex items-center justify-center rounded-md text-[13px] text-[#FFF8F3]/50"
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        width: k === "⇧" || k === "⌫" ? "42px" : ri === 1 ? "33px" : "31px",
                        height: "38px",
                        background: "rgba(255, 248, 243, 0.06)",
                      }}>
                      {k}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Continue */}
        <motion.button
          onClick={onNext}
          className="w-full py-[16px] mt-5 rounded-2xl text-[15px] font-medium tracking-wide text-[#1A0A14]"
          style={{ fontFamily: "var(--font-dm-sans)", background: "linear-gradient(135deg, #C4956A 0%, #D4A574 100%)" }}
          whileTap={{ scale: 0.97 }}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}
