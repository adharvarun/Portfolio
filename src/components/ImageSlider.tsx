"use client";

import Image from "next/image";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface ImageSliderProps {
  images: { src: string; alt?: string }[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt || `Slide ${index + 1}`}
            width={800}
            height={600}
            className="w-[400px] h-[300px] object-cover rounded-xl"
          />
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:cursor-pointer"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:cursor-pointer"
      >
        <FaArrowRight />
      </button>
    </div>
  );
}
