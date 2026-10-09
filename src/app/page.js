"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./globals.css";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "98%", label: "DESIGN EXCELLENCE" },
  { value: "85%", label: "DRIVING INNOVATION" },
  { value: "95%", label: "CUSTOMER EXPERIENCE" },
];

export default function Home() {
  const sectionRef = useRef(null);
  const carRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      intro
        .from(".eyebrow", {
          opacity: 0,
          y: 15,
          duration: 0.7,
        })
        .from(".hero-title", {
          opacity: 0,
          y: 35,
          duration: 1,
        }, "-=0.35")
        .from(".stat-card", {
          opacity: 0,
          y: 22,
          stagger: 0.18,
          duration: 0.7,
        }, "-=0.3")
        .from(".car-image", {
          opacity: 0,
          scale: 0.88,
          duration: 1,
        }, "-=0.6");

      gsap.to(carRef.current, {
        x: () => window.innerWidth * 0.12,
        y: -35,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main>
      <section ref={sectionRef} className="scroll-section">
        <div className="hero-stage">
          <header className="hero-header">
            <a href="#" className="brand">FIZZ<span>.</span></a>
            <span className="menu-label">AUTOMOTIVE / 2026</span>
          </header>

          <div className="hero-content">
            <p className="eyebrow">DESIGNED TO MOVE YOU</p>
            <h1 className="hero-title">
              WELCOME<br /><span>ITZ FIZZ</span>
            </h1>

            <div className="stats-grid">
              {stats.map((stat) => (
                <div className="stat-card" key={stat.label}>
                  <h2>{stat.value}</h2>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="car-image" ref={carRef}>
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=85"
              alt="Sports car"
            />
          </div>

          <div className="hero-footer">
            <span>ENGINEERED FOR THE EXTRAORDINARY</span>
            <span>SCROLL TO EXPLORE ↓</span>
          </div>
        </div>
      </section>

      <section className="next-section">
        <p>BEYOND THE ORDINARY</p>
        <h2>Every curve tells a story.</h2>
        <p className="next-description">
          Precision in design. Passion in every detail.
          This is the Fizz driving experience.
        </p>
      </section>
    </main>
  );
}