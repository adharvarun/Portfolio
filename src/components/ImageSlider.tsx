"use client";

import Image from "next/image";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface ImageSliderProps {
  images: { src: string; alt?: string }[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const goToNext = () => {
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  if (!images.length) return null;

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map(({ src, alt }, idx) => (
          <Image
            key={idx}
            src={src}
            alt={alt ?? `Image ${idx + 1}`}
            width={800}
            height={600}
            className="w-[400px] h-[300px] object-cover"
            loading={idx === 0 ? "eager" : "lazy"}
            quality={85}
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ))}
      </div>

      <button
        aria-label="Previous Image"
        onClick={goToPrev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors transition-transform duration-300 hover:scale-105 cursor-pointer"
      >
        <FaArrowLeft />
      </button>
      <button
        aria-label="Next Image"
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors transition-transform duration-300 hover:scale-105 cursor-pointer"
      >
        <FaArrowRight />
      </button>
    </div>
  );
}
