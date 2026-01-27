import { useEffect } from "react";

const CodingRedirect = () => {
  useEffect(() => {
    window.location.href = "https://codolio.com/profile/sairam3824";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-lg">Redirecting to Codolio profile...</p>
        <p className="text-lg">This is not much accurate</p>
      </div>
    </div>
  );
};

export default CodingRedirect;
