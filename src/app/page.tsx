"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Activity, Brain, Target, Zap, ChevronDown, X } from "lucide-react";

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
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY;
      const hasScrolledDown = currentScrollY > 100;

      setLastScrollY(currentScrollY);

      if (!hasScrolledDown) {
        // At top of page - show Dynamic Island in original state
        setIsNavExpanded(false);
        setIsDynamicIslandVisible(true);
      } else {
        // After scrolling down - show/hide entire DI based on scroll direction
        setIsNavExpanded(scrollingUp);
        setIsDynamicIslandVisible(scrollingUp);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
      {/* iPhone Body - Black bezel around entire viewport */}
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-1 sm:p-3 lg:p-6">
        {/* iPhone Screen - Super curved edges with silver background */}
        <div className="min-h-screen bg-silver-abstract curved-edges overflow-hidden relative shadow-2xl">
          {/* Dynamic Island - Transforms into navbar */}
          <motion.div
            className="fixed top-10 left-1/2 transform -translate-x-1/2 z-30"
            animate={{
              width: isNavExpanded ? "54%" : 384,
              height: isNavExpanded ? 64 : 84,
              y: isNavExpanded ? 10 : 0,
              opacity: isDynamicIslandVisible ? 1 : 0,
              scale: isDynamicIslandVisible ? 1 : 0.8,
            }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="w-full h-full dynamic-island rounded-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                {!isNavExpanded ? (
                  <motion.div
                    key="island"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                    <div className="w-16 h-1 bg-white/60 rounded-full"></div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="navbar"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex items-center justify-between w-full px-8 text-sm font-medium text-white"
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
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Removed old separate navbar */}
          {/* Removed old separate navbar */}

          {/* Hero Section - Full iPhone Screen */}
          <section
            id="home"
            className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
          >
            {/* Clean, simple background */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-slate-300/30 to-gray-400/20 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-gray-300/25 to-slate-400/15 rounded-full blur-3xl opacity-40"></div>
              <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-zinc-300/20 to-gray-500/10 rounded-full blur-2xl opacity-30"></div>
            </div>

            <div className="relative z-10 px-6 w-full max-w-5xl mx-auto text-center mt-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <SectionMeta
                  label="Home"
                  number="01"
                  tone="light"
                  className="text-left"
                />
                {/* Status Bar Space */}
                <div className="h-8"></div>

                {/* Main Greeting */}
                <div className="mb-12">
                  <h3 className="text-lg text-gray-600 mb-4 font-sf-pro font-light">
                    Good morning, Alex
                  </h3>
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 font-playfair leading-tight">
                    Ready to crush{" "}
                    <span className="bg-gradient-to-r from-slate-700 via-gray-800 to-zinc-900 bg-clip-text text-transparent italic">
                      today's goals?
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 font-sf-pro font-light max-w-2xl mx-auto leading-relaxed">
                    Your AI-powered companion for smarter fitness, better
                    nutrition, and faster results.
                  </p>
                </div>

                {/* Quick Stats Dashboard */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  <motion.div
                    className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-gray-200/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <p className="text-sm text-gray-500 font-sf-pro font-medium">
                          Calories Left
                        </p>
                        <p className="text-4xl font-bold text-gray-900 font-sf-pro">
                          1,247
                        </p>
                        <p className="text-xs text-green-600 font-sf-pro font-medium">
                          On track
                        </p>
                      </div>
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-gray-200/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <p className="text-sm text-gray-500 font-sf-pro font-medium">
                          Today's Focus
                        </p>
                        <p className="text-2xl font-bold text-gray-900 font-sf-pro">
                          Upper Body
                        </p>
                        <p className="text-xs text-orange-600 font-sf-pro font-medium">
                          45 min planned
                        </p>
                      </div>
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-gray-200/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <p className="text-sm text-gray-500 font-sf-pro font-medium">
                          AI Suggests
                        </p>
                        <p className="text-xl font-bold text-gray-900 font-sf-pro">
                          Post-lunch walk
                        </p>
                        <p className="text-xs text-purple-600 font-sf-pro font-medium">
                          20 min boost
                        </p>
                      </div>
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Brain className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Main CTA */}
                <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <motion.button
                      className="bg-gradient-to-r from-gray-800 to-black text-white px-12 py-5 rounded-full text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 font-sf-pro"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start Your Journey
                    </motion.button>
                    <motion.button
                      className="border-2 border-gray-400 text-gray-700 px-12 py-5 rounded-full text-lg font-semibold hover:border-gray-600 hover:bg-gray-50 transition-all duration-300 font-sf-pro"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Join Waitlist
                    </motion.button>
                  </div>
                  <p className="text-gray-500 text-sm font-sf-pro">
                    Join 10,000+ users already transforming their fitness
                    journey
                  </p>
                </motion.div>
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

          {/* Features Section - Inside iPhone */}
          <section id="features" className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <SectionMeta label="Features" number="02" tone="light" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Left: Exercise expanded view (tall) */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <ExerciseCard className="h-[520px]" />
                </motion.div>

                {/* Middle: AI insights (bottom-aligned) */}
                <motion.div
                  className="lg:self-end"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <AIInsightsCard className="h-[280px]" />
                </motion.div>

                {/* Right: Food section (taller than exercise) */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  <FoodCard className="h-[640px]" />
                </motion.div>
              </div>
            </div>
          </section>

          {/* AI Section - Inside iPhone */}
          <section
            id="ai"
            className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white"
          >
            <div className="max-w-6xl mx-auto">
              <SectionMeta label="AI" number="03" tone="light" />
              {/* Placeholder structure; content to be refined once details are provided */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-gray-200">
                  <h3 className="text-gray-900 font-sf-pro font-semibold mb-2">
                    AI Capabilities
                  </h3>
                  <p className="text-gray-600 font-sf-pro text-sm">
                    We’ll showcase core AI features here once you share details.
                  </p>
                </div>
                <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-gray-200">
                  <h3 className="text-gray-900 font-sf-pro font-semibold mb-2">
                    Personalization
                  </h3>
                  <p className="text-gray-600 font-sf-pro text-sm">
                    A compact demo of how insights adapt to users over time.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Outside iPhone Screen - Dark Background Sections */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        {/* Themes Section - Solar system with orbiting planets */}
        <section id="themes" className="py-28 px-4 relative overflow-hidden">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <SectionMeta
              label="Themes"
              number="04"
              tone="dark"
              className="text-left"
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase font-sf-pro"
            >
              Themes In Orbit
            </motion.h2>
            <p className="text-white/70 font-sf-pro max-w-2xl mx-auto">
              Hover or click a planet to preview the app in that theme.
            </p>
          </div>

          {/* Orbit system */}
          <OrbitingThemes planets={themePlanets} />
        </section>

        {/* Transition band: Themes → FAQ */}
        <div aria-hidden className="relative h-16 sm:h-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-[0.18]"></div>
        </div>

        {/* FAQ Section - Dark mode layout inspired by the reference */}
        <section id="faq" className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition-colors p-8 flex flex-col h-full"
                >
                  <div className="text-6xl sm:text-7xl font-extrabold text-white/90 font-sf-pro">
                    {(index + 1).toString().padStart(2, "0")}
                    <span className="text-white/40">.</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-white font-sf-pro">
                    {faq.question}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-white/70 font-sf-pro">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Transition band: FAQ → Waitlist */}
        <div aria-hidden className="relative h-24 sm:h-28">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black"></div>
        </div>

        {/* Waitlist Section - Matching reference design */}
        <section
          id="waitlist"
          className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
        >
          {/* Gradient Background with Earth Horizon */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0b0613] to-black">
            {/* Horizon group */}
            <div className="absolute bottom-0 left-0 right-0 h-[520px]">
              {/* Atmosphere band above horizon (broad, very soft) */}
              <div className="absolute bottom-[205px] left-1/2 -translate-x-1/2 w-[175%] h-48 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.45)_0%,rgba(187,148,255,0.18)_40%,rgba(0,0,0,0)_78%)] blur-[36px] opacity-95"></div>

              {/* Very dark planet body (slightly larger ellipse for stronger arc) */}
              <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-[280%] h-[360px] rounded-t-[9999px] bg-black"></div>

              {/* Rim core (thin, soft) */}
              <div className="absolute bottom-[206px] left-1/2 -translate-x-1/2 w-[235%] h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"></div>

              {/* Rim bloom (wide, subtle tint and blur to blend) */}
              <div className="absolute bottom-[204px] left-1/2 -translate-x-1/2 w-[240%] h-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.28)_0%,rgba(172,139,255,0.14)_40%,rgba(0,0,0,0)_80%)] blur-2xl"></div>

              {/* Secondary atmospheric arcs (very faint to avoid harsh lines) */}
              <div className="absolute bottom-[214px] left-1/2 -translate-x-1/2 w-[210%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <div className="absolute bottom-[222px] left-1/2 -translate-x-1/2 w-[190%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </div>

            {/* Edge vignette for stronger planet silhouette */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_42%,rgba(0,0,0,0.28)_86%,rgba(0,0,0,0.55)_100%)]"></div>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <SectionMeta label="Waitlist" number="06" tone="dark" />
              {/* Main heading - SF Pro with Playfair for "who wait" */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-4 leading-tight font-sf-pro tracking-tight">
                <span className="font-medium">Good things come</span>
                <br />
                <span className="font-medium">to those </span>
                <span className="italic font-light font-playfair">
                  who wait.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-gray-400 text-lg mb-12 max-w-lg mx-auto font-sf-pro font-light leading-relaxed">
                Be among the first to experience the future of fitness. Get
                early access and exclusive updates.
              </p>

              {/* Email form */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 bg-gray-800/80 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-gray-500 font-sf-pro backdrop-blur-sm"
                />
                <motion.button
                  className="bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 font-sf-pro whitespace-nowrap"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Notified
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Simple Footer */}
        <footer className="py-8 px-4 bg-black border-t border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400 font-sf-pro text-sm">
              © 2025 Helthy. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

// ==== Feature Cards (Exercise, AI Insights, Food) ====
function ExerciseCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-white/70 backdrop-blur-lg rounded-3xl border border-gray-200 shadow-lg p-6 flex flex-col ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gray-900 text-white flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-gray-900 font-sf-pro">
            Exercise
          </h3>
        </div>
        <span className="text-[10px] text-gray-500 font-sf-pro uppercase tracking-wider">
          Today
        </span>
      </div>
      <p className="text-gray-600 text-sm font-sf-pro mb-4">
        Expanded view of your current exercise with sets and rest.
      </p>

      <div className="rounded-2xl border border-gray-200 bg-white/60 p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-xs text-gray-500 font-sf-pro">Exercise</div>
            <div className="text-lg font-semibold text-gray-900 font-sf-pro">
              Barbell Bench Press
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 font-sf-pro">Target</div>
            <div className="text-sm font-medium text-gray-800 font-sf-pro">
              Chest • Triceps
            </div>
          </div>
        </div>
        <div className="h-px bg-gray-200 my-3" />
        <div
          className="space-y-3 overflow-auto pr-1"
          style={{ scrollbarWidth: "thin" }}
        >
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border border-gray-300 bg-white flex items-center justify-center text-[11px] text-gray-600 font-sf-pro">
                  {n}
                </div>
                <div className="text-sm text-gray-800 font-sf-pro">
                  8 reps <span className="text-gray-400">@</span> 155 lb
                </div>
              </div>
              <div className="text-xs text-gray-500 font-sf-pro">Rest 90s</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-4 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-gray-200 bg-white/60 p-3 text-center">
          <div className="text-[10px] text-gray-500 font-sf-pro">Volume</div>
          <div className="text-sm font-semibold text-gray-900 font-sf-pro">
            4,960 lb
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white/60 p-3 text-center">
          <div className="text-[10px] text-gray-500 font-sf-pro">RPE</div>
          <div className="text-sm font-semibold text-gray-900 font-sf-pro">
            7.5
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white/60 p-3 text-center">
          <div className="text-[10px] text-gray-500 font-sf-pro">Last PR</div>
          <div className="text-sm font-semibold text-gray-900 font-sf-pro">
            185 lb
          </div>
        </div>
      </div>
    </div>
  );
}

function AIInsightsCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-white/70 backdrop-blur-lg rounded-3xl border border-gray-200 shadow-lg p-6 flex flex-col ${className}`}
    >
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
        <div className="rounded-2xl border border-gray-200 bg-white/60 p-4">
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

function FoodCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-white/70 backdrop-blur-lg rounded-3xl border border-gray-200 shadow-lg p-6 flex flex-col ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-900 font-sf-pro">
          Food
        </h3>
        <span className="text-[10px] text-gray-500 font-sf-pro uppercase tracking-wider">
          Macros
        </span>
      </div>
      <p className="text-gray-600 text-sm font-sf-pro mb-4">
        Plan meals and macros with zero friction.
      </p>

      <div className="space-y-4">
        {/* Macro bars */}
        {[
          { k: "Protein", c: "bg-emerald-500", v: 68 },
          { k: "Carbs", c: "bg-sky-500", v: 52 },
          { k: "Fat", c: "bg-amber-500", v: 34 },
        ].map((m) => (
          <div key={m.k} className="">
            <div className="flex items-center justify-between text-xs text-gray-600 font-sf-pro mb-1">
              <span>{m.k}</span>
              <span>{m.v}%</span>
            </div>
            <div className="h-2.5 rounded-full bg-gray-200 overflow-hidden">
              <div className={`h-full ${m.c}`} style={{ width: `${m.v}%` }} />
            </div>
          </div>
        ))}

        {/* Meals grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {["Breakfast", "Lunch", "Snack", "Dinner"].map((meal) => (
            <div
              key={meal}
              className="rounded-2xl border border-gray-200 bg-white/60 p-4"
            >
              <div className="text-[11px] text-gray-500 font-sf-pro mb-1">
                {meal}
              </div>
              <div className="text-sm font-semibold text-gray-900 font-sf-pro">
                + Add item
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-4">
        <div className="rounded-xl border border-gray-200 bg-white/60 p-3 flex items-center justify-between">
          <div className="text-[10px] text-gray-500 font-sf-pro">Calories</div>
          <div className="text-sm font-semibold text-gray-900 font-sf-pro">
            1,420 / 2,100
          </div>
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

  // ring radii and speeds (seconds per revolution)
  const rings = [
    { radius: 180, speed: 26 },
    { radius: 260, speed: 34 },
    { radius: 340, speed: 42 },
  ];

  // distribute planets across rings
  const sizes = [60, 52, 68, 48, 64, 72, 56]; // planet diameters in px
  const assignments = planets.map((p, i) => ({
    planet: p,
    ring: rings[i % rings.length],
    start: (i * 360) / planets.length,
    diameter: sizes[i % sizes.length],
  }));

  return (
    <div
      className="relative mx-auto w-full max-w-[1200px] h-[680px] flex items-center justify-center [perspective:1200px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(Boolean(active))}
    >
      {/* central star glow */}
      <div className="absolute w-40 h-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.15)_55%,rgba(255,255,255,0)_70%)]"></div>
      {/* subtle solar corona */}
      <div className="absolute w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.04)_55%,rgba(255,255,255,0)_70%)]"></div>

      {/* orbit rings */}
      <div
        className="absolute left-1/2 top-1/2"
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

      {/* planets */}
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
            setActive(planet);
            setPaused(true);
          }}
        />
      ))}

      {/* legend */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white/50 text-xs font-sf-pro">
        Hover or click to pause orbit
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
        className="absolute left-1/2 top-1/2 [transform:translate3d(0,0,0)]"
        style={{ transform: `translate(${radius}px, -50%)` }}
      >
        <button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={onActivate}
          className="group relative"
          aria-label={`${planet.name} theme`}
        >
          {/* planet body with 3D lighting */}
          <div
            className={`relative rounded-full bg-gradient-to-br ${planet.gradient} shadow-[0_0_24px_rgba(255,255,255,0.15)] border border-white/10`}
            style={{ width: diameter, height: diameter }}
          >
            {/* highlight */}
            <div className="absolute -top-1 -left-1 w-10 h-10 rounded-full bg-white/25 blur-md" />
            {/* limb shadow */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_80%,transparent_40%,rgba(0,0,0,0.35)_75%)]" />
            {/* drop shadow to plane */}
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-2 rounded-full bg-black/40 blur-md"
              style={{ width: Math.max(24, diameter * 0.6) }}
            />
          </div>

          {/* label */}
          <div className="absolute left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap text-center">
            <div className="text-white text-sm font-semibold font-sf-pro">
              {planet.name}
            </div>
            <div className="text-white/60 text-[11px] font-sf-pro">
              {planet.tagline}
            </div>
          </div>

          {/* halo on hover */}
          <div
            className={`pointer-events-none absolute inset-0 rounded-full transition-all duration-300 ${
              hover ? "ring-4 ring-white/20 scale-110" : "ring-0 scale-100"
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
