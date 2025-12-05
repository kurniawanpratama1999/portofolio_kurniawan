import { useEffect, useState } from "react";

interface DisplayRepos {
  description: string;
  stars: number;
  forks: number;
  total_commit: number;
  created_at: string;
  last_commit: string;
}

export default function useFetchRepo(repo: string) {
  const [data, setData] = useState<DisplayRepos[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const apiRepo = await fetch(
          `https://portofolio-kurniawan/api/repository?repo=${repo}`
        );

        if (!apiRepo.ok) {
          throw new Error("Gagal ambil data repo");
        }

        const responseRepo = await apiRepo.json();

        const apiCommit = await fetch(
          `https://portofolio-kurniawan/api/commit?repo=${repo}`
        );

        if (!apiCommit.ok) {
          throw new Error("Gagal ambil data commit");
        }

        const responseCommit = await apiCommit.json();
        console.log({ responseRepo, responseCommit });
        formatDate("2025-05-11");
        setData(responseCommit);
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
