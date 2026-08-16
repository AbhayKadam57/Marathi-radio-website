import React from "react";
import MarathiHome from "/marathi_home.png";

const Background = React.forwardRef(({ children }, ref) => {
  return (
    <div
      ref={ref}
      className="relative top-0 left-0 w-screen h-screen overflow-y-scroll"
      style={{
        backgroundImage: `url(${MarathiHome})`,
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
});

Background.displayName = "Background";

export default Background;
