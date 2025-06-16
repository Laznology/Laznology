"use client";
import gsap from "gsap"
import {useGSAP} from "@gsap/react"
import { useState, useRef, useEffect} from "react";
import { ScrollTrigger } from "gsap/all";
import { fetchGuestbooks } from "@/lib/api/guestbook";
import { toast } from "sonner";
import type { Guestbook } from "@/types/guestbook";
import { Icon } from "@iconify/react";
gsap.registerPlugin(ScrollTrigger)

export default function GuestbookPage(){  
  const [guestbooks, setGuestbooks] = useState<Guestbook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const guestbookWrapperRef = useRef<HTMLDivElement>(null);
  const guestbookListRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const loadGuestbooks = async () => {
      setLoading(true);
      try {
        const res = await fetchGuestbooks();
        setGuestbooks(res);
        console.log("Guestbooks loaded:", res);
      } catch (err) {
        console.error("Failed to fetch guestbooks:", err);
        setError("Failed to load guestbooks.");
        if (error) toast.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadGuestbooks();
  }, [error])

  useGSAP(() => {

    gsap.set([".greetings", ".desc"], { 
      opacity: 0, 
      y: 20 
    });

    gsap.set(guestbookListRef.current, {
      visibility: "hidden",
      opacity: 0,
    })

    gsap.set(guestbookWrapperRef.current, {
      y: "100%",
    });
  })

  useGSAP(() => {
    const textTimeline = gsap.timeline();
    gsap.to(guestbookWrapperRef.current, {
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        scroller: ".scrollable-content",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
        if(self.progress === 1) {
          textTimeline.to(".greetings", {
            delay: 0.1,
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          })

          textTimeline.to(".desc", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          }, "-=0.5")

        } else if(self.progress < 0.9) {
          gsap.to([".greetings", ".desc"], {
            opacity: 0,
            y: 20,
            duration: 0.2,
            ease: "power2.in",
            stagger: 0.1 
          })
        }
      }}
    })
  })

return (
  
  <div ref={containerRef} className="flex h-full w-full overflow-hidden relative justify-center">
    <div ref={mainRef} className="flex flex-col items-center justify-center">
      <h1 className="text-8xl font-semibold font-antonio">Guestbook</h1>
      <div className="scroll-hint mt-8 flex flex-col items-center">
        <p className="text-base font-jetbrains-mono md:text-lg text-black mb-3">Scroll Down</p>
        <Icon icon="line-md:chevron-double-down" className="animate-bounce text-3xl md:text-4xl text-black" />
      </div>
    </div>    
    <div ref={guestbookWrapperRef} className="absolute inset-0 bg-black flex mx-auto w-full h-full z-[5]">
      <div className="flex flex-col items-center h-full w-full overflow-y-auto scrollbar-hide justify-center">
        <div className="text-center">
          <h2 className="greetings text-6xl font-antonio text-white mb-4">Welcome to Our Guestbook</h2>
          <p className="desc text-gray-300 text-lg max-w-2xl mx-auto">
           Still Dev, my brain empty for this 
          </p>
        </div>
      </div>
    </div>
  </div>
)
}