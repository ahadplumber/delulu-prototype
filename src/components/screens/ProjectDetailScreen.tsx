"use client";

import { motion } from "framer-motion";

interface ProjectDetailScreenProps {
  projectId: string;
  onBack: () => void;
  onOpenKeyboard: () => void;
}

const projectData: Record<
  string,
  {
    name: string;
    initial: string;
    score: number;
    doingRight: string[];
    toImprove: string[];
    patterns: { label: string; value: number; color: string }[];
    recommendation: string;
  }
> = {
  tanya: {
    name: "Tanya",
    initial: "T",
    score: 78,
    doingRight: [
      "Responding within a comfortable window — not too eager, not distant",
      "Great use of humor — they laugh at your jokes consistently",
      "You ask thoughtful follow-up questions",
    ],
    toImprove: [
      "You double-text when anxious — let silences breathe",
      "Your messages get shorter when you're unsure — stay present",
      "Try initiating plans more — they always say yes",
    ],
    patterns: [
      { label: "Emotional depth", value: 82, color: "#4A7C59" },
      { label: "Response energy", value: 71, color: "#C4956A" },
      { label: "Initiative balance", value: 45, color: "#8A2E5E" },
      { label: "Flirtation", value: 68, color: "#C4956A" },
    ],
    recommendation:
      "You have strong chemistry here. The main thing holding you back is confidence — when you feel uncertain, you pull away. Lean in instead. Suggest a specific plan for this weekend.",
  },
  jordan: {
    name: "Jordan",
    initial: "J",
    score: 65,
    doingRight: [
      "Keeping the conversation light and playful",
      "Good balance of texting frequency",
      "Showing genuine interest in their hobbies",
    ],
    toImprove: [
      "Conversations stay surface-level — go deeper",
      "You deflect compliments — learn to receive them",
      "More vulnerability would build trust faster",
    ],
    patterns: [
      { label: "Emotional depth", value: 48, color: "#8A2E5E" },
      { label: "Response energy", value: 75, color: "#C4956A" },
      { label: "Initiative balance", value: 62, color: "#C4956A" },
      { label: "Flirtation", value: 55, color: "#C4956A" },
    ],
    recommendation:
      "This is early stages with real potential. The chemistry is there but the depth is missing. Next time they share something personal, match their vulnerability.",
  },
  sam: {
    name: "Sam",
    initial: "S",
    score: 42,
    doingRight: [
      "You stay consistent even when they pull back",
      "Your messages are well-thought-out",
      "You don't over-apologize or people-please",
    ],
    toImprove: [
      "They take much longer to respond — interest may be fading",
      "Conversations feel one-sided — you carry most of the weight",
      "Consider if this connection is serving you well",
    ],
    patterns: [
      { label: "Emotional depth", value: 35, color: "#8A2E5E" },
      { label: "Response energy", value: 28, color: "#8A2E5E" },
      { label: "Initiative balance", value: 22, color: "#8A2E5E" },
      { label: "Flirtation", value: 40, color: "#8A2E5E" },
    ],
    recommendation:
      "Honest moment: the energy here is uneven. You deserve someone who matches your effort. If you want to try, pull back and see if they reach out. Their silence will tell you everything.",
  },
};

