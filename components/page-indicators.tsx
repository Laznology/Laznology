"use client"

import { usePathname } from "next/navigation"
import { useMemo, useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const pages: Record<string, string> = {
    "/": "Homu",
    "/about": "Purofiiru",
    "/projects": "Purojekuto",
    "/works": "Waakusu",
    "/guestbook": "Gesutobukku",
    // "/blog": "Burogu"
}

const pageNumbers: Record<string, string> = {
  "/": "001",  
  "/about": "002",
  "/projects": "003",
  "/works": "004", 
  "/guestbook": "005", 
  "/blog": "006"
}

export default function PageIndicators() {
  const pathname = usePathname()
  
  const locationContainer = useRef<HTMLDivElement>(null)
  const locationText = useRef<HTMLDivElement>(null)

  const pathContainer = useRef<HTMLDivElement>(null)
  const pathText = useRef<HTMLDivElement>(null)
  

  const pageName = useMemo(() => {
    return pages[pathname] || pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2)
  }, [pathname])

  const pageNumber = useMemo(() => {
    return pageNumbers[pathname] || "000"
  }, [pathname])
    useGSAP(() => {
    if (locationText.current) {
      gsap.set(locationText.current, {
        opacity: 0,
        scale: 0.8,
      })
      
      gsap.to(locationText.current, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
      })
    }
    if (pathText.current) {
      gsap.set(pathText.current, {
        opacity: 0,
        x: -20
      })
      
      gsap.to(pathText.current, {
        opacity: 0.7,
        x: 0,
        duration: 1.2,
        ease: "power2.out",
      })
    }

    ScrollTrigger.create({
      scroller: ".scrollable-content",
      onUpdate: (self) => {
        if (self.progress > 0.7) {
          gsap.to(".page-indicator-text", { 
            color: "white",
            duration: 0.3
          });
        } else {
          gsap.to(".page-indicator-text", { 
            color: "#1f2937", 
            duration: 0.3
          });
        }
      }
    });
  }, { dependencies: [pathname] })
  
  return (
    <>
      <div 
        ref={locationContainer}
        className="absolute right-5 top-5 z-20"
      >
        <div 
          ref={locationText}
          className="transform writing-vertical-rl"
        >          <p className="font-jetbrains-mono text-2xl text-center py-1 font-bold text-gray-700 opacity-70 tracking-[0.3em] page-indicator-text">
            {Array.from(pageName).map((char, index) => (
                <span
                 key={index}
                 className="block">
                    {char}
                </span>
                ))}
          </p>
        </div>
      </div>

      <div 
        ref={pathContainer}
        className="absolute left-7 bottom-5 z-10"
      >        
      <div 
          ref={pathText}
        >            
        <p className="font-antonio text-center py-2 text-2xl md:text-2xl lg:text-4xl text-gray-800 tracking-[0.2em] font-bold page-indicator-text">
            {Array.from(pageNumber).map((number, index) => (
                <span 
                  key={index} 
                  className="block" 
                >
                  {number}
                </span>
            ))}
          </p>
        </div>
      </div>
    </>
  )
}