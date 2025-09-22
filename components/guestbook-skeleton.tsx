"use client";
import React from "react";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function GuestbookSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-5">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card
          key={`guestbook-skeleton-${index}`}
          className="guestbook-item relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border-none bg-background/80 px-5 pt-5 pb-6 shadow-none"
        >
          <div className="flex items-start gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />

            <div className="flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <Skeleton className="h-5 w-32 rounded-full" />
                <Skeleton className="h-3 w-20 rounded-full" />
              </div>
            </div>
          </div>

          <div className="mx-1 mt-4 h-px bg-border/60" />

          <div className="px-1 pt-4 space-y-2">
            <Skeleton className="h-4 w-full rounded-full" />
            <Skeleton className="h-4 w-4/5 rounded-full" />
            <Skeleton className="h-4 w-2/3 rounded-full" />
          </div>
        </Card>
      ))}
    </div>
  );
}
