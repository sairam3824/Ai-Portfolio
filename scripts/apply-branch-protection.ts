import { execFileSync } from "node:child_process";

type RepoInfo = {
    owner: string;
    name: string;
};

const parseGitHubRepo = (remoteUrl: string): RepoInfo | null => {
    const normalized = remoteUrl.trim();
    const httpsMatch = normalized.match(/github\.com[:/](.+?)\/(.+?)(?:\.git)?$/);

    if (!httpsMatch) {
        return null;
    }

    const [, owner, name] = httpsMatch;
    return { owner, name };
};

const getRepoInfo = (): RepoInfo => {
    const remoteUrl = execFileSync("git", ["remote", "get-url", "origin"], {
        encoding: "utf8",
    });

    const repo = parseGitHubRepo(remoteUrl);
    if (!repo) {
        throw new Error(`Could not determine GitHub repository from origin URL: ${remoteUrl.trim()}`);
    }

    return repo;
};

const hasValidGhAuth = () => {
    try {
        execFileSync("gh", ["auth", "status"], {
            stdio: "pipe",
        });
        return true;
    } catch {
        return false;
    }
};

const applyProtection = (owner: string, repo: string, branch: string) => {
    const payload = {
        required_status_checks: {
            strict: true,
            contexts: ["CI"],
        },
        enforce_admins: true,
        required_pull_request_reviews: {
            dismiss_stale_reviews: true,
            require_code_owner_reviews: true,
            required_approving_review_count: 1,
            require_last_push_approval: false,
        },
        restrictions: null,
        required_linear_history: true,
        allow_force_pushes: false,
        allow_deletions: false,
        block_creations: false,
        required_conversation_resolution: true,
        lock_branch: false,
        allow_fork_syncing: true,
    };

    execFileSync(
        "gh",
        [
            "api",
            "--method",
            "PUT",
            `repos/${owner}/${repo}/branches/${branch}/protection`,
            "--input",
            "-",
        ],
        {
            input: JSON.stringify(payload),
            stdio: "inherit",
        },
    );
};

if (!hasValidGhAuth()) {
    throw new Error(
        [
            "GitHub CLI is installed but not authenticated with a valid token.",
            "Run `gh auth login -h github.com` and then `npm run branch-protect:apply`.",
        ].join(" "),
    );
}

const { owner, name } = getRepoInfo();

for (const branch of ["main", "master"]) {
    applyProtection(owner, name, branch);
    console.log(`Applied branch protection to ${owner}/${name}:${branch}`);
}
