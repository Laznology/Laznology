"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Icon } from "@iconify/react";
import { SplitText } from "gsap/all";
gsap.registerPlugin(SplitText);

const menuList = [
  { menu: "Home", href: "/", pageNumber: "(=^･ω･^=)" },
  { menu: "About", href: "/about", pageNumber: "(=^-ω-^=)" },
  { menu: "Guestbook", href: "/guestbook", pageNumber: "(ฅ^•ﻌ•^ฅ)" },
  { menu: "Projects", href: "/projects", pageNumber: "(=^‥^=)ﾉ" }
];

export default function Sidebar() {
  const backdrop = useRef<HTMLDivElement>(null);
  const sidebarPanel = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const kawaiiRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    document.addEventListener("escape", handleClose);
    return () => document.removeEventListener("escape", handleClose);
  }, []);

  useGSAP(() => {
    gsap.set(backdrop.current, {
      opacity: 0,
      visibility: "hidden",
    });

    gsap.set(sidebarPanel.current, {
      x: -2000,
    });
  });

  const handleOpen = () => {
    gsap.to(backdrop.current, {
      opacity: 1,
      visibility: "visible",
      duration: 1,
      ease: "power2.out",
    });

    gsap.to(sidebarPanel.current, {
      x: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  const handleClose = () => {
    gsap.to(backdrop.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        gsap.set(backdrop.current, { visibility: "hidden" });
      },
    });

    gsap.to(sidebarPanel.current, {
      x: -2000,
      duration: 1,
      ease: "power2.out",
    });
  };

  const onHover = (index: number) => {
    if (!kawaiiRef.current[index]) return;
    const split = SplitText.create(kawaiiRef.current[index], { type: "chars" });
    gsap.from(split.chars, {
      opacity: 0,
      ease: "back.out(1.7)",
      scale: 2,
      stagger: 0.05,
      delay: 0.3,
    });
  };

  return (
    <div className="flex items-center h-full">
      <button
        aria-label="Sidebar Button"
        onClick={handleOpen}
        className={
          "cursor-pointer z-[999] text-black flex items-center justify-center"
        }
      >
        <Icon
          icon="line-md:menu-fold-left"
          width="20"
          height="20"
          className="text-black"
        />
      </button>

      <div
        ref={backdrop}
        className="absolute inset-0 w-full h-full bg-white/10 backdrop-blur-sm z-30"
        style={{ opacity: 0, visibility: "hidden" }}
        onClick={handleClose}
      ></div>

      <div
        ref={sidebarPanel}
        className="absolute left-0 top-0 h-full w-[70vw] lg:w-[40vw] bg-black rounded-lg z-30 overflow-hidden"
        style={{ transform: "translateX(-2000px)" }}
      >
        <div className={"absolute -bottom-6 left-0 text-white/20"}>
          <span className={"text-9xl lg:text-9xl"}>LZ</span>
        </div>
        <div
          className={"hidden lg:block absolute bottom-0 right-0 text-white/20"}
        >
          <span className={"text-6xl"}>{"</>"}</span>
        </div>
        <div className={"relative py-6 px-4"}>
          <div className={" flex justify-between"}>
            <div className={"items-center"}>
              <span
                className={
                  "text-base text-center font-light text-white/60 font-jetbrains"
                }
              >
                Discover
              </span>
            </div>
            <button
              aria-label="Close Sidebar"
              onClick={handleClose}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="text-white items-center cursor-pointer "
            >
              <Icon
                icon={
                  "line-md:arrow-close-right"

                }
                height="32"
              />
            </button>
          </div>

          <div className="space-y-2">
            {menuList.map((item, index) => (
              <Link
                onMouseEnter={() => onHover(index)}
                key={index}
                href={item.href}
                className="relative flex text-white py-2 px-3 gap-2 group hover:text-black rounded w-fit"
              >
                <span className={"text-3xl lg:text-7xl font-jetbrains z-10"}>
                  {item.menu}
                </span>
                <div
                  className={
                    "absolute inset-0 w-0 left-0 h-full group-hover:w-full group-hover:bg-white transition-all duration-500 z-0"
                  }
                ></div>
                <span
                  ref={(el) => {
                    kawaiiRef.current[index] = el;
                  }}
                  className={
                    "hidden group-hover:block text-lg transform-all duration-300 z-10"
                  }
                >
                  {item.pageNumber}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
