"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  name: string;
}

export default function ProductImageGallery({ images, name }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square w-full bg-white rounded-2xl overflow-hidden shadow-xl">
        <Image
          src={images[active]}
          alt={name}
          fill
          className="object-contain p-6"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative w-16 h-16 rounded-lg overflow-hidden bg-white border-2 transition-all ${
                active === i
                  ? "border-[#16A34A] shadow-md shadow-[#16A34A]/20"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${name} ${i + 1}`}
                fill
                className="object-contain p-1.5"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
