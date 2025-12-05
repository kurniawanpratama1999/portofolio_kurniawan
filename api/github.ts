export default async function handler(req: any, res: any) {
  const { repo } = req.query;

  const response = await fetch(
    `https://api.github.com/repos/kurniawanpratama1999/${repo}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GH_KEY}`,
        "User-Agent": "portfolio-app",
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!response.ok) {
    return res.status(500).json({ error: "GitHub fetch failed" });
  }

  const repoData = await response.json();

  const commitsRes = await fetch(
    `https://api.github.com/repos/kurniawanpratama1999/${repo}/commits`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GH_KEY}`,
        "User-Agent": "portfolio-app",
        Accept: "application/vnd.github+json",
      },
    }
  );

  const commits = await commitsRes.json();
  const totalCommit = Array.isArray(commits) ? commits.length : 0;
  const lastCommit =
    Array.isArray(commits) && commits[0]?.commit?.author?.date
      ? commits[0].commit.author.date
      : null;

  res.status(200).json({
    description: repoData.description,
    stars: repoData.stargazers_count,
    forks: repoData.forks_count,
    created_at: repoData.created_at,
    total_commit: totalCommit,
    last_commit: lastCommit,
  });
}
