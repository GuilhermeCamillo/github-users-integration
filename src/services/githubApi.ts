import axios from "axios";
import type { AxiosResponse } from "axios";
import type {
  GitHubUser,
  GitHubRepository,
  PaginatedResponse,
  SortOption,
  SortDirection,
  PaginationInfo,
} from "../types/github";

const BASE_URL = "https://api.github.com";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || "";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/vnd.github.v3+json",
    ...(GITHUB_TOKEN && { Authorization: `token ${GITHUB_TOKEN}` }),
  },
});

const extractPaginationFromHeaders = (
  headers: AxiosResponse["headers"]
): PaginationInfo | null => {
  const linkHeader = headers.link;
  if (!linkHeader) return null;

  const links = linkHeader.split(",");
  const pagination: Partial<PaginationInfo> = {};

  links.forEach((link: string) => {
    const [url, rel] = link.split(";");
    const cleanUrl = url.trim().slice(1, -1);
    const cleanRel = rel.trim().replace(/rel="(.+)"/, "$1");

    if (cleanRel === "last") {
      const match = cleanUrl.match(/[?&]page=(\d+)/);
      if (match) {
        pagination.totalPages = parseInt(match[1], 10);
      }
    }
  });

  const perPageMatch = linkHeader.match(/[?&]per_page=(\d+)/);
  if (perPageMatch) {
    pagination.perPage = parseInt(perPageMatch[1], 10);
  }

  if (pagination.totalPages && pagination.perPage) {
    pagination.total = pagination.totalPages * pagination.perPage;
  }

  return pagination as PaginationInfo;
};

export const fetchGitHubUser = async (
  username: string
): Promise<GitHubUser> => {
  const response = await api.get<GitHubUser>(`/users/${username}`);
  return response.data;
};

export const fetchUserRepositories = async (
  username: string,
  sort: SortOption = "updated",
  direction: SortDirection = "desc"
): Promise<GitHubRepository[]> => {
  const response = await api.get<GitHubRepository[]>(
    `/users/${username}/repos`,
    {
      params: {
        sort,
        direction,
        per_page: 100,
      },
    }
  );
  return response.data;
};

export const fetchUserRepositoriesPaginated = async (
  username: string,
  sort: SortOption = "updated",
  direction: SortDirection = "desc",
  page: number = 1,
  perPage: number = 12
): Promise<PaginatedResponse<GitHubRepository>> => {
  const response = await api.get<GitHubRepository[]>(
    `/users/${username}/repos`,
    {
      params: {
        sort,
        direction,
        page,
        per_page: perPage,
      },
    }
  );

  const extractedPagination = extractPaginationFromHeaders(response.headers);
  const linkHeader = response.headers.link;

  let calculatedTotalPages = extractedPagination?.totalPages;

  if (!calculatedTotalPages && linkHeader) {
    const hasNext = linkHeader.includes('rel="next"');
    const hasLast = linkHeader.includes('rel="last"');

    if (hasLast) {
      const lastMatch = linkHeader.match(
        /<[^>]*[?&]page=(\d+)[^>]*>;\s*rel="last"/
      );
      if (lastMatch) {
        calculatedTotalPages = parseInt(lastMatch[1], 10);
      }
    } else if (!hasNext) {
      calculatedTotalPages = page;
    } else {
      calculatedTotalPages = page + 1;
    }
  } else if (!calculatedTotalPages) {
    if (response.data.length < perPage) {
      calculatedTotalPages = page;
    } else {
      calculatedTotalPages = Math.max(page, 1);
    }
  }

  const finalTotalPages = Math.max(calculatedTotalPages || page, page);

  const pagination: PaginationInfo = {
    page,
    perPage: extractedPagination?.perPage || perPage,
    total: extractedPagination?.total || finalTotalPages * perPage,
    totalPages: finalTotalPages,
    hasNext: false,
    hasPrev: false,
  };

  pagination.hasNext = page < pagination.totalPages;
  pagination.hasPrev = page > 1;

  return {
    data: response.data,
    pagination,
  };
};

export const fetchRepository = async (
  owner: string,
  repo: string
): Promise<GitHubRepository> => {
  const response = await api.get<GitHubRepository>(`/repos/${owner}/${repo}`);
  return response.data;
};

export const validateGitHubUsername = (username: string): boolean => {
  if (!username || username.trim().length === 0) return false;
  if (username.length > 39) return false;
  const githubUsernameRegex = /^[a-zA-Z0-9]([a-zA-Z0-9]|-(?![.-])){0,38}$/;
  return githubUsernameRegex.test(username);
};
