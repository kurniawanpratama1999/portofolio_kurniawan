export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Untuk OPTIONS (preflight)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { repo } = req.query;

  const response = await fetch(
    `https://api.github.com/repos/kurniawanpratama1999/${repo}/commits`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GH_KEY}`,
        "User-Agent": "portfolio-app",
        Accept: "application/vnd.github+json",
      },
    }
  );

  if (!response.ok) {
    return res.status(500).json({
      error: "Gagal ambil commit",
    });
  }

  const results = await response.json();

  return res.status(200).json({
    results,
  });
}
