"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Camera, Sparkles, UtensilsCrossed } from "lucide-react";

interface StepItem {
  stepNumber: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FOOD_IMAGE = "/foodcanvas-how-it-works-hq.png";

function mapSegment(value: number, start: number, end: number, from: number, to: number) {
  const progress = Math.min(1, Math.max(0, (value - start) / (end - start)));
  return from + (to - from) * progress;
}

function mapSmoothSegment(value: number, start: number, end: number, from: number, to: number) {
  const progress = Math.min(1, Math.max(0, (value - start) / (end - start)));
  const easedProgress = progress * progress * (3 - 2 * progress);
  return from + (to - from) * easedProgress;
}

function StepPanel({
  item,
  index,
  progress,
  animateOnScroll,
}: {
  item: StepItem;
  index: number;
  progress: MotionValue<number>;
  animateOnScroll: boolean;
}) {
  const turnStart = 0.6 + index * 0.055;
  const turnEnd = turnStart + 0.18;
  const rotateY = useTransform(progress, (value) =>
    mapSegment(value, turnStart, turnEnd, 0, 180),
  );
  const turnMidpoint = (turnStart + turnEnd) / 2;
  const frontOpacity = useTransform(progress, (value) =>
    value <= turnStart
      ? 1
      : value >= turnMidpoint
        ? 0
        : mapSegment(value, turnStart, turnMidpoint, 1, 0),
  );
  const backOpacity = useTransform(progress, (value) =>
    value <= turnMidpoint
      ? 0
      : value >= turnEnd
        ? 1
        : mapSegment(value, turnMidpoint, turnEnd, 0, 1),
  );
  const rotateZ = useTransform(progress, (value) => {
    const tilt = (index - 1) * 4;
    if (value <= 0.38) return 0;
    if (value < 0.58) return mapSegment(value, 0.38, 0.58, 0, tilt);
    return tilt;
  });
  const lift = useTransform(progress, (value) => {
    const lifted = index === 1 ? -14 : 12;
    if (value <= 0.38) return 0;
    if (value < 0.58) return mapSegment(value, 0.38, 0.58, 0, lifted);
    return lifted;
  });
  const splitX = useTransform(progress, (value) =>
    mapSmoothSegment(value, 0.34, 0.56, 0, (index - 1) * 20),
  );
  const stripLeft = index === 0 ? "0" : index === 1 ? "calc(-100% - 18px)" : "calc(-200% - 36px)";

  return (
    <div className="min-w-0 flex-1 [perspective:1400px]">
      <motion.div
        style={
          animateOnScroll
            ? {
                rotateY,
                rotateZ,
                y: lift,
                x: splitX,
                transformStyle: "preserve-3d",
                willChange: "transform",
              }
            : { rotateY: 180, transformStyle: "preserve-3d" }
        }
        className="relative h-full w-full [transform-style:preserve-3d]"
      >
        <motion.div
          className="absolute inset-0 overflow-hidden rounded-[22px] border border-white/70 shadow-[0_22px_55px_rgba(13,56,33,0.2)] [backface-visibility:hidden] dark:border-white/10"
          style={{
            opacity: animateOnScroll ? frontOpacity : 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="absolute inset-y-0" style={{ left: stripLeft, width: "calc(300% + 36px)" }}>
            <Image
              src={FOOD_IMAGE}
              alt="Discover delicious recipes at FoodCanvas"
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              quality={100}
              className="object-cover"
              style={{ objectPosition: "center 62%" }}
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07190F]/70 via-transparent to-transparent" />
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[22px] border border-emerald-100 bg-[#F8FAF8] p-5 shadow-[0_22px_55px_rgba(13,56,33,0.14)] [backface-visibility:hidden] dark:border-white/10 dark:bg-[#131B2E] sm:p-6 lg:p-7"
          style={{
            transform: "rotateY(180deg)",
            opacity: animateOnScroll ? backOpacity : 1,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-100 bg-white shadow-sm dark:border-emerald-900/40 dark:bg-slate-800">
              {item.icon}
            </div>
            <span className="text-6xl font-black leading-none text-emerald-900/[0.08] dark:text-white/[0.06]">
              {item.stepNumber}
            </span>
          </div>
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
              Step {item.stepNumber}
            </p>
            <h3 className="mb-3 text-xl font-black tracking-tight text-stone-900 dark:text-white sm:text-2xl">
              {item.title}
            </h3>
            <p className="text-sm font-medium leading-relaxed text-stone-600 dark:text-stone-300">
              {item.description}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function HowItWorksSection() {
  const steps: StepItem[] = [
    {
      stepNumber: "01",
      icon: <Camera className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />,
      title: "Add Ingredients",
      description:
        "Snap a photo of your fridge or type what you have. We organize your pantry instantly.",
    },
    {
      stepNumber: "02",
      icon: <Sparkles className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />,
      title: "Let AI Create",
      description:
        "Our AI generates perfect recipe matches tailored to your diet, goals, and taste profile.",
    },
    {
      stepNumber: "03",
      icon: <UtensilsCrossed className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />,
      title: "Cook & Enjoy",
      description:
        "Follow easy, step-by-step instructions. Eat healthier, save money, and reduce food waste.",
    },
  ];

  const [isDesktop, setIsDesktop] = useState(false);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const animateOnScroll = isDesktop && !reduceMotion;
  const titleY = useTransform(scrollYProgress, (value) =>
    mapSegment(value, 0, 0.32, 330, 0),
  );
  const titleOpacity = useTransform(scrollYProgress, (value) =>
    mapSegment(value, 0, 0.04, 0, 1),
  );
  const panelsScaleX = useTransform(scrollYProgress, (value) =>
    mapSmoothSegment(value, 0.34, 0.56, 0.76, 1),
  );
  const panelsScaleY = useTransform(scrollYProgress, (value) =>
    mapSmoothSegment(value, 0.34, 0.56, 0.72, 1),
  );
  const imageOpacity = useTransform(scrollYProgress, (value) =>
    mapSmoothSegment(value, 0.34, 0.49, 1, 0),
  );
  const imageScaleX = useTransform(scrollYProgress, (value) =>
    mapSmoothSegment(value, 0.34, 0.56, 1, 1 / 0.76),
  );
  const imageScaleY = useTransform(scrollYProgress, (value) =>
    mapSmoothSegment(value, 0.34, 0.56, 1, 1 / 0.72),
  );
  const panelsOpacity = useTransform(scrollYProgress, (value) =>
    mapSmoothSegment(value, 0.34, 0.49, 0, 1),
  );

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const updateDesktop = () => setIsDesktop(desktopQuery.matches);
    updateDesktop();
    desktopQuery.addEventListener("change", updateDesktop);
    return () => desktopQuery.removeEventListener("change", updateDesktop);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-x-clip bg-white text-stone-900 transition-colors duration-300 dark:bg-[#080B12] dark:text-white ${animateOnScroll ? "h-[240vh] lg:h-[240vh]" : "py-16"}`}
    >
      <div
        className={`relative mx-auto flex w-full max-w-[1200px] flex-col items-center px-6 md:px-8 ${animateOnScroll ? "sticky top-0 h-screen justify-center" : ""}`}
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-emerald-500/5 blur-[120px] dark:bg-emerald-500/10" />

        {animateOnScroll ? (
          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="absolute left-0 right-0 top-[calc(50%-270px)] z-0 flex flex-col items-center px-6 text-center"
          >
            <h2 className="mb-4 text-3xl font-black leading-tight tracking-tight text-stone-900 dark:text-white md:text-4xl lg:text-[48px]">
              How <span className="bg-gradient-to-r from-[#154D31] via-[#24733E] to-emerald-500 bg-clip-text text-transparent">FoodCanvas</span> Works
            </h2>
            <p className="max-w-md text-sm font-medium leading-relaxed text-stone-500 dark:text-stone-400 md:text-base">
              Transform your daily cooking experience with three simple, intelligent steps.
            </p>
          </motion.div>
        ) : (
          <div className="relative z-20 mb-10 flex flex-col items-center text-center">
            <h2 className="mb-4 text-3xl font-black leading-tight tracking-tight text-stone-900 dark:text-white md:text-4xl lg:text-[48px]">
              How <span className="bg-gradient-to-r from-[#154D31] via-[#24733E] to-emerald-500 bg-clip-text text-transparent">FoodCanvas</span> Works
            </h2>
            <p className="max-w-md text-sm font-medium leading-relaxed text-stone-500 dark:text-stone-400 md:text-base">
              Transform your daily cooking experience with three simple, intelligent steps.
            </p>
          </div>
        )}

        <div className={`relative z-10 h-[300px] w-full max-w-5xl sm:h-[340px] lg:h-[360px] ${animateOnScroll ? "lg:translate-y-20" : ""}`}>
          <motion.div
            style={animateOnScroll ? { scaleX: panelsScaleX, scaleY: panelsScaleY, opacity: panelsOpacity } : undefined}
            className={`absolute inset-0 flex ${animateOnScroll ? "" : "gap-4"}`}
          >
            {steps.map((item, index) => (
              <StepPanel
                key={item.stepNumber}
                item={item}
                index={index}
                progress={scrollYProgress}
                animateOnScroll={animateOnScroll}
              />
            ))}
          </motion.div>

          {animateOnScroll && (
            <motion.div
              style={{ opacity: imageOpacity, scaleX: imageScaleX, scaleY: imageScaleY }}
              className="absolute left-1/2 top-1/2 h-[72%] w-[76%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[24px] shadow-[0_22px_55px_rgba(13,56,33,0.24)]"
            >
              <Image
                src={FOOD_IMAGE}
                alt="Discover delicious recipes at FoodCanvas"
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                quality={100}
                className="object-cover"
                style={{ objectPosition: "center 62%" }}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07190F]/55 to-transparent" />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
