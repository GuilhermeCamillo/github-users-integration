import { useGitHubUser } from "./useGitHubUser";
import { useGitHubRepositoriesPaginated } from "./useGitHubRepositoriesPaginated";

interface UseUserSearchParams {
  username: string;
  sort?: "stars" | "updated" | "created" | "name";
  direction?: "asc" | "desc";
  page?: number;
  perPage?: number;
}

export const useUserSearch = ({
  username,
  sort = "updated",
  direction = "desc",
  page = 1,
  perPage = 12,
}: UseUserSearchParams) => {
  const userQuery = useGitHubUser(username);
  const reposQuery = useGitHubRepositoriesPaginated({
    username,
    sort,
    direction,
    page,
    perPage,
  });

  return {
    user: userQuery,
    repositories: reposQuery,
    isLoading: userQuery.isLoading || reposQuery.isLoading,
    isFetching: userQuery.isFetching || reposQuery.isFetching,
    error: userQuery.error || reposQuery.error,
  };
};

