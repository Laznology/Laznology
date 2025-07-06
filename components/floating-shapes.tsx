"use client"
import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"

export default function FloatingShapes() {
    const shapesRef = useRef<(HTMLDivElement | null)[]>([])
    const cyanBoxRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Floating shapes animation
        shapesRef.current.forEach((shape, index) => {
            if (shape) {
                gsap.to(shape, {
                    y: "random(-50, 50)",
                    x: "random(-40, 40)",
                    rotation: "random(-45, 45)",
                    scale: "random(0.8, 1.3)",
                    duration: "random(1.5, 3)",
                    repeat: -1,
                    yoyo: true,
                    ease: "power2.inOut",
                    delay: index * 0.15
                })
            }
        })
    }, [])

    return (
        <div className="absolute inset-0 pointer-events-none z-10">
            <div
                ref={el => { if (el) shapesRef.current[0] = el; }}
                className="absolute top-20 left-10 w-12 h-12 border-2 border-foreground bg-background"
            />
            <div
                ref={el => { if (el) shapesRef.current[1] = el; }}
                className="absolute top-40 right-20 w-8 h-8 border-2 border-foreground bg-foreground"
            />
            <div 
                ref={el => { if (el) shapesRef.current[2] = el; }}
                className="absolute top-60 left-1/4 w-6 h-6 border-2 border-foreground bg-background rotate-45"
            />
            <div 
                ref={el => { if (el) shapesRef.current[3] = el; }}
                className="absolute bottom-40 right-10 w-10 h-10 border-2 border-foreground bg-background rounded-full"
            />
            <div 
                ref={el => { if (el) shapesRef.current[4] = el; }}
                className="absolute bottom-60 left-20 w-4 h-16 border-2 border-foreground bg-foreground"
            />
            <div 
                ref={el => { if (el) shapesRef.current[5] = el; }}
                className="absolute top-80 right-1/3 w-14 h-6 border-2 border-foreground bg-background"
            />
        </div>
    )
}
