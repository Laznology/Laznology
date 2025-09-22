import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import "./InfiniteScroll.css";

gsap.registerPlugin(Observer);

interface InfiniteScrollItem {
  content: React.ReactNode;
}

interface InfiniteScrollProps {
  // ----- Layout / Style Props -----
  width?: string; // Width of the outer wrapper
  maxHeight?: string; // Max-height of the outer wrapper
  negativeMargin?: string; // Negative margin to reduce spacing between items
  // ----- Items Prop -----
  items?: InfiniteScrollItem[]; // Array of items with { content: ... }
  itemMinHeight?: number; // Fixed height for each item
  itemMinWidth?: number; // Fixed width for each item (horizontal)
  // ----- Direction Props -----
  direction?: "vertical" | "horizontal"; // Scroll direction
  // ----- Tilt Props -----
  isTilted?: boolean; // Whether the container is in "skewed" perspective
  tiltDirection?: "left" | "right"; // tiltDirection: "left" or "right"
  // ----- Autoplay Props -----
  autoplay?: boolean; // Whether it should automatically scroll
  autoplaySpeed?: number; // Speed (pixels/frame approx.)
  autoplayDirection?: "down" | "up" | "left" | "right"; // Direction for autoplay
  pauseOnHover?: boolean; // Pause autoplay on hover
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  width = "30rem",
  maxHeight = "100%",
  negativeMargin = "-0.5em",
  items = [],
  itemMinHeight = 150,
  itemMinWidth = 150,
  direction = "vertical",
  isTilted = false,
  tiltDirection = "left",
  autoplay = false,
  autoplaySpeed = 0.5,
  autoplayDirection = "down",
  pauseOnHover = false,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getTiltTransform = (): string => {
    if (!isTilted) return "none";
    return tiltDirection === "left"
      ? "rotateX(20deg) rotateZ(-20deg) skewX(20deg)"
      : "rotateX(20deg) rotateZ(20deg) skewX(-20deg)";
  };
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (items.length === 0) return;

    // Get all child elements of container as HTMLDivElement[]
    const divItems = gsap.utils.toArray<HTMLDivElement>(container.children);
    if (!divItems.length) return;

    const firstItem = divItems[0];
    const itemStyle = getComputedStyle(firstItem);

    // Determine dimensions based on direction
    const isHorizontal = direction === "horizontal";
    let itemDimension: number;
    let itemMargin: number;

    if (isHorizontal) {
      itemDimension = firstItem.offsetWidth;
      itemMargin = parseFloat(itemStyle.marginLeft) || 0;
    } else {
      itemDimension = firstItem.offsetHeight;
      itemMargin = parseFloat(itemStyle.marginTop) || 0;
    }

    const totalItemDimension = itemDimension + itemMargin;
    const totalDimension =
      itemDimension * items.length + itemMargin * (items.length - 1);

    const wrapFn = gsap.utils.wrap(-totalDimension, totalDimension);

    // Set initial positions
    divItems.forEach((child, i) => {
      const position = i * totalItemDimension;
      if (isHorizontal) {
        gsap.set(child, { x: position });
      } else {
        gsap.set(child, { y: position });
      }
    });

    const observer = Observer.create({
      target: container,
      type: "wheel,touch,pointer",
      preventDefault: true,
      onPress: ({ target }) => {
        (target as HTMLElement).style.cursor = "grabbing";
      },
      onRelease: ({ target }) => {
        (target as HTMLElement).style.cursor = "grab";
      },
      onChange: ({ deltaY, deltaX, isDragging, event }) => {
        // Determine delta based on direction
        let delta;
        if (isHorizontal) {
          delta =
            event.type === "wheel" ? -(deltaX || deltaY) : deltaX || deltaY;
        } else {
          delta = event.type === "wheel" ? -deltaY : deltaY;
        }

        const distance = isDragging ? delta * 5 : delta * 10;
        const property = isHorizontal ? "x" : "y";

        divItems.forEach((child) => {
          gsap.to(child, {
            duration: 0.5,
            ease: "expo.out",
            [property]: `+=${distance}`,
            modifiers: {
              [property]: gsap.utils.unitize(wrapFn),
            },
          });
        });
      },
    });

    let rafId: number;
    if (autoplay) {
      // Determine direction factor based on autoplayDirection
      let directionFactor;
      if (isHorizontal) {
        directionFactor = autoplayDirection === "right" ? 1 : -1;
      } else {
        directionFactor = autoplayDirection === "down" ? 1 : -1;
      }

      const speedPerFrame = autoplaySpeed * directionFactor;
      const property = isHorizontal ? "x" : "y";

      const tick = () => {
        divItems.forEach((child) => {
          gsap.set(child, {
            [property]: `+=${speedPerFrame}`,
            modifiers: {
              [property]: gsap.utils.unitize(wrapFn),
            },
          });
        });
        rafId = requestAnimationFrame(tick);
      };

      rafId = requestAnimationFrame(tick);

      if (pauseOnHover) {
        const stopTicker = () => {
          if (rafId) cancelAnimationFrame(rafId);
        };
        const startTicker = () => {
          rafId = requestAnimationFrame(tick);
        };

        container.addEventListener("mouseenter", stopTicker);
        container.addEventListener("mouseleave", startTicker);

        return () => {
          observer.kill();
          stopTicker();
          container.removeEventListener("mouseenter", stopTicker);
          container.removeEventListener("mouseleave", startTicker);
        };
      } else {
        return () => {
          observer.kill();
          if (rafId) cancelAnimationFrame(rafId);
        };
      }
    }

    return () => {
      observer.kill();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [
    items,
    autoplay,
    autoplaySpeed,
    autoplayDirection,
    pauseOnHover,
    isTilted,
    tiltDirection,
    negativeMargin,
    direction,
  ]);
  return (
    <>
      <style>
        {" "}
        {`
          .infinite-scroll-wrapper {
            max-height: ${maxHeight};
            width: ${direction === "horizontal" ? "100%" : width};
            height: ${direction === "horizontal" ? "100%" : "auto"};
            ${direction === "horizontal" ? `overflow-x: hidden;` : `overflow-y: hidden;`}
          }

          .infinite-scroll-container {
            ${
              direction === "horizontal"
                ? `display: flex; flex-direction: row; height: 100%; width: max-content; align-items: center;`
                : `width: ${width};`
            }
            cursor: grab;
          }

          .infinite-scroll-item {
            ${
              direction === "horizontal"
                ? `width: ${itemMinWidth}px; margin-right: ${negativeMargin}; flex-shrink: 0; height: auto; max-height: 100%;`
                : `height: ${itemMinHeight}px; margin-top: ${negativeMargin}; width: 100%;`
            }
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>

      <div className="infinite-scroll-wrapper" ref={wrapperRef}>
        <div
          className="infinite-scroll-container"
          ref={containerRef}
          style={{
            transform: getTiltTransform(),
          }}
        >
          {items.map((item, i) => (
            <div className="infinite-scroll-item" key={i}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InfiniteScroll;
