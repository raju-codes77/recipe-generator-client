"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export function useSplitTextReveal(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(SplitText, ScrollTrigger);

    const context = gsap.context(() => {
      container.querySelectorAll<HTMLElement>("[data-split-reveal]").forEach((target) => {
        SplitText.create(target, {
          type: "lines",
          linesClass: "split-reveal-line",
          autoSplit: true,
          mask: "lines",
          onSplit: (split) =>
            gsap.from(split.lines, {
              duration: 0.62,
              yPercent: 100,
              autoAlpha: 0,
              stagger: 0.08,
              ease: "expo.out",
              scrollTrigger: {
                trigger: target,
                start: "top 82%",
                end: "bottom 18%",
                toggleActions: "play reverse play reverse",
              },
            }),
        });
      });
    }, container);
    let refreshFrame = 0;
    const layoutObserver = new ResizeObserver(() => {
      if (refreshFrame) window.cancelAnimationFrame(refreshFrame);
      refreshFrame = window.requestAnimationFrame(() => {
        refreshFrame = 0;
        ScrollTrigger.refresh();
      });
    });
    layoutObserver.observe(document.body);
    ScrollTrigger.refresh();

    return () => {
      layoutObserver.disconnect();
      if (refreshFrame) window.cancelAnimationFrame(refreshFrame);
      context.revert();
    };
  }, [containerRef]);
}
