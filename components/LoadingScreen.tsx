"use client";

import { motion } from "motion/react";
import { useRef } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const isTriggered = useRef(false);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    // Trigger transition 0.8s before video ends to completely remove any gap
    if (video.duration > 0 && video.duration - video.currentTime <= 0.8 && !isTriggered.current) {
      isTriggered.current = true;
      onComplete();
    }
  };

  const handleManualSkip = () => {
    if (!isTriggered.current) {
      isTriggered.current = true;
      onComplete();
    }
  };
  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-[#0B0408] origin-center overflow-hidden cursor-pointer"
      initial={{ opacity: 1, scale: 1, rotateZ: 0 }}
      exit={{ opacity: 0, scale: 20, rotateZ: 2, filter: "blur(20px)" }}
      transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
      onClick={handleManualSkip}
    >
      <video
        className="w-full h-full object-cover origin-center"
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleManualSkip}
      >
        <source src="/images/CL_Loading.mp4" type="video/mp4" />
      </video>
    </motion.div>
  );
}
