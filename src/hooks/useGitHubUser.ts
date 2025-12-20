import { useQuery } from "@tanstack/react-query";
import { fetchGitHubUser } from "../services/githubApi";
import type { GitHubUser } from "../types/github";

export const useGitHubUser = (username: string) => {
  return useQuery<GitHubUser, Error>({
    queryKey: ["githubUser", username],
    queryFn: () => fetchGitHubUser(username),
    enabled: !!username && username.trim().length > 0,
    meta: {
      persist: true,
    },
  });
};

