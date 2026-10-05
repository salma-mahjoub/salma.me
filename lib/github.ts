export type ContributionDay = { date: string; count: number; level: number };

// Public contribution counts for the profile; refreshed once a day.
export async function getContributions(user: string) {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      total: { lastYear: number };
      contributions: ContributionDay[];
    };
    return { total: json.total.lastYear, days: json.contributions };
  } catch {
    return null;
  }
}
