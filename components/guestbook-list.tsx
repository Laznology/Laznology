"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Guestbook } from "@/types/guestbook";
import GuestbookCard from "./guestbook-card";
import GuestbookSkeleton from "./guestbook-skeleton";

gsap.registerPlugin(ScrollTrigger);

interface GuestbookListProps {
  guestbooks: Guestbook[];
  loading: boolean;
}

export default function GuestbookList({
  guestbooks,
  loading,
}: GuestbookListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && containerRef.current) {
      const cards = containerRef.current.querySelectorAll(".guestbook-item");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.4,
          ease: "power2.out",
        },
      );
    }
  }, [loading]);

  return (
    <div
      ref={listRef}
      className="flex-1 w-full overflow-y-auto px-1 sm:px-2 scrollable-content"
    >
      <div
        ref={containerRef}
        className="mx-auto w-full space-y-4 sm:space-y-5 pb-10"
      >
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
        <div className="px-4 py-12 text-center">
          <p className="font-jetbrains-mono text-sm text-muted-foreground">
            No entries yet. Be the first!
          </p>
        </div>
      )}
    </div>
  );
}
