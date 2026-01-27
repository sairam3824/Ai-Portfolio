import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function BadgesPage() {
  const navigate = useNavigate();

  const files = useMemo(
    () => [
      "CodeChefBadge (1).png",
      "CodeChefBadge (2).png",
      "CodeChefBadge (3).png",
      "downl.png",
      "download (1).png",
      "download (2).png",
      "download (3).png",
      "download (4).png",
      "download (5).png",
      "download (6).png",
      "download (7).png",
      "download (8).png",
      "download (9).png",
      "download.png",
      "inb.png"
    ],
    []
  );

  const images = useMemo(() => {
    const counts = {};
    return files.map((f, idx) => {
      const raw = f.replace(/\.[^/.]+$/, "");
      const base = raw.replace(/\s*\(\d+\)$/, "");
      counts[base] = (counts[base] || 0) + 1;
      const occurrenceIndex = files
        .slice(0, idx + 1)
        .filter((x) => x.replace(/\.[^/.]+$/, "").replace(/\s*\(\d+\)$/, "") === base).length;
      const displayName = counts[base] > 1 ? `${base} (${occurrenceIndex})` : base;
      return {
        file: f,
        src: `/badges/${encodeURI(f)}`,
        name: displayName
      };
    });
  }, [files]);

  return (
    <main className="min-h-screen p-6 bg-background text-foreground">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 flex items-start justify-between">
          <h1 className="text-3xl font-semibold">Badges</h1>
          <button
            onClick={() => navigate("/profile")}
            className="rounded-full border border-border px-3 py-2 text-sm bg-card hover:bg-secondary transition-colors"
          >
            Back to Profile
          </button>
        </header>

        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {images.map((img) => (
            <div
              key={img.file}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 flex items-center justify-center bg-white rounded-lg overflow-hidden">
                <img src={img.src} alt={img.name} className="max-w-full max-h-full object-contain" />
              </div>
              <span className="text-xs md:text-sm truncate text-center w-full">{img.name}</span>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
