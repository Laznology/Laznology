"use client";

import React from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

import { Card } from "@/components/ui/card";
import { Guestbook } from "@/types/guestbook";

interface GuestbookCardProps {
  entry: Guestbook;
  index?: number;
}

export default function GuestbookCard({ entry }: GuestbookCardProps) {
  const createdAt = entry.created_at ? new Date(entry.created_at) : null;
  const timeAgo = createdAt
    ? formatDistanceToNow(createdAt, { addSuffix: true })
    : null;

  return (
    <Card
      tabIndex={0}
      className="guestbook-item relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border-none bg-background px-5 pt-5 pb-6 shadow-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/40"
    >
      <div className="flex items-start gap-4">
        <Image
          src={entry.avatar_url}
          alt={entry.name}
          className="h-12 w-12 rounded-full object-cover"
          width={48}
          height={48}
        />

        <div className="flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <span className="font-antonio text-lg tracking-wide text-foreground">
              {entry.name}
            </span>
            {timeAgo && (
              <span className="font-jetbrains text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {timeAgo}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mx-1 mt-4 h-px bg-border" />

      <div className="px-1 pt-4">
        <p className="font-jetbrains text-sm leading-relaxed text-foreground">
          {entry.message}
        </p>
      </div>
    </Card>
  );
}
