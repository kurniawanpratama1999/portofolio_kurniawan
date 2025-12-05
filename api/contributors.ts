export default async function handler(req: any, res: any) {
  const query = `query {
          user(login: "kurniawanpratama1999") {
            contributionsCollection {
              contributionCalendar {
                totalContributionsweeks {
                  contributionDays {
                    datecontributionCountcolor
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
