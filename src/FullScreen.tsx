//@ts-nocheck

import React, { useState, useRef, useEffect } from "react";

const FullscreenImageSlider = () => {
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const containerRef = useRef(null);

  const images = [
    "https://www.pixelstalk.net/wp-content/uploads/2016/08/Beautiful-High-Quality-Backgrounds-Free-Download.jpg",
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg",
    "https://www.bkacontent.com/wp-content/uploads/2016/06/Depositphotos_31146757_l-2015.jpg",
  ];

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (started) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [started, images.length]);

  // Function to enter fullscreen
  const enterFullscreen = () => {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      }
    }
    setStarted(true);
  };

  // Detect Smart TV and force fullscreen with correct layout
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

  return (
    <div
      ref={containerRef}
      className="relative bg-black overflow-hidden w-screen h-screen"
    >
      {started ? (
        <>
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Slide ${i + 1}`}
              className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                i === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}
        </>
      ) : (
        <button
          onClick={enterFullscreen}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xl bg-black text-white"
        >
          Click to Start Fullscreen Slideshow
        </button>
      )}
    </div>
  );
};

export default FullscreenImageSlider;
