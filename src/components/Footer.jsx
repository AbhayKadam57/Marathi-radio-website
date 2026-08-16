import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-[#f5d6bc]/15 bg-[#372a80] text-[#f9efe8]">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 px-6 py-12 md:flex-row md:items-end md:py-20">
        <div className="flex flex-col gap-2">
          <p className="marathi-title text-[1.4rem] leading-none text-[#f9efe8] md:text-[2rem]">
            आकाशवाणी
          </p>
          <p className="marathi-title text-[0.9rem] leading-relaxed text-[#f5d6bc]/80 md:text-[1rem]">
            आकाशवाणी, मुंबई केंद्र.
          </p>
        </div>

        <div className="text-left text-[0.7rem] uppercase tracking-[0.2em] text-[#f5d6bc]/70 md:text-right">
          <p>All India Radio</p>
          <p className="mt-2">Mumbai • Marathi</p>
        </div>
      </div>

      <div className="border-t border-[#f5d6bc]/10 px-6 py-4 text-center text-[0.7rem] leading-relaxed text-[#f5d6bc]/70 md:text-sm">
        Audio is streamed through YouTube's embedded player. All rights remain with the respective labels, composers and performers. Nothing is hosted here. Song credits are compiled from film soundtrack listings.
      </div>
    </footer>
  );
};

export default Footer;
