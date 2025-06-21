"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface ImageSliderProps {
  images: { src: string; alt?: string }[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-xl">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(-${(100 / images.length) * currentIndex}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <Image
              src={image.src}
              alt={image.alt || `Image ${index + 1}`}
              width={800}
              height={600}
              className="w-full h-[300px] object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              quality={85}
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-transform duration-300 hover:scale-105"
        aria-label="Previous image"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-transform duration-300 hover:scale-105"
        aria-label="Next image"
      >
        <FaArrowRight />
      </button>
    </div>
  );
}