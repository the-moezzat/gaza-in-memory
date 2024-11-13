"use client";

import Book from "@/components/book";
import { useIsMobile } from "@/hooks/use-mobile";

export default function BookCoverImage({ userImage }: { userImage: string }) {
  const isMobile = useIsMobile();

  return (
    <Book
      coverImage={userImage}
      width={isMobile ? 42 : 58}
      height={isMobile ? 48 : 64}
      depth={isMobile ? 6 : 8}
      backgroundColor="#afafaf"
      spineColor="#333"
    />
  );
}
