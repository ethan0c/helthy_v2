"use client";

import { useState, useEffect } from "react";
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
  const [email, setEmail] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();

  const navTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useEffect(() => {
    const unsubscribe = navTransform.onChange((latest: number) => {
      setIsNavExpanded(latest > 0.5);
    });
    return unsubscribe;
  }, [navTransform]);

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
    // iPhone Body - Dark bezel around entire viewport
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-1 sm:p-2">
      {/* iPhone Screen - The main content area */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-none sm:rounded-xl overflow-hidden relative shadow-2xl">
        {/* Dynamic Island - Always visible at top */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-full z-30 shadow-lg"></div>

        {/* Dynamic Navbar - Appears on scroll */}
        <motion.nav
          className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50"
          animate={{
            width: isNavExpanded ? "90%" : 0,
            height: isNavExpanded ? 64 : 0,
            opacity: isNavExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="w-full h-full bg-white/95 backdrop-blur-xl rounded-full border border-gray-200/50 shadow-xl">
            <div className="flex items-center justify-center h-full px-8">
              <motion.div
                className="flex items-center justify-between w-full text-sm font-medium text-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: isNavExpanded ? 1 : 0 }}
                transition={{ delay: isNavExpanded ? 0.3 : 0 }}
              >
                <div className="font-bold text-xl text-black">Helthy</div>
                <div className="flex items-center space-x-8">
                  <a
                    href="#home"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Home
                  </a>
                  <a
                    href="#features"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Features
                  </a>
                  <a
                    href="#ai"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    AI
                  </a>
                  <a
                    href="#themes"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    Themes
                  </a>
                  <a
                    href="#faq"
                    className="hover:text-indigo-600 transition-colors"
                  >
                    FAQ
                  </a>
                  <a
                    href="#waitlist"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors shadow-lg"
                  >
                    Waitlist
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section - Full iPhone Screen */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
        >
          {/* Subtle background patterns */}
          <div className="absolute inset-0">
            <div className="absolute top-32 left-8 w-64 h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div
              className="absolute bottom-32 right-8 w-80 h-80 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-15 animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <div className="relative z-10 px-6 w-full max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              {/* Status Bar Space */}
              <div className="h-8"></div>

              {/* Main Greeting */}
              <div className="mb-8">
                <h3 className="text-lg text-gray-600 mb-2">
                  Good morning, Alex
                </h3>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                  Ready to crush
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {" "}
                    today&apos;s goals?
                  </span>
                </h1>
              </div>

              {/* Quick Stats Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <motion.div
                  className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-sm text-gray-600">Calories Left</p>
                      <p className="text-3xl font-bold text-gray-900">1,247</p>
                      <p className="text-xs text-green-600">On track</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <Target className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-sm text-gray-600">
                        Today&apos;s Focus
                      </p>
                      <p className="text-xl font-bold text-gray-900">
                        Upper Body
                      </p>
                      <p className="text-xs text-orange-600">45 min planned</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                      <Zap className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-sm text-gray-600">AI Suggests</p>
                      <p className="text-lg font-bold text-gray-900">
                        Post-lunch walk
                      </p>
                      <p className="text-xs text-purple-600">20 min boost</p>
                    </div>
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center">
                      <Brain className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Main CTA */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.button
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Your Journey
                  </motion.button>
                  <motion.button
                    className="border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-full text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join Waitlist
                  </motion.button>
                </div>
                <p className="text-gray-500 text-sm">
                  Join 10,000+ users already transforming their fitness journey
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

        {/* Features Section */}
        <section id="features" className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Reach Your Goals <span className="text-indigo-600">Faster</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Minimal Footer for iPhone feel */}
        <footer className="py-8 px-4 bg-gray-50 border-t border-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-xl font-bold mb-2 text-gray-900">Helthy</div>
            <p className="text-gray-500 text-sm">
              The future of fitness is here
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
