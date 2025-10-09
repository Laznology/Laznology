"use client";
import React from "react";

interface CornerDecorationsProps {
  className?: string;
  borderColor?: string;
}

export default function CornerDecorations({
  className = "",
  borderColor = "border-gray-800",
}: CornerDecorationsProps) {
  return (
    <>
      <div
        className={`corner absolute top-4 left-4 w-10 h-10 border-l-4 border-t-4 ${borderColor} opacity-70 ${className}`}
      ></div>
      <div
        className={`corner absolute top-4 right-4 w-10 h-10 border-r-4 border-t-4 ${borderColor} opacity-70  ${className}`}
      ></div>
      <div
        className={`corner absolute bottom-4 left-4 w-10 h-10 border-l-4 border-b-4 ${borderColor} opacity-70  ${className}`}
      ></div>
      <div
        className={`corner absolute bottom-4 right-4 w-10 h-10 border-r-4 border-b-4 ${borderColor} opacity-70 ${className}`}
      ></div>
    </>
  );
}
