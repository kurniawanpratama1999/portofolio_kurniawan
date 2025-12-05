import { useEffect, useState } from "react";

// interface DisplayRepos {
//   description: string;
//   stars: number;
//   forks: number;
//   total_commit: number;
//   created_at: string;
//   last_commit: string;
// }

export default function useRepository(repos: string[]) {
  const [data, setData] = useState<{}[]>([]);
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

        const datas = [];
        const commits = await Promise.allSettled(RESPONSE_COMMIT);
        const repositories = await Promise.allSettled(RESPONSE_REPO);

        for (let i = 0; i < commits.length; i++) {
          const commit = commits[i];
          const repository = repositories[i];
          if (
            commit.status === "fulfilled" &&
            repository.status === "fulfilled"
          ) {
            const jsonCommit = await commit.value.json();
            const jsonRepo = await repository.value.json();

            datas.push({
              success: true,
              jsonCommit,
              jsonRepo,
            });
          } else {
            datas.push({
              success: false,
              message: "Gagal ambil repo dan commit",
            });
          }
        }

        setData(datas);
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

// const formatDate = (str: string) => {
//   const toDate = new Date(str);
//   const getDate = toDate.getDate();
//   const getMonth = toDate.getMonth() + 1;
//   const getYear = toDate.getFullYear();

//   return `${getDate}-${getMonth}-${getYear}`;
// };
