"use client"
import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Guestbook } from "@/types/guestbook"
import GuestbookCard from "./guestbook-card"
import GuestbookSkeleton from "./guestbook-skeleton"

gsap.registerPlugin(ScrollTrigger)

interface GuestbookListProps {
    guestbooks: Guestbook[];
    loading: boolean;
}

export default function GuestbookList({ guestbooks, loading }: GuestbookListProps) {
    const listRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const cyanBoxRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!loading && containerRef.current) {
            // Animate guestbook cards with stagger
            const cards = containerRef.current.querySelectorAll('.guestbook-item')
            gsap.fromTo(cards, 
                { opacity: 0, y: 50, scale: 0.95 },
                { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    duration: 0.8, 
                    stagger: 0.1, 
                    delay: 0.5,
                    ease: "power2.out" 
                }
            )

        }
    }, [loading])

    return (
        <div 
            ref={listRef} 
            className="flex-1 overflow-y-auto px-2 sm:px-4 md:px-8 scrollable-content"
        >

            <div ref={containerRef} className="max-w-4xl mx-auto space-y-4 sm:space-y-6 pb-8">
                {loading ? (
                    <GuestbookSkeleton />
                ) : (
                    <>
                        {guestbooks.map((entry, index) => (
                            <GuestbookCard 
                                key={entry.id || index}
                                entry={entry}
                                index={index}
                            />
                        ))}
                    </>
                )}
            </div>

            {!loading && guestbooks.length === 0 && (
                <div className="text-center py-12 px-4">
                    <p className="text-muted-foreground text-sm font-jetbrains-mono">
                        No entries yet. Be the first!
                    </p>
                </div>
            )}
        </div>
    )
}
