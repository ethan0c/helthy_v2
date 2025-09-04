"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Activity,
  Brain,
  Target,
  Zap,
  Smartphone,
  ChevronDown,
  Check,
  Palette,
  Mail,
  Plus,
  Minus,
} from "lucide-react";

export default function Home() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isDynamicIslandVisible, setIsDynamicIslandVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
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

  const themes = [
    {
      name: "Midnight",
      color: "from-slate-900 to-slate-700",
      accent: "#6366f1",
    },
    { name: "Ocean", color: "from-blue-900 to-cyan-700", accent: "#06b6d4" },
    {
      name: "Forest",
      color: "from-green-900 to-emerald-700",
      accent: "#10b981",
    },
    { name: "Sunset", color: "from-orange-900 to-red-700", accent: "#f97316" },
    {
      name: "Purple",
      color: "from-purple-900 to-violet-700",
      accent: "#8b5cf6",
    },
    { name: "Rose", color: "from-pink-900 to-rose-700", accent: "#ec4899" },
  ];

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
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-playfair">
                  Reach Your Goals{" "}
                  <span className="text-indigo-600">Faster</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto font-sf-pro">
                  Track analytics, meals, and workouts with intelligent insights
                  that adapt to your lifestyle
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Activity className="w-8 h-8" />,
                    title: "Smart Analytics",
                    description:
                      "Track your progress with detailed analytics that reveal patterns and optimize your routines",
                  },
                  {
                    icon: <Target className="w-8 h-8" />,
                    title: "Goal Tracking",
                    description:
                      "Set and achieve personalized goals with AI-powered recommendations and milestone celebrations",
                  },
                  {
                    icon: <Zap className="w-8 h-8" />,
                    title: "Instant Insights",
                    description:
                      "Get real-time feedback on your workouts, nutrition, and recovery to maximize results",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:bg-gray-100 hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-indigo-600 mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 font-sf-pro">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 font-sf-pro">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* AI Section - Inside iPhone */}
          <section
            id="ai"
            className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white"
          >
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-playfair">
                  AI-Powered{" "}
                  <span className="text-purple-600">Intelligence</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 font-sf-pro">
                  Experience the future of fitness with our advanced AI that
                  learns from your habits
                </p>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="text-left">
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                          <Brain className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 font-sf-pro">
                            Smart Recommendations
                          </h3>
                          <p className="text-gray-600 font-sf-pro">
                            AI analyzes your progress and suggests personalized
                            workouts
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Target className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 font-sf-pro">
                            Adaptive Goals
                          </h3>
                          <p className="text-gray-600 font-sf-pro">
                            Goals that evolve with your fitness journey
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-80 h-80 bg-gradient-to-br from-purple-400 to-blue-500 rounded-3xl mx-auto flex items-center justify-center">
                      <Brain className="w-32 h-32 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>

      {/* Outside iPhone Screen - Dark Background Sections */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        {/* Themes Section */}
        <section id="themes" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-playfair">
                Beautiful <span className="text-indigo-400">Themes</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto font-sf-pro">
                Customize your experience with stunning themes that match your
                style
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {themes.map((theme, index) => (
                <motion.div
                  key={index}
                  className="relative overflow-hidden rounded-2xl h-32 cursor-pointer group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div
                    className={`w-full h-full bg-gradient-to-br ${theme.color}`}
                  ></div>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white font-bold text-lg font-sf-pro">
                      {theme.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-playfair">
                Frequently Asked{" "}
                <span className="text-green-400">Questions</span>
              </h2>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors rounded-2xl"
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? null : index)
                    }
                  >
                    <span className="text-lg font-medium text-white font-sf-pro">
                      {faq.question}
                    </span>
                    {expandedFaq === index ? (
                      <Minus className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4">
                          <p className="text-gray-300 font-sf-pro">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Waitlist Section - Matching reference design */}
        <section
          id="waitlist"
          className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
        >
          {/* Gradient Background with Earth Curve */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900/20 to-black">
            {/* Earth curve at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-64">
              <div className="w-full h-full bg-gradient-to-t from-gray-800 via-gray-700 to-transparent rounded-t-full transform scale-x-150 origin-bottom"></div>
            </div>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Small indicator */}
              <div className="flex items-center justify-center gap-2 mb-8">
                <span className="text-gray-400 text-sm font-sf-pro">
                  Waitlist ⭐ Framer Template
                </span>
              </div>

              {/* Main heading - exactly like reference */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4 leading-tight">
                <span className="font-light">Good things come</span>
                <br />
                <span className="font-light">to those </span>
                <span className="italic font-light">who wait.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-gray-400 text-lg mb-12 max-w-lg mx-auto font-sf-pro font-light leading-relaxed">
                Launch your very own waitlist, grow your mailing list all while
                building the hype for launch day.
              </p>

              {/* Email form */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
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

              {/* Attribution */}
              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                <span className="font-sf-pro">Created by</span>
                <span className="text-white font-sf-pro">🤍 Hamza Ehsan</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final Footer */}
        <footer className="py-12 px-4 border-t border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-2xl font-bold mb-4 text-white font-playfair">
              Helthy
            </div>
            <p className="text-gray-400 font-sf-pro">
              The future of fitness is here
            </p>
            <div className="mt-8 text-gray-500 text-sm font-sf-pro">
              © 2025 Helthy. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
