import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { createQueryClient, CACHE_VERSION } from "./queryClientConfig";
import type { ReactNode } from "react";

const queryClient = createQueryClient();

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
  key: `GITHUB_USERS_CACHE_${CACHE_VERSION}`,
});

interface QueryClientProviderProps {
  children: ReactNode;
}

export const QueryClientProviderWrapper = ({
  children,
}: QueryClientProviderProps) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 24 * 60 * 60 * 1000,
        buster: CACHE_VERSION,
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
};
