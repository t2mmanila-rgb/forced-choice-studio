"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EvasionBehavior } from "@/types";

interface EvasiveButtonProps {
  text: string;
  behavior: EvasionBehavior;
  sensitivity: number; // in pixels
  containerRef: React.RefObject<HTMLDivElement>;
  onEvade: () => void;
  className?: string;
  isBamboozled?: boolean;
  shrinkScale?: number;
}

export const EvasiveButton: React.FC<EvasiveButtonProps> = ({
  text,
  behavior,
  sensitivity,
  containerRef,
  onEvade,
  className = "",
  isBamboozled = false,
  shrinkScale = 1,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);

  // Helper to get bounded random coordinate
  const getRandomBoundedOffset = useCallback(() => {
    if (!containerRef.current || !buttonRef.current) {
      const angle = Math.random() * 2 * Math.PI;
      const dist = 120 + Math.random() * 80;
      return { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist };
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const btnRect = buttonRef.current.getBoundingClientRect();

    const padding = 20;
    const maxX = containerRect.width / 2 - btnRect.width / 2 - padding;
    const minX = -maxX;
    const maxY = 140;
    const minY = -120;

    let targetX = (Math.random() * 2 - 1) * maxX;
    let targetY = (Math.random() * 2 - 1) * maxY;

    // ensure it jumps far enough from current position
    if (Math.abs(targetX - position.x) < 70) {
      targetX = targetX > 0 ? targetX - 80 : targetX + 80;
    }
    if (Math.abs(targetY - position.y) < 50) {
      targetY = targetY > 0 ? targetY - 60 : targetY + 60;
    }

    return {
      x: Math.max(minX, Math.min(maxX, targetX)),
      y: Math.max(minY, Math.min(maxY, targetY)),
    };
  }, [containerRef, position]);

  // Execute evasion
  const handleEvade = useCallback(
    (e?: React.SyntheticEvent | MouseEvent | TouchEvent) => {
      if (e) {
        // Prevent default to disable mobile touch tap & zoom
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
      }

      onEvade();

      if (behavior === "teleport") {
        const nextPos = getRandomBoundedOffset();
        setPosition(nextPos);
        setHasMoved(true);
      } else if (behavior === "halo") {
        // Jump away along vector
        const nextPos = getRandomBoundedOffset();
        setPosition(nextPos);
        setHasMoved(true);
      }
      // "shrink" and "bamboozle" handled via props / parent coordination
    },
    [behavior, getRandomBoundedOffset, onEvade]
  );

  // Proximity Halo detection via mousemove
  useEffect(() => {
    if (behavior !== "halo") return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current || !containerRef.current) return;
      const btnRect = buttonRef.current.getBoundingClientRect();
      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;

      const dx = e.clientX - btnCenterX;
      const dy = e.clientY - btnCenterY;
      const distance = Math.hypot(dx, dy);

      const triggerRadius = sensitivity + 40; // 60px to 140px

      if (distance < triggerRadius) {
        // Calculate repulsive velocity vector
        const angle = Math.atan2(dy, dx);
        // Push in opposite direction (angle + PI)
        const pushDistance = 140;
        const targetX = position.x - Math.cos(angle) * pushDistance;
        const targetY = position.y - Math.sin(angle) * pushDistance;

        const containerRect = containerRef.current.getBoundingClientRect();
        const maxX = containerRect.width / 2 - btnRect.width / 2 - 16;
        const minX = -maxX;
        const maxY = 130;
        const minY = -110;

        setPosition({
          x: Math.max(minX, Math.min(maxX, targetX)),
          y: Math.max(minY, Math.min(maxY, targetY)),
        });
        setHasMoved(true);
        onEvade();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [behavior, containerRef, sensitivity, position, onEvade]);

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      tabIndex={-1}
      aria-label="Decline option"
      style={{
        touchAction: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      animate={{
        x: behavior === "bamboozle" ? 0 : position.x,
        y: behavior === "bamboozle" ? 0 : position.y,
        scale: behavior === "shrink" ? shrinkScale : 1,
        opacity: behavior === "shrink" && shrinkScale < 0.1 ? 0 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 24,
        mass: 0.6,
      }}
      onMouseEnter={(e) => {
        handleEvade(e);
      }}
      onTouchStart={(e) => {
        handleEvade(e);
      }}
      onClick={(e) => {
        // In case someone manages to click it
        handleEvade(e);
      }}
      className={`relative inline-flex items-center justify-center font-medium px-6 py-3 rounded-full transition-colors cursor-pointer select-none ${className}`}
    >
      {/* Invisible buffer halo zone around button */}
      <span
        className="absolute -inset-4 sm:-inset-6 pointer-events-auto rounded-full"
        onMouseEnter={(e) => handleEvade(e)}
        onTouchStart={(e) => handleEvade(e)}
        aria-hidden="true"
      />
      <span className="relative z-10 pointer-events-none whitespace-nowrap">
        {isBamboozled ? "Yes! 🥰" : text}
      </span>
    </motion.button>
  );
};
