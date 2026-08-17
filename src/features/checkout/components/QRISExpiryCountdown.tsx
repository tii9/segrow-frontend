import { useEffect, useState } from "react";

type CountdownProps = {
  expiryTime?: string;
};

const QRISExpiryCountdown = ({ expiryTime }: CountdownProps) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!expiryTime) return;

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryTime]);

  const remaining = expiryTime
    ? Math.max(0, new Date(expiryTime).getTime() - now)
    : 0;

  if (remaining <= 0) {
    return (
      <span className="bg-primary/10 text-primary ml-auto inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold">
        Expired
      </span>
    );
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <span className="bg-primary/10 text-primary ml-auto inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold">
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </span>
  );
};

export default QRISExpiryCountdown;
