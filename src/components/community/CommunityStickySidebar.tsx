"use client";

import React, { useEffect, useRef, useState } from "react";

interface CommunityScrollColumnProps {
  children: React.ReactNode;
  className?: string;
  hideScrollbar?: boolean;
}

const SCROLLBAR_HIDE_DELAY = 900;

export const CommunityScrollColumn: React.FC<CommunityScrollColumnProps> = ({ children, className = "", hideScrollbar = false }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const hideTimerRef = useRef<number | null>(null);
  const isLeftSidebar = className.includes("community-scroll-column--left-sidebar");

  useEffect(() => () => {
    if (hideTimerRef.current !== null) window.clearTimeout(hideTimerRef.current);
  }, []);

  const handleScroll = () => {
    setIsScrolling(true);
    if (hideTimerRef.current !== null) window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => setIsScrolling(false), SCROLLBAR_HIDE_DELAY);
  };

  const handleMouseLeave = () => {
    if (hideTimerRef.current !== null) window.clearTimeout(hideTimerRef.current);
    setIsScrolling(false);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!isLeftSidebar || event.deltaY === 0) return;

    // The left sidebar is intentionally fixed in place. Forward its wheel
    // movement to the page so the center Community feed remains scrollable.
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    const isAtTop = window.scrollY <= 0 && event.deltaY < 0;
    const isAtBottom = window.scrollY >= maxScrollTop && event.deltaY > 0;

    event.preventDefault();
    if (isAtTop || isAtBottom) return;

    window.scrollBy({ top: event.deltaY, left: 0, behavior: "auto" });
  };

  return (
    <>
      <style>{`
        .community-scroll-column {
          min-height: 0;
          scrollbar-color: transparent transparent;
          scrollbar-width: thin;
        }
        @media (min-width: 1024px) {
          .community-scroll-column:not(.community-scroll-column--feed) {
            position: sticky;
            top: 7rem;
            height: calc(100dvh - 7rem);
            overflow-y: auto;
            overscroll-behavior: auto;
            padding-right: 10px;
          }
          .community-scroll-column--feed {
            height: auto !important;
            max-height: none !important;
            overflow: visible !important;
            overscroll-behavior: auto;
          }
          .community-scroll-column--left-sidebar {
            position: sticky;
            top: 7rem !important;
            align-self: flex-start;
            height: fit-content;
            max-height: none;
            overflow: visible;
            overscroll-behavior: none;
            padding-right: 0;
            scrollbar-width: none;
            transform: none !important;
            will-change: auto;
        }
          .community-right-sidebar-column {
            min-width: 0;
            align-self: stretch;
            overflow: visible;
            min-height: 100%;
          }
          .community-right-trending-sticky {
            position: sticky;
            top: 7rem;
            align-self: flex-start;
            z-index: 10;
          }
          .community-right-footer-sticky {
            position: sticky;
            top: 23rem;
            align-self: flex-start;
            z-index: 9;
          }
        }
        .community-scroll-column::-webkit-scrollbar {
          width: 8px;
        }
        .community-scroll-column::-webkit-scrollbar-button,
        .community-scroll-column::-webkit-scrollbar-button:single-button,
        .community-scroll-column::-webkit-scrollbar-button:horizontal,
        .community-scroll-column::-webkit-scrollbar-button:vertical,
        .community-scroll-column::-webkit-scrollbar-button:vertical:decrement,
        .community-scroll-column::-webkit-scrollbar-button:vertical:increment,
        .community-scroll-column::-webkit-scrollbar-button:single-button:vertical:decrement,
        .community-scroll-column::-webkit-scrollbar-button:single-button:vertical:increment,
        .community-scroll-column::-webkit-scrollbar-button:start:decrement,
        .community-scroll-column::-webkit-scrollbar-button:end:increment,
        .community-scroll-column::-webkit-scrollbar-button:vertical:start:increment,
        .community-scroll-column::-webkit-scrollbar-button:vertical:end:decrement {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          min-width: 0 !important;
          min-height: 0 !important;
          background: transparent !important;
          background-image: none !important;
          border: 0 !important;
          appearance: none !important;
          -webkit-appearance: none !important;
          color: transparent !important;
        }
        .community-scroll-column::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 999px;
        }
        .community-scroll-column::-webkit-scrollbar-thumb {
          background: transparent;
          border: 2px solid transparent;
          border-radius: 999px;
          transition: background-color 220ms ease, border-color 220ms ease;
        }
        .community-scroll-column:hover,
        .community-scroll-column[data-scroll-active="true"] {
          scrollbar-color: rgba(47, 143, 70, 0.5) transparent;
        }
        .community-scroll-column:hover::-webkit-scrollbar-thumb,
        .community-scroll-column[data-scroll-active="true"]::-webkit-scrollbar-thumb {
          background: rgba(47, 143, 70, 0.5);
          border-color: transparent;
        }
        .community-scroll-column:hover::-webkit-scrollbar-thumb:hover,
        .community-scroll-column[data-scroll-active="true"]::-webkit-scrollbar-thumb:hover {
          background: rgba(47, 143, 70, 0.72);
        }
        .community-scroll-column::-webkit-scrollbar:hover {
          background: rgba(231, 238, 231, 0.22);
        }
        :global(.dark) .community-scroll-column:hover,
        :global(.dark) .community-scroll-column[data-scroll-active="true"] {
          scrollbar-color: rgba(183, 227, 95, 0.38) transparent;
        }
        :global(.dark) .community-scroll-column:hover::-webkit-scrollbar-thumb,
        :global(.dark) .community-scroll-column[data-scroll-active="true"]::-webkit-scrollbar-thumb {
          background: rgba(183, 227, 95, 0.38);
        }
        :global(.dark) .community-scroll-column:hover::-webkit-scrollbar-thumb:hover,
        :global(.dark) .community-scroll-column[data-scroll-active="true"]::-webkit-scrollbar-thumb:hover {
          background: rgba(199, 237, 125, 0.52);
        }
        :global(.dark) .community-scroll-column::-webkit-scrollbar:hover {
          background: rgba(26, 33, 28, 0.35);
        }
        .community-scroll-column--feed {
          scrollbar-width: none;
        }
        .community-scroll-column--feed::-webkit-scrollbar {
          display: none;
        }
        .community-scroll-column--left-sidebar::-webkit-scrollbar {
          display: none;
        }
        .community-scroll-column--right-sidebar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div
        className={`community-scroll-column ${hideScrollbar ? "community-scroll-column--feed" : ""} ${className}`}
        data-scroll-active={isScrolling ? "true" : "false"}
        onScroll={handleScroll}
        onWheel={handleWheel}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </>
  );
};
