import { useEffect, useState } from "react";

export interface ContributionDays {
  date?: string;
  contributionCount?: number;
  color?: string;
}

export interface ContributionWeek {
  contributionDays?: ContributionDays[];
}

export interface Contribution {
  total_contribution?: number;
  contribution_week?: ContributionWeek[];
}

export interface RepoAndCommit {
  success: boolean;
  message: string;
  total_commit?: number;
  last_commit?: string;
  description?: string;
  stars?: number;
  forks?: number;
  created_at?: string;
}

export interface RepoCommitContribution {
  contribution: Contribution;
  repoAndCommit: RepoAndCommit[];
}

export default function useRepository(repos: string[]) {
  const [data, setData] = useState<RepoCommitContribution | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        const RESPONSE_CONTRIBUTE = await fetch(
          "https://portofolio-kurniawan.vercel.app/api/contribute"
        );

        if (!RESPONSE_CONTRIBUTE.ok) {
          throw new Error("Gagal ambil data contributes");
        }

        const RESPONSE_COMMIT = repos.map((repo) =>
          fetch(
            `https://portofolio-kurniawan.vercel.app/api/commit?repo=${repo}`
          )
        );

        const RESPONSE_REPO = repos.map((repo) =>
          fetch(
            `https://portofolio-kurniawan.vercel.app/api/repository?repo=${repo}`
          )
        );

        const repoAndCommit = [];
        const commits = await Promise.allSettled(RESPONSE_COMMIT);
        const repositories = await Promise.allSettled(RESPONSE_REPO);
        const jsonContribute = await RESPONSE_CONTRIBUTE.json();

        for (let i = 0; i < commits.length; i++) {
          const commit = commits[i];
          const repository = repositories[i];
          if (
            commit.status === "fulfilled" &&
            repository.status === "fulfilled"
          ) {
            const jsonCommit = await commit.value.json();
            const jsonRepo = await repository.value.json();

            const total_commit = jsonCommit.results.length;
            const last_commit = formatDate(
              jsonCommit.results[0]?.commit.author.date
            );
            const description = jsonRepo.results.description;
            const stars = jsonRepo.results.stargazers_count;
            const forks = jsonRepo.results.forks_count;
            const created_at = formatDate(jsonRepo.results.created_at);

            repoAndCommit.push({
              success: true,
              message: "Berhasil ambil repo dan commit",

              description,
              total_commit,
              last_commit,
              stars,
              forks,
              created_at,
            });
          } else {
            repoAndCommit.push({
              success: false,
              message: "Gagal ambil repo dan commit",
            });
          }
        }

        const total_contribution =
          jsonContribute.results.data.user.contributionsCollection
            .contributionCalendar.totalContributions;
        const contribution_week =
          jsonContribute.results.data.user.contributionsCollection
            .contributionCalendar.weeks;

        const contribution = { total_contribution, contribution_week };

        setData({ contribution, repoAndCommit });
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepository();
  }, []);

  return { data, loading, error };
}

const formatDate = (str: string) => {
  const toDate = new Date(str);
  const getDate = toDate.getDate().toString().padStart(2, "0");
  const getMonth = (toDate.getMonth() + 1).toString().padStart(2, "0");
  const getYear = toDate.getFullYear();

  return `${getDate}-${getMonth}-${getYear}`;
};
