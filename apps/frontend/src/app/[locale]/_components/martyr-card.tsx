"use client";
import Image from "next/image";
import Book from "@/components/book";
import { useState } from "react";

function MartyrCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex flex-col gap-4 rounded-xl bg-white w-fit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 aspect-square rounded-xl overflow-hidden">
        <Image
          src="https://thispersondoesnotexist.com/"
          alt="Martyr"
          className="object-cover"
          fill
        />

        <div className="absolute bottom-3 left-3">
          <Book
            width={60}
            height={72}
            depth={10}
            backgroundColor="#afafaf"
            spineColor="#333"
            author="John Doe"
            isHovered={isHovered}
          />
        </div>
      </div>

      <div>
        <p className="text-gray-800 font-medium text-lg">Esmail Haneya</p>
        <p className="text-gray-600 text-sm">5/7/2024</p>
      </div>
    </div>
  );
}

export default MartyrCard;
