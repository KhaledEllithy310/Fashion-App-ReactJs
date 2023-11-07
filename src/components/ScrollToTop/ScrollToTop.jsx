import { useEffect, useState } from "react";
import "./ScrollToTop.css";
import { KeyboardArrowUp } from "@mui/icons-material";
export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY === 0) setShowButton(false);
      else setShowButton(true);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <button
        className={showButton ? "scroll__top" : "d-none"}
        style={{ zIndex: "1000000" }}
        onClick={() => scrollToTop()}
      >
        <KeyboardArrowUp className="iconTop" />
      </button>
    </>
  );
}
