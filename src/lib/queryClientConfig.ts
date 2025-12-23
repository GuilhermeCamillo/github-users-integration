import { QueryClient } from "@tanstack/react-query";

const CACHE_VERSION = "v1";
const STALE_TIME = 5 * 60 * 1000;
const CACHE_TIME = 24 * 60 * 60 * 1000;

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      gcTime: CACHE_TIME,
      retry: (failureCount: number, error: unknown) => {
        if (error && typeof error === "object" && "status" in error) {
          if (error.status === 404) {
            return false;
          }
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
};

export const createQueryClient = (): QueryClient => {
  return new QueryClient(queryClientConfig);
};

export { CACHE_VERSION, STALE_TIME, CACHE_TIME };
