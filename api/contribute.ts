export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Untuk OPTIONS (preflight)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const query = `
  query {
    user(login: "kurniawanpratama1999") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GH_KEY}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      return res.status(500).json({ error: "GitHub fetch failed" });
    }

    const results = await response.json();

    return res.status(200).json({ results });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
