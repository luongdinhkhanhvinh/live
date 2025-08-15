"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  minLoadingTime?: number; // Thời gian tối thiểu hiển thị loading (ms)
}

export default function LoadingScreen({ onLoadingComplete, minLoadingTime = 2000 }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Ensure minimum loading time
    const timer = setTimeout(() => {
      completeLoading();
    }, minLoadingTime);

    return () => clearTimeout(timer);
  }, [minLoadingTime]);

  const completeLoading = () => {
    setIsVisible(false);
    setTimeout(() => {
      onLoadingComplete();
    }, 500); // Delay để animation fade out hoàn thành
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center space-y-6 animate-fade-in-up">
        {/* Logo */}
        <div className="relative">
          <Image
            src="/ngoaihangtv.png"
            alt="NgoaiHangTV"
            width={200}
            height={100}
            className="w-40 h-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
}
