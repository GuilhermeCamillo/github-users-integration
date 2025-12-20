import { useQuery } from "@tanstack/react-query";
import { fetchUserRepositories } from "../services/githubApi";
import type { GitHubRepository, SortOption, SortDirection } from "../types/github";

interface UseGitHubRepositoriesParams {
  username: string;
  sort?: SortOption;
  direction?: SortDirection;
}

export const useGitHubRepositories = ({
  username,
  sort = "updated",
  direction = "desc",
}: UseGitHubRepositoriesParams) => {
  return useQuery<GitHubRepository[], Error>({
    queryKey: ["githubRepositories", username, sort, direction],
    queryFn: () => fetchUserRepositories(username, sort, direction),
    enabled: !!username && username.trim().length > 0,
    meta: {
      persist: true,
    },
  });
};

