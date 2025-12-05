export default async function handler(req: any, res: any) {
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
    const api = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GH_KEY}`,
      },
      body: JSON.stringify({ query }),
    });

    // Cek apakah request berhasil
    if (!api.ok) {
      const err = await api.text();
      console.error("GitHub Error:", err);
      return res
        .status(500)
        .json({ error: "GitHub fetch failed", detail: err });
    }

    const json = await api.json();

    if (json.errors) {
      console.error("GraphQL Errors:", json.errors);
      return res.status(500).json({ error: json.errors });
    }

    return res.status(200).json(json.data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
