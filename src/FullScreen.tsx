//@ts-nocheck
import { useState, useRef, useEffect } from "react";

const FullscreenImageSlider = () => {
  const [index, setIndex] = useState<number>(0);
  const sliderRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const images = [
    "https://www.pixelstalk.net/wp-content/uploads/2016/08/Beautiful-High-Quality-Backgrounds-Free-Download.jpg",
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg",
    "https://www.bkacontent.com/wp-content/uploads/2016/06/Depositphotos_31146757_l-2015.jpg",
  ];

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.mozRequestFullScreen) {
        containerRef.current.mozRequestFullScreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen bg-black overflow-hidden"
    >
      <div
        ref={sliderRef}
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${index * 100}vw)`,
          width: `${images.length * 100}vw`,
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
