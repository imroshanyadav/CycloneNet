import {
  ArrowRight,
  Award,
  BarChart3,
  Eye,
  Globe,
  Layers,
  Moon,
  Satellite,
  Shield,
  Sun,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface LandingPageProps {
  onEnterApp: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export function LandingPage({
  onEnterApp,
  isDark,
  onToggleTheme,
}: LandingPageProps) {
  const [scrollY, setScrollY] = useState(0);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [visibleFeatures, setVisibleFeatures] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Check each feature card visibility
      if (featuresRef.current) {
        const cards = featuresRef.current.querySelectorAll(".feature-card");
        const newVisible = Array.from(cards).map((card) => {
          const rect = card.getBoundingClientRect();
          return rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
        });
        setVisibleFeatures(newVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      id: 1,
      icon: Satellite,
      number: "1.",
      title: "Multi-Source Satellite Data",
      subtitle: "More Eyes. Better Understanding.",
      description:
        "Integrates data from INSAT, NOAA and other satellites to get high-resolution, multi-spectral imagery for accurate cyclone monitoring.",
      color: "cyan",
    },
    {
      id: 2,
      icon: Eye,
      number: "2.",
      title: "Cyclone Detection & Classification",
      subtitle: "From Clouds to Cyclones.",
      description:
        "Advanced deep learning models analyze satellite images to detect cyclone formation and classify their type, stage and intensity.",
      color: "cyan",
    },
    {
      id: 3,
      icon: Layers,
      number: "3.",
      title: "Pattern & Life Stage Analysis",
      subtitle: "Understand the Cyclone's Behaviour.",
      description:
        "Identifies cyclone structure and life stages such as developing, depression, storm, mature and weakening for better forecasting and risk assessment.",
      color: "cyan",
    },
    {
      id: 4,
      icon: TrendingUp,
      number: "4.",
      title: "Track & Intensity Prediction",
      subtitle: "Predict the Path. Prepare the Coast.",
      description:
        "Uses historical data and temporal AI models to predict the cyclone's future path and intensity for 12-72 hours with confidence levels.",
      color: "cyan",
    },
    {
      id: 5,
      icon: Shield,
      number: "5.",
      title: "Risk Analysis & Alert System",
      subtitle: "From Prediction to Protection.",
      description:
        "Combines cyclone intensity, coastal geography and population exposure to calculate risk levels and issue early warnings for affected regions.",
      color: "cyan",
    },
    {
      id: 6,
      icon: BarChart3,
      number: "6.",
      title: "Interactive Dashboard & Visualization",
      subtitle: "See It All. In One Place.",
      description:
        "Get a real-time view of satellite imagery, cyclone details, predicted path and risk zones through a user-friendly, interactive map and dashboard.",
      color: "cyan",
    },
  ];

  return (
    <div
      className={`theme-shell relative w-full min-h-screen overflow-x-hidden overflow-y-visible bg-[#0a0a0a] ${isDark ? "theme-dark" : "theme-light"}`}
    >
      {/* Cinematic satellite background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-100 ease-out"
        style={{
          backgroundImage: "url('/satellite_bg.jpg')",
          filter: "brightness(0.32) saturate(0.8)",
          transform: `rotate(${scrollY * 0.03}deg) scale(${1 + scrollY * 0.0001})`,
        }}
      />

      {/* Reference-style edge vignette and readable text field */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_55%_62%,transparent_8%,rgba(0,0,0,0.18)_48%,rgba(0,0,0,0.84)_100%)]" />
      <div className="fixed inset-0 bg-gradient-to-r from-black/90 via-black/35 to-black/35" />

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation Bar */}
        <nav className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-8 lg:px-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-semibold tracking-[-0.06em] text-white">
              CycloNet
            </span>
            <a
              href="#features"
              className="ml-5 text-sm text-white/55 transition-colors hover:text-white"
            >
              Archive
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <a
              href="#home"
              className="hidden text-white/60 transition-colors hover:text-white md:inline"
            >
              Home
            </a>
            <a
              href="#about"
              className="hidden text-white/60 transition-colors hover:text-white md:inline"
            >
              About
            </a>
            <a
              href="#features"
              className="hidden text-white/60 transition-colors hover:text-white md:inline"
            >
              Features
            </a>
            <a
              href="#"
              className="hidden text-white/60 transition-colors hover:text-white md:inline"
              onClick={(e) => {
                e.preventDefault();
                onEnterApp();
              }}
            >
              Dashboard
            </a>
            <button
              onClick={onToggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/20 text-gray-200 transition-colors hover:bg-white/15"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={onEnterApp}
              className="hidden rounded-full border border-white/25 bg-white/10 px-4 py-2 font-medium text-white transition-all hover:bg-white/20 sm:inline-flex"
            >
              Get Started →
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="mx-auto flex min-h-[calc(100vh-105px)] w-full max-w-5xl items-center px-6 pb-16 pt-8 lg:px-0">
          <div className="max-w-xl animate-fade-in text-left">
            <h1 className="mb-8 max-w-xl text-5xl font-bold leading-[1.08] tracking-[-0.045em] text-white sm:text-6xl lg:text-[4.2rem]">
              Track the storm.<br />
              Read its structure.<br />
              Prepare for what comes next.
            </h1>
            <p className="mb-10 max-w-md text-base leading-relaxed text-white/65 sm:text-lg">
              Satellite imagery, AI classification, intensity estimates, and forecast tracks in one focused workspace.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row animate-fade-in-delay-1">
              <button
                onClick={onEnterApp}
                className="group flex items-center justify-center gap-2 rounded-md bg-white/10 px-5 py-3 text-base font-medium text-white shadow-lg shadow-black/20 backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <span>Insert Your Image</span>
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <button className="rounded-md border border-white/55 bg-black/10 px-5 py-3 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/15">
                Live Weather Map
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-20 animate-fade-in-delay-5">
              <div className="flex flex-col items-center gap-2 text-gray-500 animate-bounce-slow">
                <span className="text-xs uppercase tracking-widest">
                  Scroll to explore
                </span>
                <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex items-start justify-center p-2">
                  <div className="w-1 h-3 bg-gray-500 rounded-full animate-scroll-down" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tagline Section */}
        <div id="home" className="py-20 px-6 text-center">
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Powerful Features for a{" "}
            <span className="text-cyan-400">Safer Tomorrow</span>
          </h3>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            From satellite data to actionable insights — CycloNet leverages AI
            to detect, analyze and predict tropical cyclones, helping
            communities stay one step ahead.
          </p>
        </div>

        {/* About Section */}
        <div id="about" className="py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About <span className="text-cyan-400">CycloNet</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              An intelligent cyclone monitoring and prediction system designed
              for the North Indian Ocean region
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Mission Card */}
            <div className="p-10 rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-800/60 backdrop-blur-md border border-cyan-500/30">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center mb-6 border border-cyan-400/50">
                <Target size={32} className="text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                To provide accurate, timely cyclone predictions using advanced
                AI and satellite imagery, protecting lives and property across
                coastal regions of India.
              </p>
              <p className="text-gray-400 leading-relaxed">
                CycloNet combines cutting-edge deep learning models with
                multi-source satellite data to deliver real-time cyclone
                detection, classification, and track prediction with
                unprecedented accuracy.
              </p>
            </div>

            {/* Vision Card */}
            <div className="p-10 rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-800/60 backdrop-blur-md border border-blue-500/30">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center mb-6 border border-blue-400/50">
                <Globe size={32} className="text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                To become the leading AI-powered early warning system for
                tropical cyclones in South Asia, reducing disaster impact
                through intelligent forecasting.
              </p>
              <p className="text-gray-400 leading-relaxed">
                We envision a future where advanced technology and data science
                work together to give coastal communities the time they need to
                prepare and protect themselves from cyclonic storms.
              </p>
            </div>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            <div className="p-6 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-white/10 text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">7</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                Historical Events
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-white/10 text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">423</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                Satellite Frames
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-white/10 text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">72h</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                Prediction Window
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/70 backdrop-blur-sm border border-white/10 text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">AI</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                Deep Learning
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="p-10 rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-800/60 backdrop-blur-md border border-cyan-500/20">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              Technology Stack
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-4 border border-cyan-400/30">
                  <Satellite size={24} className="text-cyan-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Data Sources
                </h4>
                <p className="text-sm text-gray-400">
                  INSAT-3D, NOAA, Multi-spectral satellite imagery
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
                  <Award size={24} className="text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  AI Models
                </h4>
                <p className="text-sm text-gray-400">
                  CNN, Temporal prediction, Pattern recognition
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-4 border border-purple-400/30">
                  <Users size={24} className="text-purple-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  Impact
                </h4>
                <p className="text-sm text-gray-400">
                  Early warnings, Disaster preparedness, Lives saved
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid Section */}
        <div
          id="features"
          ref={featuresRef}
          className="px-6 lg:px-12 pb-32 max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isVisible = visibleFeatures[index];

              return (
                <div
                  key={feature.id}
                  className={`feature-card group relative transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-20"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
                  }}
                >
                  <div
                    className="h-full p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/50 
                    backdrop-blur-md border border-cyan-500/20 hover:border-cyan-400/50
                    transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20"
                  >
                    {/* Icon */}
                    <div className="mb-6">
                      <div
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 
                        flex items-center justify-center border border-cyan-500/30
                        group-hover:scale-110 group-hover:border-cyan-400/50 transition-all duration-300"
                      >
                        <Icon size={32} className="text-cyan-400" />
                      </div>
                    </div>

                    {/* Number and Title */}
                    <div className="mb-3">
                      <h4 className="text-xl font-bold text-white mb-1">
                        <span className="text-cyan-400">{feature.number}</span>{" "}
                        {feature.title}
                      </h4>
                      <p className="text-sm text-cyan-300 font-medium italic">
                        {feature.subtitle}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Hover glow effect */}
                    <div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-blue-500/0 
                      group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300 -z-10"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center py-12 border-t border-white/10">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
            CycloNet | Smarter Forecasts. Safer Communities.
          </p>
          <p className="text-xs text-gray-600">
            Powered by Deep Learning • North Indian Ocean Region • Real-time
            Analysis
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes scrollDown {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(12px);
            opacity: 0;
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-fade-in-delay-1 {
          opacity: 0;
          animation: fadeIn 1s ease-out 0.2s forwards;
        }

        .animate-fade-in-delay-2 {
          opacity: 0;
          animation: fadeIn 1s ease-out 0.4s forwards;
        }

        .animate-fade-in-delay-3 {
          opacity: 0;
          animation: fadeIn 1s ease-out 0.6s forwards;
        }

        .animate-fade-in-delay-4 {
          opacity: 0;
          animation: fadeIn 1s ease-out 0.8s forwards;
        }

        .animate-fade-in-delay-5 {
          opacity: 0;
          animation: fadeIn 1s ease-out 1s forwards;
        }

        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }

        .animate-scroll-down {
          animation: scrollDown 2s ease-in-out infinite;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