export default function ProjectDetailScreen({
  projectId,
  onBack,
  onOpenKeyboard,
}: ProjectDetailScreenProps) {
  const project = projectData[projectId] || projectData.tanya;

  return (
    <div
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: "#1A0A14" }}
    >
      {/* Header */}
      <div className="pt-[54px] px-5 pb-4 flex items-center gap-3">
        <motion.button
          onClick={onBack}
          className="w-[36px] h-[36px] rounded-full flex items-center justify-center"
          style={{ background: "rgba(255, 248, 243, 0.05)" }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFF8F3"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </motion.button>

        <div className="flex items-center gap-3 flex-1">
          <div
            className="w-[38px] h-[38px] rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #C4956A, #6B1D4A)",
            }}
          >
            <span
              className="text-[15px] text-[#FFF8F3]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {project.initial}
            </span>
          </div>
          <div>
            <h2
              className="text-[18px] text-[#FFF8F3]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {project.name}
            </h2>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 pb-[100px]">
        {/* Relationship health */}
        <motion.div
          className="rounded-2xl p-5 mb-4"
          style={{
            background: "rgba(255, 248, 243, 0.03)",
            border: "1px solid rgba(255, 248, 243, 0.06)",
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <p
              className="text-[12px] text-[#FFF8F3]/40 tracking-[0.1em] uppercase"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Connection Pulse
            </p>
            <span
              className="text-[32px] font-semibold"
              style={{
                fontFamily: "var(--font-playfair)",
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
          {/* Visual arc */}
          <div className="relative h-[8px] bg-[#FFF8F3]/5 rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                background:
                  project.score > 70
                    ? "linear-gradient(90deg, #4A7C59, #6B9E6B)"
                    : project.score > 50
                    ? "linear-gradient(90deg, #C4956A, #D4A574)"
                    : "linear-gradient(90deg, #6B1D4A, #8A2E5E)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${project.score}%` }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* What you're doing right */}
        <motion.div
          className="rounded-2xl p-5 mb-4"
          style={{
            background: "rgba(74, 124, 89, 0.06)",
            border: "1px solid rgba(74, 124, 89, 0.12)",
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-3.5">
            <div className="w-[6px] h-[6px] rounded-full bg-[#4A7C59]" />
            <p
              className="text-[13px] text-[#6B9E6B] font-medium tracking-wide"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              What you&apos;re doing right
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            {project.doingRight.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-2.5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4A7C59"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="mt-0.5 flex-shrink-0"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <p
                  className="text-[13px] text-[#FFF8F3]/50 leading-relaxed"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Areas to improve */}
        <motion.div
          className="rounded-2xl p-5 mb-4"
          style={{
            background: "rgba(196, 149, 106, 0.06)",
            border: "1px solid rgba(196, 149, 106, 0.12)",
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-3.5">
            <div className="w-[6px] h-[6px] rounded-full bg-[#C4956A]" />
            <p
              className="text-[13px] text-[#C4956A] font-medium tracking-wide"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Areas to grow
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            {project.toImprove.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-2.5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C4956A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="mt-0.5 flex-shrink-0"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p
                  className="text-[13px] text-[#FFF8F3]/50 leading-relaxed"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Communication patterns */}
        <motion.div
          className="rounded-2xl p-5 mb-4"
          style={{
            background: "rgba(255, 248, 243, 0.03)",
            border: "1px solid rgba(255, 248, 243, 0.06)",
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p
            className="text-[13px] text-[#FFF8F3]/40 font-medium tracking-wide mb-4"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Communication Patterns
          </p>
          <div className="flex flex-col gap-3">
            {project.patterns.map((pattern, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className="text-[12px] text-[#FFF8F3]/50"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {pattern.label}
                  </span>
                  <span
                    className="text-[12px] font-medium"
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      color: pattern.color,
                    }}
                  >
                    {pattern.value}%
                  </span>
                </div>
                <div className="h-[4px] bg-[#FFF8F3]/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: pattern.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pattern.value}%` }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5 + i * 0.1,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Coach recommendation */}
        <motion.div
          className="rounded-2xl p-5 mb-4"
          style={{
            background:
              "linear-gradient(135deg, rgba(196, 149, 106, 0.1), rgba(107, 29, 74, 0.1))",
            border: "1px solid rgba(196, 149, 106, 0.15)",
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #C4956A, #6B1D4A)",
              }}
            >
              <span className="text-[11px]">✦</span>
            </div>
            <p
              className="text-[13px] text-[#C4956A] font-medium"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Coach&apos;s take
            </p>
          </div>
          <p
            className="text-[14px] text-[#FFF8F3]/60 leading-relaxed italic"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            &ldquo;{project.recommendation}&rdquo;
          </p>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <div
        className="absolute bottom-0 left-0 right-0 px-5 pb-[36px] pt-4"
        style={{
          background: "linear-gradient(180deg, transparent, #1A0A14 40%)",
        }}
      >
        <motion.button
          onClick={onOpenKeyboard}
          className="w-full py-[16px] rounded-2xl text-[15px] font-medium tracking-wide text-[#1A0A14] flex items-center justify-center gap-2"
          style={{
            fontFamily: "var(--font-dm-sans)",
            background: "linear-gradient(135deg, #C4956A 0%, #D4A574 100%)",
          }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="text-[14px]">✦</span>
          Open Coach Keyboard
        </motion.button>
      </div>
    </div>
  );
}
