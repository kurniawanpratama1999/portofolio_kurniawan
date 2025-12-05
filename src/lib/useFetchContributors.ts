import { useEffect, useState } from "react";

export default function useFetchContributors() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchingContributors = async () => {
      const baseUrl = window.location.origin;
      const api = await fetch(`${baseUrl}/api/contributors`);
      const response = await api.json();
      setData(response);
      setLoading(false);
      setError(false);
    };
    fetchingContributors();
  }, []);

  return { data, loading, error };
}
