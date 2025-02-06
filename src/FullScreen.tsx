//@ts-nocheck
import React, { useState, useRef, useEffect } from "react";

const FullscreenImageSlider = () => {
  const [index, setIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const images = [
    "https://www.pixelstalk.net/wp-content/uploads/2016/08/Beautiful-High-Quality-Backgrounds-Free-Download.jpg",
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg",
    "https://www.bkacontent.com/wp-content/uploads/2016/06/Depositphotos_31146757_l-2015.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        // iPhone/iPad Safari
        containerRef.current.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        // iPhone/iPad Safari
        document.webkitExitFullscreen();
      }
    }
  };

  // Detect Smart TV browser and apply fullscreen fix
  useEffect(() => {
    const isSmartTV =
      /(smart-tv|smarttv|webos|tizen|netcast|googletv|applewebkit|silk)/i.test(
        navigator.userAgent
      );
    if (isSmartTV) {
      document.body.style.overflow = "hidden";
      containerRef.current.style.position = "fixed";
      containerRef.current.style.width = "100vw";
      containerRef.current.style.height = "100vh";
      containerRef.current.style.top = "0";
      containerRef.current.style.left = "0";
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!(document.fullscreenElement || document.webkitFullscreenElement)
      );
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener(
      "webkitfullscreenchange",
      handleFullscreenChange
    );
    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-black overflow-hidden"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${index * 100}vw)`,
          width: `${images.length * 100}vw`,
          display: "flex",
          overflow: "hidden",
        }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Slide ${i + 1}`}
            className="w-screen h-screen object-cover"
          />
        ))}
      </div>

      <button
        onClick={toggleFullscreen}
        className="absolute bottom-5 right-5 px-4 py-2 text-lg bg-white bg-opacity-50 text-black rounded cursor-pointer z-10"
      >
        {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      </button>
    </div>
  );
};

export default FullscreenImageSlider;
