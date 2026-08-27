"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Jakarta",
});

export default function JakartaClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  // Nothing on the server: a server-rendered clock is wrong by the time it
  // reaches the browser, and mismatches hydration.
  return time ? <span className="mh-time">{time} WIB</span> : null;
}
