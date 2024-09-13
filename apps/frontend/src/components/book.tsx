"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface BookProps {
  width?: number;
  height?: number;
  depth?: number;
  coverImage?: string;
  backgroundColor?: string;
  spineColor?: string;
  title?: string;
  author?: string;
  isHovered?: boolean;
}

export default function Book({
  width = 208,
  height = 224,
  depth = 24,
  coverImage = "https://thispersondoesnotexist.com",
  backgroundColor = "#2e2e2e",
  spineColor = "#444",
  isHovered = false,
}: BookProps) {
  const coverWidth = width - depth;

  return (
    <div className="perspective-800 w-fit">
      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{ width, height }}
        animate={isHovered ? "hover" : "rest"}
        variants={{
          rest: { rotateY: 0, scale: 1, x: 0 },
          hover: {
            rotateY: -20,
            scale: 1.066,
            x: 8,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 25,
            },
          },
        }}
      >
        <div
          className="absolute flex items-stretch justify-start rounded-s-sm rounded-e-md bg-gradient-to-b from-white/10 via-transparent to-transparent shadow-[0_1.8px_3.6px_rgba(0,0,0,0.05),0_10.8px_21.6px_rgba(0,0,0,0.08),inset_0_-0.9px_0_rgba(0,0,0,0.1),inset_0_1.8px_1.8px_hsla(0,0%,100%,0.1),inset_3.6px_0_3.6px_rgba(0,0,0,0.1)]"
          style={{ width, height, backgroundColor }}
        >
          <BookSpine width={depth} />

          <div className="flex-1 flex flex-col justify-center items-center text-white">
            <div
              className="relative"
              style={{
                width: Math.min(coverWidth, height * 0.8),
                height: Math.min(coverWidth, height * 0.8),
                marginLeft: -Math.min(depth * 0.7, height * 0.3),
              }}
            >
              <div
                className="absolute inset-[3px] rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]"
                style={{ backgroundColor }}
              ></div>
              <div className="absolute inset-[5px] rounded-full overflow-hidden select-none">
                <Image
                  src={coverImage}
                  fill
                  alt="Book cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 rounded-full blur-[2px]"></div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute top-[5px] bg-gradient-to-r to-transparent to-30% from-black"
          style={{
            height: height - 10,
            width: depth,
            backgroundColor: spineColor,
            transform: `translateX(${coverWidth}px) rotateY(90deg) translateX(${
              depth / 2
            }px)`,
          }}
        />

        <div
          className="absolute left-0 rounded-s-lg rounded-e-md"
          style={{
            width,
            height,
            backgroundColor,
            transform: `translateZ(-${depth}px)`,
          }}
        ></div>
      </motion.div>
    </div>
  );
}

interface BookSpineProps {
  width: number;
}

function BookSpine({ width }: BookSpineProps) {
  return (
    <div
      className="h-full from-transparent via-white/25 to-transparent opacity-20 [background-size:100%_100%,100%_100%] [background-image:linear-gradient(90deg,hsla(0,0%,100%,0),hsla(0,0%,100%,0)_12%,hsla(0,0%,100%,0.25)_29.25%,hsla(0,0%,100%,0)_50.5%,hsla(0,0%,100%,0)_75.25%,hsla(0,0%,100%,0.25)_91%,hsla(0,0%,100%,0)),linear-gradient(90deg,rgba(0,0,0,0.03),rgba(0,0,0,0.1)_12%,transparent_30%,rgba(0,0,0,0.02)_50%,rgba(0,0,0,0.2)_73.5%,rgba(0,0,0,0.5)_75.25%,rgba(0,0,0,0.15)_85.25%,transparent)]"
      style={{ width }}
    ></div>
  );
}
