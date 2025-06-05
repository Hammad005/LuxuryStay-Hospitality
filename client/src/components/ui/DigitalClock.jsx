"use client";

import React, { useState, useEffect } from "react";
import { Card } from "./card";
import Logo from "../Logo";

export function DigitalClock({ className = "" }) {
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }

  // Split time into [hh, mm, ss] and am/pm
  const [clock, ampm] = time.split(" ");
  const [hrs, mins, secs] = clock.split(":");

  return (
    <Card
      className={`flex flex-col items-center gap-1 justify-center border border-primary/80 h-full ${className}`}
    >
      <Logo />

      <div className="md:text-6xl text-4xl font-black text-transparent [-webkit-text-stroke:1px_var(--primary)] flex items-end">
        <span className="">{hrs}</span>
        <span>:</span>
        <span className="">{mins}</span>
        <span>:</span>
        <span className="">{secs}</span>
        <span className="md:text-4xl text-2xl md:opacity-95 ml-2 uppercase">
          {ampm}
        </span>
      </div>
    </Card>
  );
}
