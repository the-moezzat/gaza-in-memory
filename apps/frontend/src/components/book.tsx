import Image from "next/image";
import React from "react";

interface BookMotionProps {
  width?: number;
  height?: number;
  depth?: number;
  coverImage?: string;
  backgroundColor?: string;
  spineColor?: string;
}

export default function Book({
  width = 208,
  height = 224,
  depth = 24,
  coverImage = "https://thispersondoesnotexist.com",
  backgroundColor = "#2e2e2e",
}: BookMotionProps) {
  const coverWidth = width - depth;
  const darkBackgroundColor = darkenHexColor(backgroundColor, 40); // Adjust the amount as needed

  return (
    <div className="w-fit perspective-400">
      <div
        style={{ width, height }}
        className="book-container relative rotate-0 transform cursor-pointer shadow-none duration-500 transform-style-3d group-hover:translate-x-2 group-hover:scale-[1.066] group-hover:rotate-y-[-20deg]"
      >
        <div
          style={{ width, height, backgroundColor }}
          className="book-first-cover absolute flex flex-initial items-stretch justify-start rounded-e-md rounded-s-sm bg-[#2e2e2e] bg-gradient-to-b from-white/10 via-transparent to-transparent"
        >
          <div
            className="h-full from-transparent via-white/25 to-transparent opacity-20 [background-image:linear-gradient(90deg,hsla(0,0%,100%,0),hsla(0,0%,100%,0)_12%,hsla(0,0%,100%,0.25)_29.25%,hsla(0,0%,100%,0)_50.5%,hsla(0,0%,100%,0)_75.25%,hsla(0,0%,100%,0.25)_91%,hsla(0,0%,100%,0)),linear-gradient(90deg,rgba(0,0,0,0.03),rgba(0,0,0,0.1)_12%,transparent_30%,rgba(0,0,0,0.02)_50%,rgba(0,0,0,0.2)_73.5%,rgba(0,0,0,0.5)_75.25%,rgba(0,0,0,0.15)_85.25%,transparent)] [background-size:100%_100%,100%_100%]"
            style={{ width: depth }}
          ></div>

          <div className="flex flex-1 flex-col items-center justify-center text-white">
            <div
              className="relative"
              style={{
                width: Math.min(coverWidth * 1, height * 0.75),
                height: Math.min(coverWidth * 1, height * 0.75),
                marginLeft: -Math.min(depth * 0.2, height),
              }}
            >
              <div
                className="absolute inset-[2px] shrink-0 grow rounded-full shadow-[inset_0px_0px_10px_rgba(255,255,255,0.7)]"
                style={{ backgroundColor }}
              ></div>
              <div className="absolute inset-[3px] select-none overflow-hidden rounded-full">
                <Image
                  src={coverImage}
                  fill
                  alt="Book cover"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          {/* <div className="cover-content">Book</div> */}
        </div>

        {/* <div
          className="book-content"
          style={{
            transform: `translateX(100%) rotateY(80deg) translateY(-50%)`,
            right: `8%`,
            width: `calc(${depth}px)`,
            height: `95%`,
            top: "50%",
          }}
        /> */}
        <div
          style={{
            width,
            height,
            background: `linear-gradient(to right, ${backgroundColor}, ${darkBackgroundColor})`,
            transform: `translateZ(calc(-1 * ${depth + 4}px))`,
          }}
          className="absolute left-0 rounded-e-md rounded-s-sm"
        ></div>
      </div>
    </div>
  );
}

export function darkenHexColor(hex: string, amount: number): string {
  let color = hex.replace("#", "");

  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const num = parseInt(color, 16);
  let r = (num >> 16) - amount;
  let g = ((num >> 8) & 0x00ff) - amount;
  let b = (num & 0x0000ff) - amount;

  r = r < 0 ? 0 : r;
  g = g < 0 ? 0 : g;
  b = b < 0 ? 0 : b;

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
