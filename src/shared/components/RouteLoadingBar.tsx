import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const RouteLoadingBar = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    setProgress(20);

    const timer1 = setTimeout(() => setProgress(60), 100);
    const timer2 = setTimeout(() => setProgress(90), 200);
    const timer3 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setLoading(false), 200);
    }, 400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [location.pathname]);

  if (!loading && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-accent z-[9999] transition-all duration-300 ease-out"
      style={{
        width: `${progress}%`,
        opacity: loading ? 1 : 0,
      }}
    >
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-accent to-transparent" />
    </div>
  );
};
