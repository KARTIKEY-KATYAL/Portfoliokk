import { Octokit } from "octokit";
import { NextResponse, NextRequest } from "next/server";

// Basic in-memory cache (ephemeral) to reduce API calls during runtime on a single server instance.
// For production with multiple instances, replace with Redis / KV.
interface ContributionDay { contributionCount: number; date: string }
interface ContributionWeek { contributionDays: ContributionDay[] }
interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}
interface GraphQLResponse { user: { contributionsCollection: { contributionCalendar: ContributionCalendar } } }
interface Payload { user: { totalContribution: number }; contributions: { count: number; date: string }[] }

let cache: { key: string; data: Payload; expires: number } | null = null;

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is Required" },
      { status: 401 }
    );
  }

  try {
    const cacheKey = username;
    const now = Date.now();
    if (cache && cache.key === cacheKey && cache.expires > now) {
      return NextResponse.json(cache.data, {
        headers: {
          "Cache-Control": "public, max-age=300, stale-while-revalidate=600"
        }
      });
    }

    const query = `
        query($username: String!) {
          user(login: $username) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `;

  const response = await octokit.graphql<GraphQLResponse>(query, { username });
  const calendar = response.user.contributionsCollection.contributionCalendar;

    // Flatten the weeks array to get all contribution days
    const contributions = calendar.weeks.flatMap((week: ContributionWeek) =>
      week.contributionDays.map((day: ContributionDay) => ({
        count: day.contributionCount,
        date: day.date,
      }))
    );

  const payload: Payload = {
      user: {
        totalContribution: calendar.totalContributions,
      },
      contributions,
    };

    cache = { key: cacheKey, data: payload, expires: now + 1000 * 60 * 5 }; // 5 minutes

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "public, max-age=300, stale-while-revalidate=600"
      }
    });
  } catch (error) {
    console.error("GITHUB API ERROR" , error)
    return NextResponse.json(
        {error:"Failed to fetch github Data"},
        {status:500}
    )
  }
}
