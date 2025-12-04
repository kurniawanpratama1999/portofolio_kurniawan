import { useEffect, useState } from "react";

interface DisplayRepos {
  description: string;
  stars: number;
  forks: number;
  total_commit: number;
  created_at: string;
  last_commit: string;
}

export default function useFetchRepo(repos: string[]) {
  const [data, setData] = useState<DisplayRepos[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const baseUrl = window.location.hostname;
        const apis = repos.map((repo) =>
          fetch(`${baseUrl}/api/github?repo=${repo}`)
        );

        const responses = await Promise.allSettled(apis);

        for (const response of responses) {
          if (response.status === "fulfilled") {
            const result = await response.value.json();

            setData((prev) => [
              ...prev,
              {
                ...result,
                last_commit: formatDate(result.last_commit),
                created_at: formatDate(result.created_at),
              },
            ]);
          }
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepo();
  }, []);

  return { data, loading, error };
}

const formatDate = (str: string) => {
  const toDate = new Date(str);
  const getDate = toDate.getDate();
  const getMonth = toDate.getMonth() + 1;
  const getYear = toDate.getFullYear();

  return `${getDate}-${getMonth}-${getYear}`;
};
