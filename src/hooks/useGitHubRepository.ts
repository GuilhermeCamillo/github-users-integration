import { useQuery } from "@tanstack/react-query";
import { fetchRepository } from "../services/githubApi";
import type { GitHubRepository } from "../types/github";

export const useGitHubRepository = (owner: string, repo: string) => {
  return useQuery<GitHubRepository, Error>({
    queryKey: ["githubRepository", owner, repo],
    queryFn: () => fetchRepository(owner, repo),
    enabled: !!owner && !!repo && owner.trim().length > 0 && repo.trim().length > 0,
    meta: {
      persist: true,
    },
  });
};

