import { useEffect, useState } from "react";

export default function useRepoStatus({
  username,
  repo,
}: {
  username: string;
  repo: string[];
}) {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [dataRepo, setdataRepo] = useState<{
    createdAt: string;
    latestCommit: string;
    forks: number;
    stars: number;
  }>({
    createdAt: "",
    latestCommit: "",
    forks: 0,
    stars: 0,
  });
  useEffect(() => {
    const fetchCommit = async () => {
      try {
        const repoRes = await fetch(
          `https://api.github.com/repos/${username}/${repo}`
        );

        if (!repoRes.ok) {
          throw new Error("Gagal ambil data repo");
        }

        const commitRes = await fetch(
          `https://api.github.com/repos/${username}/${repo}/commits`
        );

        if (!commitRes.ok) {
          throw new Error("Gagal ambil data commit");
        }

        const repoData = await repoRes.json();
        const commitData = await commitRes.json();
        const latestCommit = commitData[0].commit.author.date;

        const dayCommit = new Date(latestCommit).getDate();
        const monthCommit = new Date(latestCommit).getMonth();
        const yearCommit = new Date(latestCommit).getFullYear();

        const dayCreate = new Date(repoData.created_at).getDate();
        const monthCreate = new Date(repoData.created_at).getMonth();
        const yearCreate = new Date(repoData.created_at).getFullYear();

        setdataRepo({
          latestCommit: `${dayCommit}-${monthCommit + 1}-${yearCommit}`,
          createdAt: `${dayCreate}-${monthCreate + 1}-${yearCreate}`,
          forks: repoData.forks_count,
          stars: repoData.stargazers_count,
        });
      } catch (error: any) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommit();
  }, [username, repo]);

  return { dataRepo, loading, errorMessage };
}
