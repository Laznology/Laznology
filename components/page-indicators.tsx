"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

const pages: Record<string, string> = {
  "/": "Homu",
  "/about": "Purofiiru",
  "/projects": "Purojekuto",
  "/works": "Waakusu",
  "/guestbook": "Gesutobukku",
  // "/blog": "Burogu"
};

const pageNumbers: Record<string, string> = {
  "/": "001",
  "/about": "002",
  "/projects": "003",
  "/works": "004",
  "/guestbook": "005",
  "/blog": "006",
};

export default function PageIndicators() {
  const pathname = usePathname();

  const pageName = useMemo(() => {
    return (
      pages[pathname] ||
      pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2)
    );
  }, [pathname]);

  const pageNumber = useMemo(() => {
    return pageNumbers[pathname] || "000";
  }, [pathname]);

  return (
    <>
      <div className="absolute right-5 top-5 z-20 hidden md:block">
        <div className="transform writing-vertical-rl">
          {" "}
          <p className="font-jetbrains-mono text-2xl text-center py-1 font-bold text-muted-foreground tracking-[0.3em] page-indicator-text">
            {Array.from(pageName).map((char, index) => (
              <span key={index} className="block">
                {char}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="absolute left-7 bottom-5 z-10">
        <div>
          <p className="font-antonio text-center py-2 text-2xl md:text-2xl lg:text-4xl text-muted-foreground tracking-[0.2em] font-bold page-indicator-text">
            {Array.from(pageNumber).map((number, index) => (
              <span key={index} className="block">
                {number}
              </span>
            ))}
          </p>
        </div>
      </div>
    </>
  );
}
