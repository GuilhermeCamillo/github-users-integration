import { useQuery } from "@tanstack/react-query";
import { fetchUserRepositoriesPaginated } from "../services/githubApi";
import type {
  PaginatedResponse,
  GitHubRepository,
  SortOption,
  SortDirection,
} from "../types/github";

interface UseGitHubRepositoriesPaginatedParams {
  username: string;
  sort?: SortOption;
  direction?: SortDirection;
  page?: number;
  perPage?: number;
}

export const useGitHubRepositoriesPaginated = ({
  username,
  sort = "updated",
  direction = "desc",
  page = 1,
  perPage = 12,
}: UseGitHubRepositoriesPaginatedParams) => {
  return useQuery<PaginatedResponse<GitHubRepository>, Error>({
    queryKey: ["githubRepositories", username, sort, direction, page, perPage],
    queryFn: () =>
      fetchUserRepositoriesPaginated(username, sort, direction, page, perPage),
    enabled: !!username && username.trim().length > 0,
    meta: {
      persist: true,
    },
  });
};
