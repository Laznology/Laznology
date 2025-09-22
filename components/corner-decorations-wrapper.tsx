"use client";

import dynamic from "next/dynamic";
const CornerDecorations = dynamic(
  () => import("@/components/corner-decorations"),
  { ssr: false },
);

export default function CornerDecorationsWrapper() {
  return (
    <div className="corner-decorations-container absolute inset-0 z-10 pointer-events-none">
      <CornerDecorations />
    </div>
  );
}
