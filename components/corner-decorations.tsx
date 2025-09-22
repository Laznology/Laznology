"use client";
import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface CornerDecorationsProps {
  className?: string;
  borderColor?: string;
}

export default function CornerDecorations({
  className = "",
  borderColor = "border-gray-800",
}: CornerDecorationsProps) {
  useGSAP(() => {
    ScrollTrigger.create({
      scroller: ".scrollable-content",
      onUpdate: (self) => {
        if (self.progress > 0.7) {
          gsap.to(".corner", {
            opacity: 0.7,
            borderColor: "white",
          });
        } else {
          gsap.to(".corner", {
            opacity: 0.7,
            borderColor: "#1f2937",
          });
        }
      },
    });
  });
  return (
    <>
      <div
        className={`corner absolute top-4 left-4 w-10 h-10 border-l-4 border-t-4 ${borderColor} opacity-70 z-10 ${className}`}
      ></div>
      <div
        className={`corner absolute top-4 right-4 w-10 h-10 border-r-4 border-t-4 ${borderColor} opacity-70 z-10 ${className}`}
      ></div>
      <div
        className={`corner absolute bottom-4 left-4 w-10 h-10 border-l-4 border-b-4 ${borderColor} opacity-70 z-10 ${className}`}
      ></div>
      <div
        className={`corner absolute bottom-4 right-4 w-10 h-10 border-r-4 border-b-4 ${borderColor} opacity-70 z-10 ${className}`}
      ></div>
    </>
  );
}
