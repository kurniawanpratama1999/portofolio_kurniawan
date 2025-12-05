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
    return res.status(500).json({ error: "Gagal ambil repo" });
  }

  const results = await response.json();

  return res.status(200).json({
    results,
  });
}
