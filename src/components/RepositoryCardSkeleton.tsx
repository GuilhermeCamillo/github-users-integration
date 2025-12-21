import { Skeleton } from "./Skeleton";

export const RepositoryCardSkeleton = () => {
  return (
    <div className="repository-card">
      <div className="repository-card__header">
        <Skeleton width="200px" height="20px" />
        <Skeleton width="60px" height="20px" />
      </div>
      <Skeleton width="100%" height="16px" className="skeleton--mb-small" />
      <Skeleton width="80%" height="16px" className="skeleton--mb" />
      <div className="repository-card__stats">
        <Skeleton width="50px" height="16px" />
        <Skeleton width="50px" height="16px" />
        <Skeleton width="50px" height="16px" />
      </div>
    </div>
  );
};

