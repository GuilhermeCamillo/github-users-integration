import { useState, useEffect } from "react";
import { RepositoryCard } from "./RepositoryCard";
import { SortFilter } from "./SortFilter";
import { Pagination } from "./Pagination";
import type { GitHubRepository, SortOption, SortDirection } from "../types/github";
import type { PaginationInfo } from "../types/github";

interface RepositoryListProps {
  repositories: GitHubRepository[];
  pagination: PaginationInfo | null;
  owner: string;
  onPageChange: (page: number) => void;
  onSortChange: (sort: SortOption, direction: SortDirection) => void;
  currentSort: SortOption;
  currentDirection: SortDirection;
}

export const RepositoryList = ({
  repositories,
  pagination,
  owner,
  onPageChange,
  onSortChange,
  currentSort,
  currentDirection,
}: RepositoryListProps) => {
  const [sort, setSort] = useState<SortOption>(currentSort);
  const [direction, setDirection] = useState<SortDirection>(currentDirection);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pagination?.page]);

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
    onSortChange(newSort, direction);
  };

  const handleDirectionChange = (newDirection: SortDirection) => {
    setDirection(newDirection);
    onSortChange(sort, newDirection);
  };

  if (repositories.length === 0) {
    return (
      <div className="repository-list repository-list--empty">
        <p>Nenhum repositório encontrado.</p>
      </div>
    );
  }

  return (
    <div className="repository-list">
      <SortFilter
        sort={sort}
        direction={direction}
        onSortChange={handleSortChange}
        onDirectionChange={handleDirectionChange}
      />
      <div className="repository-list__grid">
        {repositories.map((repo) => (
          <RepositoryCard key={repo.id} repository={repo} owner={owner} />
        ))}
      </div>
      {pagination && (
        <Pagination pagination={pagination} onPageChange={onPageChange} />
      )}
    </div>
  );
};

