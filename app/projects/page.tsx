"use client"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Guestbook() {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstSectionRef = useRef<HTMLDivElement>(null);
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const thirdSectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Set initial positions
    gsap.set(secondSectionRef.current, {
      y: "100%"
    });
    gsap.set(thirdSectionRef.current, {
      x: "-100%"
    });

    // Create ScrollTrigger timeline for coordinated animations
    let tl = gsap.timeline({
      scrollTrigger: {
        scroller: ".scrollable-content",
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        end: "+=200%",
        anticipatePin: 1,
        markers: false
      }
    });

    // First transition: Section 2 slides up
    tl.to(secondSectionRef.current, {
      y: "0%",
      duration: 1,
      ease: "none"
    })
    // Second transition: Section 3 slides in from left
    .to(thirdSectionRef.current, {
      x: "0%",
      duration: 1,
      ease: "none"
    }, "+=0.5");

  }, []);

  return (
    <div className="h-[300vh]"> {/* Scroll space */}
      <div 
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* First Section - Base layer */}
        <div 
          ref={firstSectionRef} 
          className="absolute inset-0 w-full h-[85vh] flex items-center justify-center bg-black text-white"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">First Section</h2>
            <p className="text-xl">This is the first section of the guestbook.</p>
          </div>
        </div>

        {/* Second Section - Slides up from bottom */}
        <div 
          ref={secondSectionRef} 
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-cyan-500 text-white"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Second Section</h2>
            <p className="text-xl">This is the second section of the guestbook.</p>
          </div>
        </div>

        {/* Third Section - Slides in from left */}
        <div 
          ref={thirdSectionRef} 
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-emerald-500 text-white"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Third Section</h2>
            <p className="text-xl">This is the third section of the guestbook.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
