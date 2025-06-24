"use client";

import React from "react";

interface FloatProps {
  className?: string;
  children?: React.ReactNode;
}

export default function Float({ className, children }: FloatProps) {
  return (
    <div
      className={`rounded-[50px] bg-[linear-gradient(145deg,_#440089,_#3a0073)] [box-shadow:20px_20px_60px_#36006d,_-20px_-20px_60px_#4a0093] ${className}`}
    >
      {children}
    </div>
  );
}
