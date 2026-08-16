import React, { useEffect, useState } from "react";
import AakshwaniLogo from "/aakashwani_logo.png";
import { supabase } from "../lib/supabase";

const CHANNEL_NAME = "aakashwani-counter";

const HeroSection = () => {
  const [now, setNow] = useState(new Date());
  const [listeners, setListeners] = useState(1044);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // useEffect(() => {
  //   const liveCounter = setInterval(() => {
  //     setListeners((prev) => prev + Math.floor(Math.random() * 6) + 1);
  //   }, 2500);

  //   return () => clearInterval(liveCounter);
  // }, []);

  useEffect(() => {
    const channel = supabase.channel(CHANNEL_NAME, {
      config: {
        presence: {
          key: crypto.randomUUID(),
        },
      },
    });

    const updateListenerCount = () => {
      const presenceState = channel.presenceState();

      const count = Object.values(presenceState).reduce(
        (total, users) => total + users.length,
        0,
      );

      setListeners(count);
    };

    channel
      .on("presence", { event: "sync" }, updateListenerCount)
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            online_at: new Date().toISOString(),
          });

          updateListenerCount();
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  const formattedTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDate = now.toLocaleDateString([], {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative container max-w-screen mx-auto min-h-screen text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(10,9,8,0.15)_0%,_rgba(10,9,8,0.4)_35%,_rgba(10,9,8,0.75)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(10,9,8,0.2),_transparent_100%)]" />

      <div className="sticky left-8 top-8 z-20 inline-block w-fit py-8 pl-8 text-left">
        <div className="text-4xl font-medium tracking-tight text-[#f7f1ea]">
          {formattedTime}
        </div>
        <div className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#f7f1ea]/90">
          {formattedDate}
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-[#f7f1ea]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#59d18a] shadow-[0_0_10px_rgba(89,209,138,0.9)]" />
          <span>{listeners.toLocaleString()} listening</span>
        </div>
      </div>

      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <img
            src={`${AakshwaniLogo}`}
            className="h-auto w-16 object-contain sm:w-20 md:w-24 lg:w-28 xl:w-32"
          />
          <p className="marathi-title text-[2.2rem] leading-none text-[#f9efe8] md:text-[4.8rem]">
            {" "}
            आकाशवाणी
          </p>
          <p className="marathi-title text-[1.2rem] leading-none text-[#f9efe8] md:text-[2.2rem]">
            आकाशवाणी,मराठी केंद्र.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
