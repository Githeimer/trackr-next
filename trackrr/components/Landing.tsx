"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Calendar, CheckCircle, LineChart, Brain, List, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const { scrollY } = useScroll();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const contributionRef = useRef<HTMLDivElement>(null);

  const yBg = useTransform(scrollY, [0, 500], [0, -100]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  useEffect(() => {
    const gradientElement = document.getElementById("animated-gradient");
    if (gradientElement) {
      let degree = 0;
      const interval = setInterval(() => {
        degree = (degree + 1) % 360;
        gradientElement.style.background = `linear-gradient(${degree}deg, rgba(22, 174, 80, 0.2), rgba(22, 174, 80, 0), rgba(22, 174, 80, 0.1))`;
      }, 50);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    if (!contributionRef.current) return;
    
    const graphContainer = contributionRef.current;
    graphContainer.innerHTML = '';
    
    for (let week = 0; week < 12; week++) {
      const weekEl = document.createElement('div');
      weekEl.className = 'flex flex-col gap-1';
      
      for (let day = 0; day < 7; day++) {
        const dayEl = document.createElement('div');
        const intensity = Math.random(); // Random activity level
        
        let bgColor = 'bg-gray-800'; // Default - no activity
        
        if (intensity > 0.85) {
          bgColor = 'bg-[#16ae50]'; // High activity
        } else if (intensity > 0.6) {
          bgColor = 'bg-[#0e8e40]'; // Medium activity
        } else if (intensity > 0.35) {
          bgColor = 'bg-[#096b30]'; // Low activity
        }
        
        dayEl.className = `${bgColor} w-3 h-3 rounded-sm transition-all duration-300 hover:scale-125 hover:opacity-90`;
        weekEl.appendChild(dayEl);
      }
      
      graphContainer.appendChild(weekEl);
    }
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
    
    <div className="min-h-screen overflow-x-hidden bg-[#060606] text-[#ffffff]">
       
      <div id="animated-gradient" className="fixed inset-0 z-0"></div>
      <Navbar></Navbar>
    
      
      {/* Hero Section */}
      <motion.div 
        className="relative z-10 pt-24 pb-16 md:pt-32 md:pb-24 px-4"
        style={{ y: yBg, scale, opacity }}
        ref={parallaxRef}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-bold">
                Build <span className="text-[#16ae50]">habits</span> that 
                <br />transform your life
              </h1>
              <p className="text-[#707070] text-lg md:text-xl max-w-lg">
                Track your daily progress, analyze patterns, and achieve your goals with our AI-powered habit tracking system.
              </p>
              <div className="flex flex-wrap gap-4" >
              <Link href={"/auth"} >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r cursor-pointer from-[#16ae50] to-[#0e8e40] text-white py-3 px-8 rounded-lg font-medium flex items-center gap-2"
                >
                
                 Get Started
                 
                <ArrowRight size={18} />
                </motion.button>
                </Link>
                <Link href={"https://github.com/githeimer/trackr-next"} target="_blank" >
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border cursor-pointer border-[#16ae50] text-[#16ae50] py-3 px-8 rounded-lg font-medium hover:bg-[#16ae50]/10 transition-colors "
                  >
                 
                   Github Code
                  </motion.button>
                  </Link>
              
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#16ae50]/30 to-[#707070]/30 animate-pulse blur-md"></div>
              <div className="relative z-10 bg-[#0e0e0e] p-4 rounded-xl border border-[#16ae50]/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#16ae50]">Your Productivity</h3>
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#16ae50]"></div>
                    <div className="h-3 w-3 rounded-full bg-[#707070]"></div>
                  </div>
                </div>
                
                <div className="bg-[#060606]/70 p-4 rounded-lg mb-4">
                  <h4 className="text-sm text-[#707070] mb-2">Habit consistency</h4>
                  <div className="flex gap-1 mb-2">
                    {[0.8, 0.4, 0.9, 0.7, 0.5, 0.95, 0.85].map((value, i) => (
                      <div key={i} className="w-full h-24 relative">
                        <div 
                          className="absolute bottom-0 w-full bg-gradient-to-t from-[#16ae50] to-[#16ae50]/50 rounded-sm"
                          style={{ height: `${value * 100}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-[#707070]">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#060606]/70 p-3 rounded-lg">
                    <h4 className="text-sm text-[#707070] mb-1">Daily streak</h4>
                    <p className="text-xl font-bold">12 days</p>
                  </div>
                  <div className="bg-[#060606]/70 p-3 rounded-lg">
                    <h4 className="text-sm text-[#707070] mb-1">Completion rate</h4>
                    <p className="text-xl font-bold">87%</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Track smarter, not harder</h2>
            <p className="text-[#707070] text-lg max-w-2xl mx-auto">
              Our innovative tools help you build sustainable habits through data-driven insights and AI analysis.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Calendar className="text-[#16ae50]" size={32} />}
              title="Contribution Tracking"
              description="Visual GitHub-style contribution graphs to see your progress at a glance."
              delay={0.1}
            />
            <FeatureCard 
              icon={<List className="text-[#16ae50]" size={32} />}
              title="Smart To-Do Lists"
              description="Category-based to-do lists that adapt to your habits and priorities."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Brain className="text-[#16ae50]" size={32} />}
              title="AI-Powered Insights"
              description="Natural language processing to analyze your behavior patterns and efficiency."
              delay={0.3}
              comingSoon={true}
            />
            <FeatureCard 
              icon={<CheckCircle className="text-[#16ae50]" size={32} />}
              title="Habit Formation"
              description="Science-backed methods to help you build lasting habits that stick."
              delay={0.4}
              comingSoon={true}
            />
            <FeatureCard 
              icon={<LineChart className="text-[#16ae50]" size={32} />}
              title="Progress Analytics"
              description="Detailed analytics to understand what drives your productivity."
              delay={0.5}
              comingSoon={true}
            />
            <FeatureCard 
              icon={<Calendar className="text-[#16ae50]" size={32} />}
              title="Daily Journaling"
              description="Track your thoughts and moods to correlate with your productivity."
              delay={0.6}
              comingSoon={true}
            />
          </div>
        </div>
      </section>
      
      {/* Contribution Graph Section */}
      <section className="py-16 relative z-10 bg-[#0e0e0e]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Visualize Your Progress</h2>
            <p className="text-[#707070] text-lg max-w-2xl mx-auto">
              See your consistency grow over time with our GitHub-inspired contribution graph.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-[#060606] p-6 rounded-xl border border-[#707070]/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#16ae50]">Activity Summary</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="block w-3 h-3 rounded-sm bg-gray-800"></span>
                  <span className="text-xs text-[#707070]">No activity</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="block w-3 h-3 rounded-sm bg-[#096b30]"></span>
                  <span className="text-xs text-[#707070]">Low</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="block w-3 h-3 rounded-sm bg-[#0e8e40]"></span>
                  <span className="text-xs text-[#707070]">Medium</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="block w-3 h-3 rounded-sm bg-[#16ae50]"></span>
                  <span className="text-xs text-[#707070]">High</span>
                </div>
              </div>
            </div>
            
            <div ref={contributionRef} className="flex gap-1 overflow-x-auto pb-4"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-[#0e0e0e] p-3 rounded-lg border border-[#707070]/10">
                <h4 className="text-sm text-[#707070] mb-1">Total Days</h4>
                <p className="text-xl font-bold">84</p>
              </div>
              <div className="bg-[#0e0e0e] p-3 rounded-lg border border-[#707070]/10">
                <h4 className="text-sm text-[#707070] mb-1">Current Streak</h4>
                <p className="text-xl font-bold">12 days</p>
              </div>
              <div className="bg-[#0e0e0e] p-3 rounded-lg border border-[#707070]/10">
                <h4 className="text-sm text-[#707070] mb-1">Best Day</h4>
                <p className="text-xl font-bold">Monday</p>
              </div>
              <div className="bg-[#0e0e0e] p-3 rounded-lg border border-[#707070]/10">
                <h4 className="text-sm text-[#707070] mb-1">Completion Rate</h4>
                <p className="text-xl font-bold">87%</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* NLP and Future Section */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-block py-1 px-3 bg-[#16ae50]/10 rounded-full text-[#16ae50] text-sm font-medium mb-2">
                Coming Soon
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">AI-Powered Journal Analysis</h2>
              <p className="text-[#707070] text-lg">
                Our next-generation feature uses natural language processing to analyze your journal entries, identifying patterns in behavior that affect your productivity and well-being.
              </p>
              <ul className="space-y-3">
                {[
                  "Identify correlations between activities and mood",
                  "Get personalized insights on what helps you be more productive",
                  "Receive suggestions based on your unique patterns",
                  "Track progress through intelligent metrics"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="text-[#16ae50] mt-1 flex-shrink-0" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
             
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#16ae50]/20 to-transparent animate-pulse blur-lg"></div>
              <div className="relative z-10 bg-[#0e0e0e] p-6 rounded-xl border border-[#707070]/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-full bg-[#16ae50]/20 flex items-center justify-center">
                    <Brain className="text-[#16ae50]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium">AI Analysis</h3>
                    <p className="text-sm text-[#707070]">Journal entry from yesterday</p>
                  </div>
                </div>
                
                <div className="bg-[#060606] p-4 rounded-lg mb-4 text-sm">
                  <p className="text-[#707070] mb-3">Transcribed journal:</p>
                  <p>Today I woke up early and meditated for 15 minutes before starting work. Had a productive morning session, completed 3 major tasks before lunch. After eating, I felt tired and struggled to focus for about an hour. Evening workout helped regain energy and I was able to finish the day strong.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-[#060606] p-4 rounded-lg">
                    <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full bg-[#16ae50]"></div>
                      Insight
                    </h4>
                    <p className="text-sm text-[#707070]">Morning meditation correlated with 27% higher productivity in the first work block.</p>
                  </div>
                  
                  <div className="bg-[#060606] p-4 rounded-lg">
                    <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full bg-[#16ae50]"></div>
                      Suggestion
                    </h4>
                    <p className="text-sm text-[#707070]">Consider a short afternoon walk to counter post-lunch energy dip.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
    {/* last section */}
      <section className="py-16 relative z-10 ">
        <div className="max-w-4xl mx-auto px-4 ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className=" bg-gradient-to-r from-[#0e0e0e0e] to-[#12121200] bg-white/5 p-8 md:p-12 rounded-2xl border border-[#707070]/20 text-center backdrop-blur-2xl "
          >
            <div className="flex justify-center mb-6 ">
              <div className="h-16 w-16 rounded-full bg-[#16ae50]/10 flex items-center justify-center">
                <Calendar className="text-[#16ae50]" size={32} />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to build better habits?</h2>
            <p className="text-[#707070] text-lg max-w-2xl mx-auto mb-8">
              Join thousands of users who are taking control of their daily routines and improving their productivity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
            <Link href={"/auth"} >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r cursor-pointer from-[#16ae50] to-[#0e8e40] text-white py-3 px-8 rounded-lg font-medium flex items-center gap-2"
                >
                
                 Get Started
                 
                <ArrowRight size={18} />
                </motion.button>
                </Link>
                <Link href={"https://github.com/githeimer/trackr-next"} target="_blank" >
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border cursor-pointer border-[#16ae50] text-[#16ae50] py-3 px-8 rounded-lg font-medium hover:bg-[#16ae50]/10 transition-colors "
                  >
                 
                   Github Code
                  </motion.button>
                  </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-[#0e0e0e] relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-[#707070]/20 pb-8 mb-8">
            <div className="flex flex-row gap-3 items-center mb-4 md:mb-0">
              <img src="./TR.jpg" className="h-10 rounded-lg" alt="" />
              <h1 className="text-white text-3xl font-bold">
                Trackrr<span className="text-[var(--text-color)]">.</span>
              </h1>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-[#707070] hover:text-[#16ae50] transition-colors">
                Features
              </Link>
              <Link href="#" className="text-[#707070] hover:text-[#16ae50] transition-colors">
                Pricing
              </Link>
              <Link href="#" className="text-[#707070] hover:text-[#16ae50] transition-colors">
                Blog
              </Link>
              <Link href="#" className="text-[#707070] hover:text-[#16ae50] transition-colors">
                Support
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#707070] text-sm mb-4 md:mb-0">
              © 2025 Trackrr. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-[#707070] hover:text-[#16ae50] transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="text-[#707070] hover:text-[#16ae50] transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}

const FeatureCard = ({ icon, title, description, comingSoon = false, delay = 0 }:any) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="bg-[#0e0e0e]/10 p-6 rounded-xl border border-[#707070]/20 hover:border-[#16ae50]/30 transition-all relative backdrop-blur-sm z-50"
      >
        {comingSoon && (
          <div className="absolute top-4 right-4">
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#16ae50]/20 text-[#16ae50] border border-[#16ae50]/30">
              Coming Soon
            </span>
          </div>
        )}
        <div className="h-12 w-12 rounded-lg bg-[#16ae50]/10 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-[#707070]">{description}</p>
      </motion.div>
    );
  };