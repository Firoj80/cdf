import React from "react";

export interface ImageAutoSliderProps {
  /** Items to auto-scroll. Rendered twice for a seamless loop. */
  items: React.ReactNode[];
  /** Seconds for one full loop (lower = faster). Default 20. */
  speed?: number;
  className?: string;
}

export const Component = ({
  items,
  speed = 20,
  className = "",
}: ImageAutoSliderProps) => {
  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <>
      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right ${speed}s linear infinite;
        }

        .infinite-scroll:hover {
          animation-play-state: paused;
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        .scroll-item {
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .scroll-item:hover {
          transform: scale(1.03);
          filter: brightness(1.08);
        }
      `}</style>

      <div
        className={`w-full relative overflow-hidden flex items-center justify-center ${className}`}
      >
        {/* Scrolling items container */}
        <div className="relative z-10 w-full flex items-center justify-center py-8">
          <div className="scroll-container w-full">
            <div className="infinite-scroll flex gap-6 w-max items-stretch">
              {duplicatedItems.map((item, index) => (
                <div key={index} className="scroll-item flex-shrink-0">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
