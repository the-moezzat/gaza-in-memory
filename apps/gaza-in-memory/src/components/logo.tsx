import React from "react";
import Image from "next/image";

function Logo() {
  return (
    <Image
      src={"/logo/logo.svg"}
      width={80}
      height={40}
      alt={"Palestine Logo"}
      className={"h-10"}
    />
  );
}

export default Logo;
