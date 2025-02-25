import { Octokit } from "@octokit/rest"

export async function getUserPullRequests(userId: string) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  })

  // Get user's PRs across all repositories
  const { data: pulls } = await octokit.search.issuesAndPullRequests({
    q: `is:pr author:${userId}`,
    sort: "updated",
    order: "desc",
  })

  return pulls.items.map((pr: any) => ({
    id: pr.id,
    title: pr.title,
    repo: pr.repository_url.split("/").slice(-2).join("/"),
    number: pr.number,
    url: pr.html_url,
    state: pr.state,
    created_at: pr.created_at,
  }))
}

export async function getContributedRepositories(username: string) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  })

  const { data: repos } = await octokit.search.repos({
    q: `contributor:${username}`,
    sort: "updated",
    order: "desc",
  })

  return repos.items
}

export async function watchRepository(owner: string, repo: string) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  })

  await octokit.activity.setRepoSubscription({
    owner,
    repo,
    subscribed: true,
  })
}

