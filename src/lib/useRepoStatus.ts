import { useEffect, useState } from "react";

export default function useRepoStatus({
  username,
  repos,
}: {
  username: string;
  repos: string[];
}) {
  const [datas, setDatas] = useState<
    {
      success: boolean;
      createdAt: string;
      latestCommit: string;
      totalCommit: number;
      stars: number;
      forks: number;
    }[]
  >([]);

  const [counterCommit, setCounterCommit] = useState(0);
  const [counterRepo, setCounterRepo] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    repos.forEach(() => {
      setDatas((prev) => [
        ...prev,
        {
          success: true,
          createdAt: "",
          latestCommit: "",
          totalCommit: 0,
          stars: 0,
          forks: 0,
        },
      ]);
    });

    const fetchingGithub = async () => {
      try {
        const API_REPO = repos.map((repo) =>
          fetch(`https://api.github.com/repos/${username}/${repo}`)
        );

        const API_COMMIT = repos.map((repo) =>
          fetch(`https://api.github.com/repos/${username}/${repo}/commits`)
        );

        const responsesRepo = await Promise.allSettled(API_REPO);
        const responsesCommit = await Promise.allSettled(API_COMMIT);

        for (const responseCommit of responsesCommit) {
          if (responseCommit.status === "fulfilled") {
            const resultCommit = await responseCommit.value.json();
            console.log(resultCommit);
            const totalCommit = resultCommit.length;
            const lastCommit = new Date(resultCommit[0].commit.author.date);
            const getDayLastCommit = lastCommit.getDay();
            const getMonthLastCommit = lastCommit.getMonth() + 1;
            const getYearLastCommit = lastCommit.getFullYear();

            const latestCommit = `${getDayLastCommit}-${getMonthLastCommit}-${getYearLastCommit}`;

            setDatas((prevs) =>
              prevs.map((prev, idxPrev) =>
                idxPrev === counterCommit
                  ? { ...prev, totalCommit, latestCommit }
                  : prev
              )
            );
          } else {
            setDatas((prevs) =>
              prevs.map((prev, idxPrev) =>
                idxPrev === counterCommit ? { ...prev, success: false } : prev
              )
            );
          }

          setCounterCommit((prev) => prev + 1);
        }

        for (const responseRepo of responsesRepo) {
          if (responseRepo.status === "fulfilled") {
            const resultRepo = await responseRepo.value.json();

            const { stargazers_count, forks_count, createdAt } = resultRepo;
            const convertCreatedAtToDate = new Date(createdAt);
            const getDayRepoCreated = convertCreatedAtToDate.getDay();
            const getMonthRepoCreated = convertCreatedAtToDate.getMonth() + 1;
            const getYearRepoCreated = convertCreatedAtToDate.getFullYear();
            const repoCreatedAt = `${getDayRepoCreated}-${getMonthRepoCreated}-${getYearRepoCreated}`;
            setDatas((prevs) =>
              prevs.map((prev, idxPrev) =>
                idxPrev === counterRepo
                  ? {
                      ...prev,
                      stars: stargazers_count,
                      forks: forks_count,
                      createdAt: repoCreatedAt,
                    }
                  : prev
              )
            );
          } else {
            setDatas((prevs) =>
              prevs.map((prev, idxPrev) =>
                idxPrev === counterRepo ? { ...prev, success: false } : prev
              )
            );
          }
          setCounterRepo((prev) => prev + 1);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchingGithub();
  }, [username]);
  return { datas, loading, error };
}
