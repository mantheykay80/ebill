import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header
      className="flex items-center justify-between bg-[#00549A]"
      style={{ paddingBlock: "1rem", paddingInline: "8px", height: "10vh" }}
    >
      <div className="flex items-center gap-2 pt-8">
        <Image
          src="/images/Bells.png"
          alt="Bells Logo"
          width={80}
          height={80}
        />
        <span className="text-white font-normal" style={{ lineHeight: "1.3" }}>
          Business
          <br />
          Email
        </span>
      </div>
      <Link
        href="#"
        className="text-white underline font-sans"
        style={{ paddingRight: ".5rem" }}
      >
        Francais
      </Link>
    </header>
  );
};
