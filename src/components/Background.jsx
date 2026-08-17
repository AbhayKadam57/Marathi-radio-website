import React from "react";
import MarathiHome from "/marathi_home.png";
import MarathiHomeMobile from "/marathi_home_mobile.png";
import MarathiDesktopVideo from "/marathi_home_desktop.mp4";
import MarathiMobileVideo from "/marathi_home_mobile_vid.mp4";

const Background = React.forwardRef(({ children }, ref) => {
  return (
    <div
      ref={ref}
      className="relative w-screen h-screen overflow-y-scroll"
    >
      {/* Desktop Video */}
      <div className="fixed inset-0 z-0 hidden md:block">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={MarathiHome}
        >
          <source src={MarathiDesktopVideo} type="video/mp4" />
          <img
            src={MarathiHome}
            alt=""
            className="w-full h-full object-cover"
          />
        </video>
      </div>

      {/* Mobile Video */}
      <div className="fixed inset-0 z-0 block md:hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={MarathiHomeMobile}
        >
          <source src={MarathiMobileVideo} type="video/mp4" />
          <img
            src={MarathiHomeMobile}
            alt=""
            className="w-full h-full object-cover"
          />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
});

Background.displayName = "Background";

export default Background;