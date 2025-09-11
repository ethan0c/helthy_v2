"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup, useInView } from "framer-motion";
import {
  Brain,
  ChevronDown,
  Mic,
  Wand2,
  MessageSquare,
  Send,
  X,
} from "lucide-react";

// Reusable small top meta row with divider, label, and number bubble
function SectionMeta({
  label,
  number,
  tone = "dark",
  className = "",
}: {
  label: string;
  number: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const border = tone === "dark" ? "border-white/10" : "border-gray-200";
  const text = tone === "dark" ? "text-white/50" : "text-gray-500";
  const bubbleBorder = tone === "dark" ? "border-white/20" : "border-gray-300";
  const bubbleText = tone === "dark" ? "text-white/60" : "text-gray-600";
  return (
    <div
      className={`border-t ${border} pt-6 flex items-center justify-between mb-8 ${className}`}
    >
      <span
        className={`text-[10px] tracking-wider ${text} font-sf-pro uppercase`}
      >
        {label}
      </span>
      <span
        className={`text-[10px] ${bubbleText} border ${bubbleBorder} rounded-full px-2 py-0.5`}
      >
        {number}
      </span>
    </div>
  );
}

export default function Home() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isDynamicIslandVisible, setIsDynamicIslandVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [waitlistStatus, setWaitlistStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [waitlistError, setWaitlistError] = useState<string | null>(null);

  async function submitWaitlist(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!email) return;
    setWaitlistStatus("loading");
    setWaitlistError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed");
      setWaitlistStatus("success");
      setEmail("");
    } catch (err: unknown) {
      setWaitlistStatus("error");
      setWaitlistError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setTimeout(() => {
        setWaitlistStatus("idle");
        setWaitlistError(null);
      }, 4000);
    }
  }
  // Billing period with added lifetime (option C)
  const [billingPeriod, setBillingPeriod] = useState<
    "monthly" | "annual" | "lifetime"
  >("monthly");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isInThemesSection, setIsInThemesSection] = useState(false);
  // bezel expansion + auto AI section
  const [showFeatureAI, setShowFeatureAI] = useState(false);
  const [shouldExpandPhone, setShouldExpandPhone] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const ctaContainerRef = useRef<HTMLDivElement | null>(null);
  const aiAutoRef = useRef<HTMLDivElement | null>(null);
  const themesRef = useRef<HTMLDivElement | null>(null);
  const aiInView = useInView(aiAutoRef, { amount: 0.3, once: true });
  // trigger AI section when sentinel enters view
  useEffect(() => {
    if (aiInView) setShowFeatureAI(true);
  }, [aiInView]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY;
      const hasScrolledDown = currentScrollY > 100;

      // Check if we're in themes section or beyond (cosmic sections)
      const themesElement = themesRef.current;
      let inCosmic = false;
      if (themesElement) {
        const rect = themesElement.getBoundingClientRect();
        // We're in cosmic sections if themes section has reached the top
        inCosmic = rect.top <= 100;
      }

      setLastScrollY(currentScrollY);
      setIsInThemesSection(inCosmic);

      if (!hasScrolledDown) {
        // At top of page - show Dynamic Island in original state
        setIsNavExpanded(false);
        setIsDynamicIslandVisible(true);
      } else if (inCosmic) {
        // In cosmic sections - navbar should be sticky at top and full width
        setIsNavExpanded(true);
        setIsDynamicIslandVisible(true);
      } else {
        // In iPhone sections - show navbar expansion based on scroll direction
        setIsNavExpanded(scrollingUp);
        setIsDynamicIslandVisible(scrollingUp);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Bezel expansion after CTA buttons fully leave viewport
  useEffect(() => {
    const onScroll = () => {
      const el = ctaContainerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Add buffer zone for smoother transition
      const fullyAbove = rect.bottom <= -50;

      setShouldExpandPhone(fullyAbove);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep manual collapse state persistent - don't reset it automatically
  // This ensures once user closes AI, it stays closed until they manually open it again

  // Themes as planets in the solar system
  const themePlanets = [
    {
      key: "ocean",
      name: "Ocean",
      tagline: "Calm & Focused",
      gradient: "from-sky-500 via-cyan-400 to-teal-300",
      accent: "#06b6d4",
    },
    {
      key: "emerald",
      name: "Emerald",
      tagline: "Natural & Refreshing",
      gradient: "from-emerald-500 via-green-500 to-teal-400",
      accent: "#10b981",
    },
    {
      key: "hello",
      name: "Hello",
      tagline: "Creative & Inspiring",
      gradient: "from-fuchsia-500 via-pink-500 to-rose-400",
      accent: "#e879f9",
    },
    {
      key: "dark",
      name: "Dark",
      tagline: "Sleek & Modern",
      gradient: "from-zinc-700 via-neutral-800 to-black",
      accent: "#a3a3a3",
    },
    {
      key: "light",
      name: "Light",
      tagline: "Clean & Professional",
      gradient: "from-white via-slate-100 to-slate-200",
      accent: "#e5e7eb",
    },
    {
      key: "sunset",
      name: "Sunset",
      tagline: "Energetic & Warm",
      gradient: "from-orange-500 via-amber-400 to-rose-400",
      accent: "#f59e0b",
    },
    {
      key: "midnight",
      name: "Midnight",
      tagline: "Mysterious & Modern",
      gradient: "from-indigo-700 via-violet-700 to-slate-900",
      accent: "#6366f1",
    },
  ] as const;

  const faqs = [
    {
      question: "How does Helthy track my progress?",
      answer:
        "Helthy uses advanced analytics to monitor your workouts, nutrition, and health metrics. Our AI analyzes patterns and provides personalized insights to help you reach your goals faster.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use enterprise-grade encryption and follow strict privacy standards. Your personal health data is never shared with third parties and remains completely private.",
    },
    {
      question: "Can I use Helthy offline?",
      answer:
        "Yes! Helthy works offline for core features like workout tracking and meal logging. Data syncs automatically when you're back online.",
    },
    {
      question: "What makes Helthy AI different?",
      answer:
        "Our AI learns from your specific habits and preferences, not just generic fitness data. It provides truly personalized recommendations that evolve with your journey.",
    },
    {
      question: "Does Helthy integrate with wearables?",
      answer:
        "Yes. Helthy connects with popular devices and platforms to sync workouts, heart rate, and activity so your dashboard stays accurate and effortless.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "We offer a free trial so you can explore Helthy before committing. Join the waitlist to be notified when trials open in your region.",
    },
  ];

  return (
    <>
      {/* Black background with iPhone-shaped silver bevel */}
      <div className="min-h-screen bg-black flex items-start justify-center px-2 pb-2 sm:px-4 sm:pb-4 lg:px-6 lg:pb-6">
        {/* iPhone Screen with silver border following the curved shape */}
        <motion.div
          className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black curved-edges overflow-hidden relative shadow-2xl border-8 border-slate-300 ring-2 ring-slate-400"
          style={{
            willChange: "transform, max-width",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
          initial={{ maxWidth: "72rem" }}
          animate={{
            maxWidth: shouldExpandPhone ? "calc(100% - 2rem)" : "72rem",
            width: "100%",
          }}
          transition={{
            duration: 1.8,
            ease: [0.19, 1, 0.22, 1],
            type: "tween",
          }}
        >
          <LayoutGroup id="ai-group">
            {/* Dynamic Island - Transforms into navbar */}
            <motion.div
              className={`fixed z-30 ${
                isInThemesSection
                  ? "top-0 left-0 right-0"
                  : "top-10 left-1/2 transform -translate-x-1/2"
              }`}
              animate={{
                width: isInThemesSection
                  ? "100%"
                  : isNavExpanded
                  ? "calc(100% - 48px)"
                  : 384,
                height: isInThemesSection ? 64 : isNavExpanded ? 64 : 84,
                y: isInThemesSection ? 0 : isNavExpanded ? 10 : 0,
                opacity: isInThemesSection ? 1 : isDynamicIslandVisible ? 1 : 0,
                scale: isInThemesSection ? 1 : isDynamicIslandVisible ? 1 : 0.8,
              }}
              transition={{
                duration: 0.6,
                ease: [0.23, 1, 0.32, 1],
                layout: { duration: 0.6 },
              }}
              style={{
                willChange: "transform, width, height",
                backfaceVisibility: "hidden",
              }}
            >
              <div
                className={`w-full h-full ${
                  isInThemesSection
                    ? ""
                    : "dynamic-island rounded-full overflow-hidden"
                } flex items-center justify-center`}
              >
                <AnimatePresence mode="wait">
                  {isInThemesSection || isNavExpanded ? (
                    <motion.div
                      key="navbar"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1],
                        delay: 0.1,
                      }}
                      className={`flex items-center justify-between w-full px-[15px] text-sm font-medium text-white bg-black ${
                        isInThemesSection ? "rounded-none" : "rounded-full"
                      }`}
                    >
                      <Image
                        src="/logo-white.png"
                        alt="Helthy"
                        width={120}
                        height={40}
                        className="h-8 w-auto"
                      />
                      <div className="flex items-center space-x-6 font-sf-pro">
                        <a
                          href="#home"
                          className="hover:text-gray-300 transition-colors"
                        >
                          Home
                        </a>
                        <a
                          href="#features"
                          className="hover:text-gray-300 transition-colors"
                        >
                          Features
                        </a>
                        <a
                          href="#ai"
                          className="hover:text-gray-300 transition-colors"
                        >
                          AI
                        </a>
                        <a
                          href="#themes"
                          className="hover:text-gray-300 transition-colors"
                        >
                          Themes
                        </a>
                        <a
                          href="#faq"
                          className="hover:text-gray-300 transition-colors"
                        >
                          FAQ
                        </a>
                        <a
                          href="#waitlist"
                          className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors shadow-lg font-medium text-xs"
                        >
                          Waitlist
                        </a>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="island"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="flex items-center space-x-2 bg-black rounded-full px-4 py-2"
                    >
                      <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                      <div className="w-16 h-1 bg-white/60 rounded-full"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Removed old separate navbar */}
            {/* Removed old separate navbar */}

            {/* Hero Section - Full iPhone Screen */}
            <section
              id="home"
              ref={heroRef}
              className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
            >
              {/* Video Background */}
              <div className="absolute inset-0">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover video-fade-in"
                  style={{
                    filter: "brightness(0.8) contrast(1.1)",
                    WebkitFilter: "brightness(0.8) contrast(1.1)",
                  }}
                >
                  <source
                    src="/325e6dc6-23c3-4836-b68e-aefe6b4997a6.mp4"
                    type="video/mp4"
                  />
                </video>

                {/* Seamless gradient overlay for better text readability */}
                <div className="absolute inset-0 video-gradient-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>

                {/* Atmospheric enhancement gradients */}
                <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-white/8 to-gray-300/3 rounded-full blur-3xl opacity-40"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-gray-300/6 to-white/3 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-gray-200/4 to-gray-400/6 rounded-full blur-2xl opacity-25"></div>
              </div>

              <div className="relative z-10 px-8 w-full max-w-7xl mx-auto text-center mt-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  <SectionMeta
                    label="Home"
                    number="01"
                    tone="dark"
                    className="text-left"
                  />
                  {/* Status Bar Space */}
                  <div className="h-8"></div>

                  {/* Main Greeting */}
                  <div className="mb-14 mt-10">
                    <div className="text-[11px] tracking-[0.35em] text-white/50 mb-8 font-sf-pro uppercase flex items-center justify-center gap-5">
                      <span className="h-px w-12 bg-white/15" /> HELTHY PRESENTS{" "}
                      <span className="h-px w-12 bg-white/15" />
                    </div>
                    <h1 className="text-[2.9rem] md:text-[4.6rem] lg:text-[5.4rem] font-extrabold text-white mb-8 font-inter leading-[0.9] tracking-[-0.02em]">
                      THE FUTURE OF FITNESS
                    </h1>
                    <h2 className="text-xl md:text-[2.3rem] lg:text-[2.8rem] font-medium text-white/90 mb-14 font-inter leading-snug max-w-5xl mx-auto">
                      <span className="bg-gradient-to-r from-white via-gray-200 to-white/70 bg-clip-text text-transparent">
                        Data in motion
                      </span>
                      .{" "}
                      <span className="text-white/75">
                        Precision in progress.
                      </span>
                    </h2>
                    <div className="max-w-5xl mx-auto flex flex-col items-center gap-10">
                      <div className="flex flex-col md:flex-row md:items-center gap-7 w-full justify-center">
                        <p className="text-[12px] md:text-xs lg:text-sm font-sf-pro tracking-[0.25em] text-white/55 uppercase flex items-center gap-2">
                          <span className="inline-block h-1 w-1 rounded-full bg-white/40" />{" "}
                          ZERO NOISE • PURE SIGNAL
                        </p>
                        <p className="text-[12px] md:text-xs lg:text-sm font-sf-pro tracking-[0.25em] text-white/55 uppercase flex items-center gap-2">
                          <span className="inline-block h-1 w-1 rounded-full bg-white/40" />{" "}
                          REPS • MEALS • RECOVERY
                        </p>
                      </div>
                      <p className="text-xl md:text-2xl lg:text-[2.2rem] font-inter font-semibold tracking-tight text-white/90 text-center leading-snug">
                        Your body —{" "}
                        <span className="text-white/65 font-normal">
                          measured
                        </span>
                        ,{" "}
                        <span className="text-white/65 font-normal">
                          interpreted
                        </span>
                        ,{" "}
                        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                          mastered
                        </span>
                        .
                      </p>
                      <p className="text-[11px] md:text-xs tracking-[0.35em] text-white/40 font-sf-pro uppercase">
                        NO HYPE. JUST PROOF.
                      </p>
                    </div>
                  </div>

                  {/* Quick Stats Dashboard removed per request */}

                  {/* Main CTA */}
                  <motion.div
                    ref={ctaContainerRef}
                    className="space-y-8 mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                      <motion.button
                        className="bg-gradient-to-r from-white to-gray-200 text-black px-12 py-5 rounded-full text-lg font-normal shadow-2xl hover:shadow-3xl transition-all duration-300 font-sf-pro"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Start Your Journey
                      </motion.button>
                      <motion.button
                        className="border-2 border-gray-400 text-gray-300 px-12 py-5 rounded-full text-lg font-normal hover:border-gray-300 hover:bg-gray-800/50 transition-all duration-300 font-sf-pro"
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Join Waitlist
                      </motion.button>
                    </div>
                  </motion.div>
                  {/* Expansion now controlled by scroll position of CTA container */}
                </motion.div>
              </div>

              {/* Scroll Indicator */}
              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronDown className="w-6 h-6 text-gray-400" />
              </motion.div>
            </section>

            {/* Invisible anchor for AI nav link */}
            <div id="ai" aria-hidden className="h-0" />
            {/* Features Section - Redesigned with embedded AI overlay */}
            <section
              id="features"
              className="relative overflow-hidden bg-[#0B0B0B] py-32 px-8"
              style={{
                isolation: "isolate",
                willChange: "auto",
              }}
            >
              {/* Subtle top/bottom vignettes like reference */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black via-black/60 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-black via-black/70 to-transparent" />
              </div>

              <div className="relative z-10 max-w-[1500px] mx-auto">
                <div style={{ transform: "translateZ(0)" }}>
                  <SectionMeta
                    label="Features"
                    number="02"
                    tone="dark"
                    className="mx-auto max-w-none"
                  />
                  <div className="text-center max-w-4xl mx-auto mb-24">
                    <h2 className="text-[3.25rem] sm:text-[4.5rem] lg:text-[5.2rem] leading-[1.05] font-medium text-white font-sf-pro tracking-tight">
                      <span className="italic font-light">Track</span>{" "}
                      <span className="font-semibold">everything</span>
                    </h2>
                    <p className="mt-8 text-lg sm:text-xl text-white/80 font-sf-pro max-w-2xl mx-auto leading-relaxed">
                      See every rep, meal, and recovery signal—unified and
                      clear.
                    </p>
                    <div className="mt-10">
                      <button className="px-7 py-4 rounded-2xl bg-[#1A1A1A] text-white/90 hover:text-white border border-white/10 font-mono text-xs tracking-wider uppercase shadow-inner shadow-white/5 hover:bg-[#222] transition-colors">
                        More About Tracking
                      </button>
                    </div>
                  </div>
                </div>

                {/* Three large feature cards - no containers, blended edges */}
                <div className="grid md:grid-cols-3 gap-4 xl:gap-6 relative">
                  {[
                    {
                      title: "Monitor your training",
                      copy: "Every set, rep, tempo, and progression queued automatically.",
                      img: "/features/Group 1 (1).png",
                    },
                    {
                      title: "Build a plan",
                      copy: "AI structures cycles, balances fatigue, and keeps you progressing.",
                      img: "/features/Group 2.png",
                    },
                    {
                      title: "Intelligent insights",
                      copy: "Patterns surfaced: recovery dips, macro gaps, strength trends.",
                      img: "/features/Group 3.png",
                    },
                  ].map((card, i) => (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 40, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{
                        once: true,
                        amount: 0.2,
                        margin: "0px 0px -150px 0px",
                      }}
                      transition={{
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: i * 0.2,
                      }}
                      className="group relative h-[740px] lg:h-[780px] overflow-hidden bg-transparent"
                    >
                      <div className="absolute inset-0">
                        <Image
                          src={card.img}
                          alt={card.title}
                          fill
                          priority={i === 0}
                          className="object-cover object-center transition-transform duration-[3000ms] ease-out group-hover:scale-[1.02]"
                        />
                        {/* Seamless bottom blend into page background */}
                        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/85 via-25% to-transparent" />
                        {/* Extended feather edge for perfect blending */}
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0B0B0B] to-transparent" />
                      </div>
                      {/* Content bottom */}
                      <div className="absolute inset-x-0 bottom-0 p-8 lg:p-10 pt-40 flex flex-col">
                        <h3 className="text-2xl lg:text-3xl font-semibold text-white font-inter mb-4 tracking-tight leading-tight">
                          {card.title}
                        </h3>
                        <p className="text-white/70 text-sm lg:text-base font-sf-pro leading-relaxed max-w-[90%]">
                          {card.copy}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {/* AI auto-expanding section - positioned right after cards */}
                <motion.div
                  key="ai-section"
                  layoutId="ai-insights"
                  initial={{ opacity: 1 }}
                  animate={{
                    width: showFeatureAI ? "100%" : 384,
                    height: showFeatureAI ? "auto" : 84,
                    borderRadius: showFeatureAI ? 46 : 42,
                    y: showFeatureAI ? 40 : 0,
                  }}
                  transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="mt-20 mx-auto bg-gradient-to-br from-black/90 via-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden relative"
                  style={{
                    paddingLeft: showFeatureAI ? 24 : 0,
                    paddingRight: showFeatureAI ? 24 : 0,
                    paddingTop: showFeatureAI ? 32 : 0,
                    paddingBottom: showFeatureAI ? 32 : 0,
                  }}
                >
                  {/* Collapsed state - Dynamic Island style */}
                  {!showFeatureAI && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: showFeatureAI ? 0 : 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center justify-center h-full w-full"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-white/60 rounded-full shadow-sm shadow-white/20"></div>
                        <div className="w-20 h-1.5 bg-white/40 rounded-full"></div>
                        <div className="text-xs text-white/80 font-sf-pro tracking-wide">
                          AI Coach
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Expanded state - Full AI section */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showFeatureAI ? 1 : 0 }}
                    transition={{
                      duration: 0.5,
                      delay: showFeatureAI ? 0.4 : 0,
                    }}
                    className={showFeatureAI ? "block" : "hidden"}
                  >
                    {/* Orbital glow effects */}
                    <div className="absolute top-4 right-8 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-indigo-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-8 left-12 w-24 h-24 bg-gradient-to-br from-cyan-500/15 to-blue-500/10 rounded-full blur-2xl"></div>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <div className="text-xs text-white/50 font-sf-pro uppercase tracking-wider mb-1">
                            AI Coach
                          </div>
                          <div className="text-lg text-white/90 font-sf-pro font-medium">
                            Unified guidance across training & nutrition
                          </div>
                          <div className="text-sm text-white/60 font-sf-pro mt-1">
                            Your intelligent fitness companion in action
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="flex flex-col gap-6">
                          <VoiceLoggingCard className="h-60" />
                          <AIDescribeCard className="h-60" />
                        </div>
                        <div className="lg:col-span-2">
                          <AIChatPanel className="min-h-[520px]" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
                {/* Invisible trigger for AI expansion */}
                <div ref={aiAutoRef} className="mt-16" />
              </div>
            </section>
          </LayoutGroup>
        </motion.div>
      </div>

      {/* Cinematic transition from iPhone to cosmic sections */}
      <div className="relative h-32 bg-gradient-to-b from-black via-gray-900/50 to-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_70%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
      </div>

      {/* Outside iPhone Screen - Black Background Sections */}
      <div className="bg-black text-white">
        {/* Themes Section - Solar system with orbiting planets */}
        <section
          id="themes"
          ref={themesRef}
          className="py-32 px-8 relative overflow-hidden bg-black"
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-7xl mx-auto text-center mb-20 pointer-events-none"
          >
            <SectionMeta
              label="Themes"
              number="03"
              tone="dark"
              className="text-left"
            />
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-sf-pro mb-6">
              <span className="italic font-light">Themes</span>{" "}
              <span className="font-extrabold uppercase">In Orbit</span>
            </h2>
            <p className="text-xl text-white/80 font-sf-pro max-w-3xl mx-auto mb-4 leading-relaxed">
              Helthy adapts to you — even visually. Your interface becomes part
              of your identity.
            </p>
            <p className="text-white/60 font-sf-pro max-w-2xl mx-auto text-sm">
              Each theme transforms the entire experience. Hover or click any
              planet to preview.
            </p>
          </motion.div>

          {/* Orbit system */}
          <div className="relative pointer-events-auto">
            <OrbitingThemes planets={themePlanets} />
          </div>
        </section>

        {/* Transition: Themes → Pricing */}
        <div
          aria-hidden
          className="relative h-24 bg-gradient-to-b from-black via-gray-950 to-black"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
        </div>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="relative overflow-hidden bg-black px-8 py-32"
        >
          <div className="max-w-6xl mx-auto">
            <SectionMeta label="Pricing" number="04" tone="dark" />
            <div className="grid lg:grid-cols-12 gap-14 items-start">
              {/* Copy / Value Prop */}
              <div className="lg:col-span-5 space-y-8">
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-sf-pro leading-tight">
                  Tired of paying for{" "}
                  <span className="bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">
                    4 different fitness apps?
                  </span>
                  <br />
                  <span className="font-light italic">We got you.</span>
                </h2>
                <p className="text-white/60 font-sf-pro text-base leading-relaxed max-w-md">
                  Training plans, macro tracking, recovery insights, AI coaching
                  & voice logging—unified in one intelligent stack.
                </p>
                <ul className="space-y-4 text-sm font-sf-pro text-white/70">
                  {[
                    "Adaptive periodized programming",
                    "Real-time macro + recovery analysis",
                    "AI coach chat & plan generation",
                    "Hands‑free voice logging",
                    "Themes & personalization",
                    "Private data, encrypted sync",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-1 inline-block w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 shadow-[0_0_0_3px_rgba(255,255,255,0.05)]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Pricing Card */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative rounded-[46px] border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.03] to-transparent p-10 md:p-12 overflow-hidden"
                >
                  {/* Orbital glow accents */}
                  <div className="pointer-events-none absolute -top-10 -right-10 w-72 h-72 rounded-full bg-gradient-to-br from-purple-500/25 to-indigo-500/15 blur-3xl animate-pulse"></div>
                  <div className="pointer-events-none absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-400/15 to-violet-400/10 blur-3xl"></div>
                  <div className="pointer-events-none absolute top-1/3 right-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/5 blur-2xl"></div>

                  <div className="flex items-center justify-between mb-10 relative z-10">
                    <div>
                      <div className="text-xs font-sf-pro tracking-wider text-white/50 uppercase mb-2">
                        Launch Pricing
                      </div>
                      <h3 className="text-2xl font-semibold text-white font-sf-pro tracking-tight">
                        One plan. Everything.
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1">
                      {(["monthly", "annual", "lifetime"] as const).map(
                        (mode) => (
                          <button
                            key={mode}
                            onClick={() => setBillingPeriod(mode)}
                            className={`px-4 py-2.5 rounded-full text-[11px] font-medium tracking-wide font-sf-pro transition-all duration-300 ${
                              billingPeriod === mode
                                ? "bg-white text-black shadow"
                                : "text-white/60 hover:text-white"
                            }`}
                          >
                            {mode === "monthly"
                              ? "Monthly"
                              : mode === "annual"
                              ? "Annual"
                              : "Lifetime"}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Price Logic */}
                  {(() => {
                    const monthlyBase = 15.99;
                    const annualBase = monthlyBase * 12; // 191.88
                    const discountRate = 0.4; // 40%
                    const annualDisplay = 114.99; // prettier number
                    const monthlyDiscounted = (
                      monthlyBase *
                      (1 - discountRate)
                    ).toFixed(2); // if we want to show discount monthly view
                    // Lifetime (option C)
                    const lifetimeBase = 399; // anchor value
                    const lifetimeLaunch = 249; // launch lifetime price
                    const showAnnual = billingPeriod === "annual";
                    const showLifetime = billingPeriod === "lifetime";
                    return (
                      <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
                          <div>
                            <div className="flex items-center gap-4 mb-4">
                              {!showLifetime && (
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-black text-[11px] font-semibold tracking-wide font-sf-pro shadow-lg">
                                  40% OFF{" "}
                                  <span className="hidden sm:inline">
                                    LAUNCH
                                  </span>
                                </span>
                              )}
                              {showLifetime && (
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 text-black text-[11px] font-semibold tracking-wide font-sf-pro shadow-lg">
                                  BEST VALUE
                                </span>
                              )}
                              <span className="text-[11px] font-sf-pro tracking-wider text-white/50 uppercase">
                                {showLifetime
                                  ? "One-Time Purchase"
                                  : "Limited Time"}
                              </span>
                            </div>
                            <div className="flex items-baseline gap-4">
                              {showLifetime ? (
                                <>
                                  <div className="text-6xl font-extrabold tracking-tight text-white font-inter leading-none">
                                    ${lifetimeLaunch}
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <div className="text-white/40 text-sm font-sf-pro line-through">
                                      ${lifetimeBase.toFixed(2)}
                                    </div>
                                    <div className="text-white/50 text-xs font-sf-pro">
                                      Pay once • All future updates
                                    </div>
                                  </div>
                                </>
                              ) : showAnnual ? (
                                <>
                                  <div className="text-6xl font-extrabold tracking-tight text-white font-inter leading-none">
                                    ${annualDisplay}
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <div className="text-white/40 text-sm font-sf-pro line-through">
                                      ${annualBase.toFixed(2)}
                                    </div>
                                    <div className="text-white/50 text-xs font-sf-pro">
                                      Billed yearly
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="text-6xl font-extrabold tracking-tight text-white font-inter leading-none">
                                    ${monthlyBase.toFixed(2)}
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <div className="text-white/40 text-sm font-sf-pro line-through">
                                      ${parseFloat(monthlyDiscounted)}
                                    </div>
                                    <div className="text-white/50 text-xs font-sf-pro">
                                      Per month
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                            <p className="mt-6 text-sm text-white/60 font-sf-pro max-w-sm leading-relaxed">
                              {showLifetime
                                ? "Own Helthy forever. All current & future features + AI upgrades. No renewals, no surprises."
                                : showAnnual
                                ? "Secure the launch discount for 12 months. All features. Priority AI upgrades included."
                                : "Full access. Cancel anytime. Upgrade later and keep everything."}
                            </p>
                          </div>
                          <div className="flex flex-col gap-4 w-full max-w-xs">
                            <button className="w-full rounded-2xl py-5 bg-gradient-to-r from-white to-gray-200 text-black font-sf-pro font-medium text-sm tracking-wide shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all">
                              {showLifetime
                                ? "Get Lifetime Access"
                                : showAnnual
                                ? "Get Annual Access"
                                : "Start Monthly"}
                            </button>
                            <div className="grid grid-cols-2 gap-3">
                              <button
                                onClick={() =>
                                  setBillingPeriod(
                                    showLifetime ? "monthly" : "lifetime"
                                  )
                                }
                                className="w-full rounded-2xl py-3 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 font-sf-pro text-[11px] tracking-wider transition-colors"
                              >
                                {showLifetime ? "Monthly" : "Lifetime"}
                              </button>
                              <button
                                onClick={() =>
                                  setBillingPeriod(
                                    showAnnual ? "monthly" : "annual"
                                  )
                                }
                                className="w-full rounded-2xl py-3 bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 font-sf-pro text-[11px] tracking-wider transition-colors"
                              >
                                {showAnnual ? "Monthly" : "Annual"}
                              </button>
                            </div>
                            <div className="text-[10px] text-white/40 font-sf-pro tracking-wide text-center">
                              {showLifetime
                                ? "Pay once • Lifetime updates • Encrypted"
                                : "Encrypted • Cancel anytime • No hidden fees"}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Transition band: Themes → FAQ */}
        <div aria-hidden className="relative h-8 sm:h-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-[0.18]"></div>
        </div>

        {/* FAQ Section - Dark mode layout inspired by the reference */}
        <section id="faq" className="py-32 px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            <SectionMeta label="FAQ" number="05" tone="dark" />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-14"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase font-sf-pro">
                Frequently Asked Questions
              </h2>
              <p className="mt-6 max-w-2xl text-sm sm:text-base text-white/60 font-sf-pro">
                We’ve collected the most common questions to help you understand
                how Helthy works. If you don’t see yours, reach out and we’ll
                get you answers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition-colors p-8 flex flex-col h-full"
                >
                  <div className="text-6xl sm:text-7xl font-extrabold text-white/90 font-sf-pro">
                    {String(index + 1).padStart(2, "0")}
                    <span className="text-white/40">.</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-white font-sf-pro">
                    {faq.question}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-white/70 font-sf-pro">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Transition band: FAQ → Waitlist */}
        <div aria-hidden className="relative h-12 sm:h-14">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black"></div>
        </div>

        {/* Waitlist Section - Matching reference design */}
        <section
          id="waitlist"
          className="relative px-8 py-32 flex items-center justify-center overflow-hidden"
        >
          {/* Gradient Background with Earth Horizon - Softer blending */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black">
            {/* Horizon group - softer and more subtle */}
            <div className="absolute bottom-0 left-0 right-0 h-[400px] opacity-60">
              {/* Atmosphere band above horizon (softer and more subtle) */}
              <div className="absolute bottom-[160px] left-1/2 -translate-x-1/2 w-[150%] h-32 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(187,148,255,0.08)_50%,rgba(0,0,0,0)_80%)] blur-3xl opacity-70"></div>

              {/* Very subtle planet body */}
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[200%] h-[280px] rounded-t-[9999px] bg-gradient-to-t from-black via-gray-950 to-transparent opacity-80"></div>

              {/* Rim core (very subtle) */}
              <div className="absolute bottom-[162px] left-1/2 -translate-x-1/2 w-[180%] h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50"></div>

              {/* Soft atmospheric glow */}
              <div className="absolute bottom-[160px] left-1/2 -translate-x-1/2 w-[185%] h-6 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12)_0%,rgba(172,139,255,0.06)_60%,rgba(0,0,0,0)_85%)] blur-xl opacity-60"></div>
            </div>

            {/* Subtle edge vignette */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_50%,rgba(0,0,0,0.15)_90%,rgba(0,0,0,0.3)_100%)]"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <SectionMeta label="Waitlist" number="06" tone="dark" />
              {/* Main heading - SF Pro with Playfair for "who wait" */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-4 leading-tight font-sf-pro tracking-tight">
                <span className="font-medium">Good things come</span>
                <br />
                <span className="font-medium">to those </span>
                <span className="italic font-light font-inter">who wait.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-gray-400 text-lg mb-12 max-w-lg mx-auto font-sf-pro font-light leading-relaxed">
                Be among the first to experience the future of fitness. Get
                early access and exclusive updates.
              </p>

              {/* Email form */}
              <form
                onSubmit={submitWaitlist}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-6 py-4 bg-gray-800/80 border border-gray-600/50 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-gray-500 font-sf-pro backdrop-blur-sm disabled:opacity-50"
                  disabled={waitlistStatus === "loading"}
                />
                <motion.button
                  type="submit"
                  className={`px-[15px] py-4 rounded-full font-semibold transition-all duration-300 font-sf-pro whitespace-nowrap flex items-center justify-center gap-2 ${
                    waitlistStatus === "success"
                      ? "bg-green-500 text-white hover:bg-green-500"
                      : waitlistStatus === "error"
                      ? "bg-red-500 text-white hover:bg-red-500"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={waitlistStatus === "loading"}
                >
                  {waitlistStatus === "loading" && (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  )}
                  {waitlistStatus === "idle" && "Get Notified"}
                  {waitlistStatus === "loading" && "Submitting"}
                  {waitlistStatus === "success" && "Added"}
                  {waitlistStatus === "error" && "Retry"}
                </motion.button>
              </form>
              <AnimatePresence mode="wait">
                {waitlistError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-full text-center"
                  >
                    <div className="flex items-center justify-center gap-2 text-sm text-red-400 font-sf-pro">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {waitlistError}
                    </div>
                  </motion.div>
                )}
                {waitlistStatus === "success" && !waitlistError && (
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.7, rotateX: -15 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      rotateX: 0,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.34, 1.56, 0.64, 1],
                      delay: 0.1,
                    }}
                    className="mt-4"
                  >
                    <div className="relative p-4 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-green-500/20 rounded-2xl text-center overflow-hidden">
                      {/* Animated background glow */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: [0, 0.3, 0] }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-2xl"
                      />

                      {/* Success content */}
                      <div className="relative z-10 flex items-center justify-center gap-3">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.2,
                            ease: "easeOut",
                          }}
                          className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 }}
                          className="text-green-400 font-sf-pro"
                        >
                          <div className="font-semibold">
                            Welcome aboard! 🚀
                          </div>
                          <div className="text-xs text-green-400/80 mt-1">
                            You&apos;re on the exclusive early access list
                          </div>
                        </motion.div>
                      </div>

                      {/* Celebration particles */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{
                            opacity: 0,
                            scale: 0,
                            x: 0,
                            y: 0,
                            rotate: 0,
                          }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            x: Math.cos((i * 60 * Math.PI) / 180) * 30,
                            y: Math.sin((i * 60 * Math.PI) / 180) * 30,
                            rotate: 360,
                          }}
                          transition={{
                            duration: 1.2,
                            delay: 0.4 + i * 0.1,
                            ease: "easeOut",
                          }}
                          className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400 rounded-full"
                          style={{
                            transformOrigin: "center",
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="py-16 px-8 bg-gradient-to-b from-black to-gray-900 border-t border-gray-800">
          <div className="max-w-7xl mx-auto">
            {/* Main footer content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              {/* Brand section */}
              <div className="md:col-span-2">
                <div className="flex items-center mb-6">
                  <Image
                    src="/logo-white.png"
                    alt="Helthy"
                    width={140}
                    height={48}
                    className="h-10 w-auto"
                  />
                </div>
                <p className="text-gray-400 font-sf-pro text-sm leading-relaxed max-w-md">
                  The intelligent fitness platform that turns your health data
                  into actionable insights. Stop guessing, start knowing.
                </p>
                <div className="flex space-x-4 mt-6">
                  <button className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors flex items-center justify-center text-gray-400 hover:text-white">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors flex items-center justify-center text-gray-400 hover:text-white">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors flex items-center justify-center text-gray-400 hover:text-white">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z." />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Product links */}
              <div>
                <h3 className="text-white font-semibold font-sf-pro mb-4">
                  Product
                </h3>
                <ul className="space-y-3 text-sm font-sf-pro">
                  <li>
                    <a
                      href="#features"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#ai"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      AI Coach
                    </a>
                  </li>
                  <li>
                    <a
                      href="#themes"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Themes
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Roadmap
                    </a>
                  </li>
                </ul>
              </div>

              {/* Support links */}
              <div>
                <h3 className="text-white font-semibold font-sf-pro mb-4">
                  Support
                </h3>
                <ul className="space-y-3 text-sm font-sf-pro">
                  <li>
                    <a
                      href="#faq"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 font-sf-pro text-sm">
                © 2025 Helthy. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <span className="text-gray-500 text-xs font-sf-pro">
                  Made with ❤️ for fitness enthusiasts
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

// ==== Feature Cards (Exercise, AI Insights, Food) ====
// Exercise and Food cards have been inlined in the Features section per request.

function AIInsightsCard({
  className = "",
  image,
  imageAlt = "",
}: {
  className?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <div
      className={`bg-gradient-to-br from-gray-800/90 via-gray-700/90 to-gray-800/90 backdrop-blur-lg rounded-3xl border border-gray-600 shadow-lg p-6 flex flex-col ${className}`}
    >
      {image && (
        <div className="relative w-full h-36 rounded-xl overflow-hidden mb-3">
          <Image src={image} alt={imageAlt} fill className="object-cover" />
        </div>
      )}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center">
          <Brain className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-semibold text-gray-900 font-sf-pro">
          AI Insights
        </h3>
      </div>
      <p className="text-gray-600 text-sm font-sf-pro mb-4">
        The key to Helthy—personal guidance shaped by your day.
      </p>

      <div className="mt-auto">
        <div className="rounded-2xl border border-gray-300 bg-gray-100/80 p-4">
          <div className="text-xs text-gray-500 font-sf-pro mb-1">
            Today’s Focus
          </div>
          <div className="text-sm font-semibold text-gray-900 font-sf-pro">
            Protein gap: 22g • Add a Greek yogurt
          </div>
        </div>
      </div>
    </div>
  );
}
// FoodCard removed; inlined markup lives in the Features section above.

function VoiceLoggingCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-gray-600 bg-gray-800/65 backdrop-blur-lg p-5 shadow-lg ${className}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-xl bg-gray-700 text-white flex items-center justify-center">
          <Mic className="w-4 h-4" />
        </div>
        <h4 className="text-sm font-semibold text-white font-sf-pro">
          Voice logging
        </h4>
      </div>
      <p className="text-xs text-gray-300 font-sf-pro mb-4">
        Log workouts and meals hands‑free.
      </p>

      <div className="mt-2 flex flex-col items-center justify-center gap-4">
        <button
          className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg hover:scale-105 transition-transform flex items-center justify-center"
          aria-label="Start voice logging"
        >
          <Mic className="w-6 h-6" />
        </button>
        <div className="w-full h-10 rounded-xl bg-white/70 border border-gray-200 flex items-center px-3 gap-2">
          <div className="flex-1 h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-full" />
          <span className="text-[10px] text-gray-500 font-sf-pro">
            Listening…
          </span>
        </div>
      </div>
    </div>
  );
}

function AIDescribeCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white/65 backdrop-blur-lg p-5 shadow-lg ${className}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 text-white flex items-center justify-center">
          <Wand2 className="w-4 h-4" />
        </div>
        <h4 className="text-sm font-semibold text-gray-900 font-sf-pro">
          AI describe
        </h4>
      </div>
      <p className="text-xs text-gray-600 font-sf-pro mb-4">
        Describe your goal; we’ll turn it into a plan.
      </p>

      <div className="rounded-xl border border-gray-200 bg-white/70 p-3 min-h-[88px]">
        <div className="text-[11px] text-gray-500 font-sf-pro mb-1">Prompt</div>
        <div className="text-sm text-gray-800 font-sf-pro">
          “I have 25 minutes and dumbbells. Build me a quick push workout.”
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gray-900 text-white text-xs font-sf-pro hover:opacity-90">
          Generate
          <Wand2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function AIChatPanel({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-lg p-4 sm:p-5 shadow-lg flex flex-col ${className}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center">
          <MessageSquare className="w-4 h-4" />
        </div>
        <div className="text-sm font-semibold text-gray-900 font-sf-pro">
          AI Coach
        </div>
      </div>

      <div className="flex-1 overflow-auto space-y-3 pr-1">
        {/* Assistant bubble */}
        <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 p-3 text-sm text-gray-800 font-sf-pro">
          Hi! I can help with plans, meals, and recovery. Here’s what I can do:
          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
            <li>Generate goal‑aligned workout plans</li>
            <li>Analyze sets and suggest next weights</li>
            <li>Plan meals to close macro gaps</li>
            <li>Adapt to your schedule automatically</li>
            <li>Transcribe and summarize voice notes</li>
          </ul>
        </div>
        {/* User bubble */}
        <div className="ml-auto max-w-[70%] rounded-2xl rounded-tr-sm bg-gray-900 text-white p-3 text-sm font-sf-pro">
          I need a 3‑day split that fits 45 minutes per day.
        </div>
        {/* Assistant bubble */}
        <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white border border-gray-200 p-3 text-sm text-gray-800 font-sf-pro shadow-sm">
          Great—here’s a quick outline. I’ll adjust volume based on your last
          sessions and add progressions.
        </div>
      </div>

      {/* Input */}
      <div className="mt-3 flex items-center gap-2">
        <button
          className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center"
          aria-label="Start voice input"
        >
          <Mic className="w-4 h-4" />
        </button>
        <div className="flex-1 h-10 rounded-xl bg-white border border-gray-200 flex items-center px-3">
          <input
            className="flex-1 outline-none text-sm font-sf-pro placeholder:text-gray-400"
            placeholder="Message AI Coach"
          />
          <button
            className="text-gray-700 hover:text-black"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ==== Orbiting Themes (Solar System) ====
type Planet = {
  key: string;
  name: string;
  tagline: string;
  gradient: string; // tailwind gradient stops
  accent: string;
};

function OrbitingThemes({ planets }: { planets: readonly Planet[] }) {
  const [active, setActive] = useState<Planet | null>(null);
  const [paused, setPaused] = useState(false);

  // ring radii and speeds (seconds per revolution) - increased spacing
  const rings = [
    { radius: 200, speed: 30 },
    { radius: 300, speed: 40 },
    { radius: 420, speed: 50 },
  ];

  // distribute planets across rings with better spacing
  const sizes = [72, 64, 80, 60, 76, 88, 68]; // increased planet diameters
  const assignments = planets.map((p, i) => ({
    planet: p,
    ring: rings[i % rings.length],
    start: (i * 360) / planets.length + (i % 2 === 0 ? 15 : -15), // offset alternating planets
    diameter: sizes[i % sizes.length],
  }));

  return (
    <div
      className="relative mx-auto w-full max-w-[1400px] h-[900px] flex items-center justify-center [perspective:1200px] z-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(Boolean(active))}
    >
      {/* central star glow */}
      <div className="pointer-events-none absolute w-40 h-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.15)_55%,rgba(255,255,255,0)_70%)]"></div>
      {/* subtle solar corona */}
      <div className="pointer-events-none absolute w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.04)_55%,rgba(255,255,255,0)_70%)]"></div>

      {/* orbit rings */}
      <div
        className="absolute left-1/2 top-1/2 pointer-events-none z-0"
        style={{ transform: "translate(-50%, -50%) rotateX(55deg)" }}
      >
        {rings.map((r, idx) => (
          <div
            key={idx}
            className="absolute rounded-full border border-white/10"
            style={{
              width: r.radius * 2,
              height: r.radius * 2,
              left: -r.radius,
              top: -r.radius,
            }}
          />
        ))}
      </div>

      {/* planets - restored direct mapping for smoother orbital feel */}
      {assignments.map(({ planet, ring, start, diameter }, i) => (
        <PlanetOnOrbit
          key={planet.key}
          planet={planet}
          radius={ring.radius}
          speed={ring.speed}
          startDeg={start}
          diameter={diameter}
          paused={paused || Boolean(active)}
          onActivate={() => {
            console.log(`Clicked planet: ${planet.name}`);
            setActive(planet);
            setPaused(true);
          }}
        />
      ))}

      {/* legend */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-sf-pro text-center pointer-events-none z-10">
        <p>Click any planet to preview that theme</p>
        <p className="text-xs text-white/40 mt-1">
          Hover to pause orbital motion
        </p>
      </div>

      <ThemeModal planet={active} onClose={() => setActive(null)} />
    </div>
  );
}

function PlanetOnOrbit({
  planet,
  radius,
  speed,
  startDeg,
  diameter,
  paused,
  onActivate,
}: {
  planet: Planet;
  radius: number;
  speed: number; // seconds per 360 deg
  startDeg: number;
  diameter: number;
  paused: boolean;
  onActivate: () => void;
}) {
  const [hover, setHover] = useState(false);
  const duration = speed;

  return (
    <motion.div
      className="absolute [transform-style:preserve-3d]"
      style={{ width: radius * 2, height: radius * 2 }}
      animate={paused ? { rotate: startDeg } : { rotate: 360 + startDeg }}
      initial={{ rotate: startDeg }}
      transition={{ repeat: Infinity, ease: "linear", duration }}
    >
      <div
        className="absolute left-1/2 top-1/2 [transform:translate3d(0,0,0)] z-20"
        style={{ transform: `translate(${radius}px, -50%)` }}
      >
        <button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={onActivate}
          className="group relative transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/30 rounded-full cursor-pointer z-20"
          aria-label={`${planet.name} theme`}
          style={{ pointerEvents: "auto" }}
        >
          {/* planet body with 3D lighting */}
          <div
            className={`relative rounded-full bg-gradient-to-br ${planet.gradient} shadow-[0_0_32px_rgba(255,255,255,0.2)] border-2 border-white/20`}
            style={{ width: diameter, height: diameter }}
          >
            <div className="absolute -top-2 -left-2 w-12 h-12 rounded-full bg-white/30 blur-md" />
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_80%,transparent_40%,rgba(0,0,0,0.4)_75%)]" />
            <div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-3 rounded-full bg-black/50 blur-lg"
              style={{ width: Math.max(32, diameter * 0.7) }}
            />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap text-center pointer-events-none">
            <div className="text-white text-base font-semibold font-sf-pro">
              {planet.name}
            </div>
            <div className="text-white/60 text-xs font-sf-pro">
              {planet.tagline}
            </div>
          </div>
          <div
            className={`pointer-events-none absolute inset-0 rounded-full transition-all duration-500 ${
              hover
                ? "ring-6 ring-white/30 scale-125 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                : "ring-0 scale-100"
            }`}
          />
          <div
            className={`pointer-events-none absolute inset-0 rounded-full bg-white/10 transition-opacity duration-200 ${
              hover ? "opacity-100" : "opacity-0"
            }`}
          />
        </button>
      </div>
    </motion.div>
  );
}

function ThemeModal({
  planet,
  onClose,
}: {
  planet: Planet | null;
  onClose: () => void;
}) {
  if (!planet) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="relative z-10 w-[360px] sm:w-[420px] rounded-[44px] border border-white/15 bg-gradient-to-b from-white/10 to-white/[0.03] p-4 shadow-2xl"
        >
          {/* header */}
          <div className="flex items-center justify-between px-1 py-1">
            <div className="text-left">
              <div className="text-white font-semibold font-sf-pro">
                {planet.name}
              </div>
              <div className="text-white/60 text-xs font-sf-pro">
                {planet.tagline}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* iPhone mock screen */}
          <div className="mt-2 rounded-[36px] overflow-hidden border border-white/10 bg-black">
            {/* dynamic theme header */}
            <div
              className={`h-28 bg-gradient-to-br ${planet.gradient} flex items-center justify-center`}
            >
              <div className="text-white font-sf-pro font-semibold">Helthy</div>
            </div>
            <div className="p-4 space-y-3 bg-black">
              <div className="grid grid-cols-3 gap-3">
                <div className="h-20 rounded-2xl bg-white/5 border border-white/10"></div>
                <div className="h-20 rounded-2xl bg-white/5 border border-white/10"></div>
                <div className="h-20 rounded-2xl bg-white/5 border border-white/10"></div>
              </div>
              <div className="h-10 rounded-xl bg-white/5 border border-white/10"></div>
              <div className="h-10 rounded-xl bg-white/5 border border-white/10"></div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
