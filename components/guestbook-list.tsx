"use client";
import React, { useRef } from "react";
import { Guestbook } from "@/types/guestbook";
import GuestbookCard from "./guestbook-card";
import GuestbookSkeleton from "./guestbook-skeleton";

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

  return (
    <div
      ref={listRef}
      className="flex-1 min-h-0 w-full overflow-y-auto px-1 sm:px-2 scrollable-content"
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
