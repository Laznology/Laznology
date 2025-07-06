"use client"
import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"

interface GuestbookHeaderProps {
    loading: boolean;
}

export default function GuestbookHeader({ loading }: GuestbookHeaderProps) {
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        if (!loading) {
            gsap.fromTo(titleRef.current, 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
            )

            gsap.fromTo(subtitleRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power2.out" }
            )
        }
    }, [loading])

    return (
        <div className="text-center mb-6 sm:mb-8 flex-shrink-0 px-4">
            <h1 
                ref={titleRef}
                className="text-4xl sm:text-5xl md:text-7xl font-antonio font-bold text-foreground mb-3 sm:mb-4 tracking-tight"
            >
                Guestbook
            </h1>
            <p 
                ref={subtitleRef}
                className="text-sm sm:text-base md:text-lg text-muted-foreground font-jetbrains-mono px-4"
            >
                Leave your mark, share your thoughts
            </p>
        </div>
    )
}
