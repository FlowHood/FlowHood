import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { cn } from "../lib/utils";

const ScrollToTopButton = ({
  scrollClassname = "bottom-6 right-5",
  ...rest
}) => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

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
      {showTopBtn && (
        <div className={cn("fixed z-20", scrollClassname)} {...rest}>
          <button
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-4 border-indigo-600 bg-indigo-600 text-white shadow-md transition-all duration-300 ease-in-out hover:border-indigo-600 hover:bg-gray-300 hover:text-indigo-600"
            onClick={scrollToTop}
            type="button"
          >
            <FaArrowUp className=" text-lg" />
          </button>
        </div>
      )}
    </>
  );
};

export default ScrollToTopButton;
