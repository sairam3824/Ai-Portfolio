import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SEO } from "@/shared/components";
import { badgeFiles } from "@/data/badgesData";
import { profileDetails } from "@/data/siteMetadata";

export default function BadgesPage() {
  const navigate = useNavigate();

  const files = useMemo(() => [...badgeFiles], []);

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
    <main className="min-h-screen bg-background p-4 text-foreground sm:p-6">
      <SEO
        title={`Badges | ${profileDetails.name}`}
        description={`Badge gallery for ${profileDetails.name} highlighting competitive programming and certification achievements.`}
        canonicalPath="/profile/badges"
        pageType="CollectionPage"
        keywords={[`${profileDetails.name} Badges`, "Programming Badges", "Achievement Gallery"]}
      />
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-2xl font-semibold sm:text-3xl">Badges</h1>
          <button
            onClick={() => navigate("/profile")}
            className="w-full rounded-full border border-border bg-card px-3 py-2 text-sm transition-colors hover:bg-secondary sm:w-auto"
          >
            Back to Profile
          </button>
        </header>

        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-6 lg:gap-6">
          {images.map((img) => (
            <div
              key={img.file}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-3 transition-shadow hover:shadow-lg sm:p-4"
            >
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg bg-white sm:h-28 sm:w-28 md:h-36 md:w-36">
                <img src={img.src} alt={img.name} className="max-w-full max-h-full object-contain" />
              </div>
              <span className="w-full truncate text-center text-[0.7rem] sm:text-xs md:text-sm">{img.name}</span>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
