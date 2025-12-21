import { RepositoryCardSkeleton } from "./RepositoryCardSkeleton";
import { Skeleton } from "./Skeleton";

export const RepositoryListSkeleton = () => {
  return (
    <div className="repository-list">
      <div className="sort-filter">
        <Skeleton width="150px" height="40px" />
        <Skeleton width="150px" height="40px" />
      </div>
      <div className="repository-list__grid">
        {Array.from({ length: 12 }).map((_, index) => (
          <RepositoryCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

