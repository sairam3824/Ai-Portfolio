import { useState, useEffect } from "react";

const GITHUB_USERNAME = "sairam3824";
const CACHE_KEY = "github_repos_count";
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

interface CacheEntry {
    count: number;
    timestamp: number;
}

export function useGitHubRepos(fallback = "20+"): string {
    const [count, setCount] = useState<string>(() => {
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const entry: CacheEntry = JSON.parse(cached);
                if (Date.now() - entry.timestamp < CACHE_TTL) {
                    return `${entry.count}+`;
                }
            }
        } catch {}
        return fallback;
    });

    useEffect(() => {
        let cancelled = false;

        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
            .then((res) => {
                if (!res.ok) throw new Error("GitHub API error");
                return res.json();
            })
            .then((data) => {
                if (cancelled) return;
                const repos = data.public_repos as number;
                setCount(`${repos}+`);
                localStorage.setItem(
                    CACHE_KEY,
                    JSON.stringify({ count: repos, timestamp: Date.now() })
                );
            })
            .catch(() => {
                // keep fallback or cached value
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return count;
}
