'use client';

import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export default function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0B2545] via-[#133B6E] to-[#0D9488] text-white p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <GraduationCap className="w-10 h-10 text-[#F59E0B] mb-2 opacity-90" />
        <span className="text-xs font-medium tracking-tight text-slate-100 max-w-[220px] line-clamp-2">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
