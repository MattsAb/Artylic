import { useState, useEffect } from "react";
import googleDark from "../../../assets/web_dark_rd_SU.svg";
import googleLight from "../../../assets/web_light_rd_SU.svg";

function GoogleButton() {
  const [isLight, setIsLight] = useState(
    window.matchMedia("(prefers-color-scheme: light)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handler = (e: MediaQueryListEvent) => setIsLight(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <button className="">
      <img src={isLight ? googleLight : googleDark} alt="Sign in with Google" />
    </button>
  );
}

export default GoogleButton;