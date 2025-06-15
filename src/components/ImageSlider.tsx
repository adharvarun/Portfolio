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
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      <div 
        className="flex transition-transform duration-500 ease-in-out" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt || `Portfolio image ${index + 1}`}
            width={800}
            height={600}
            className="w-[400px] h-[300px] object-cover"
            loading={index === 0 ? "eager" : "lazy"}
            quality={85}
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
        aria-label="Previous image"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
        aria-label="Next image"
      >
        <FaArrowRight />
      </button>
    </div>
  );
}
