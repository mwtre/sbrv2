"use client";

import { useEffect, useRef, useState } from "react";

export default function BubbleBackground() {
  const bubblesRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !bubblesRef.current) return;

    try {
      // Settings
      const minBubbleCount = 20;
      const maxBubbleCount = 60;
      const minBubbleSize = 3;
      const maxBubbleSize = 12;

      // Calculate random number of bubbles
      const bubbleCount =
        minBubbleCount + Math.floor(Math.random() * (maxBubbleCount + 1));

      // Create bubbles
      for (let i = 0; i < bubbleCount; i++) {
        const container = document.createElement("div");
        container.className = "bubble-container";
        
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        container.appendChild(bubble);
        
        if (bubblesRef.current) {
          bubblesRef.current.appendChild(container);
        }
      }

      // Randomize bubble properties
      if (!bubblesRef.current) return;
      
      const bubbleContainers = bubblesRef.current.querySelectorAll(
        ".bubble-container"
      );

      bubbleContainers.forEach((container) => {
        const element = container as HTMLElement;
        const bubble = element.querySelector(".bubble") as HTMLElement;

        if (!element) return;

        // Randomize positions (0-100%)
        const posRand = Math.floor(Math.random() * 101);

        // Randomize size
        const sizeRand =
          minBubbleSize + Math.floor(Math.random() * (maxBubbleSize + 1));

        // Randomize delay (0-15s)
        const delayRand = Math.floor(Math.random() * 16);

        // Randomize speed (3-8s)
        const speedRand = 3 + Math.floor(Math.random() * 9);

        // Random blur
        const blurRand = Math.floor(Math.random() * 3);

        // Apply styles
        element.style.left = `${posRand}%`;
        element.style.animationDuration = `${speedRand}s`;
        element.style.animationDelay = `${delayRand}s`;
        element.style.filter = `blur(${blurRand}px)`;

        if (bubble) {
          bubble.style.width = `${sizeRand}px`;
          bubble.style.height = `${sizeRand}px`;
        }
      });
    } catch (error) {
      console.error("Error creating bubbles:", error);
    }

    // Cleanup function
    return () => {
      if (bubblesRef.current) {
        bubblesRef.current.innerHTML = "";
      }
    };
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bubbles fixed inset-0 pointer-events-none z-0" ref={bubblesRef} />
  );
}

