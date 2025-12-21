import { Skeleton } from "./Skeleton";

export const RepositoryDetailsSkeleton = () => {
  return (
    <div className="repository-details">
      <div className="repository-details__header">
        <Skeleton width="300px" height="32px" />
        <Skeleton width="80px" height="24px" />
      </div>
      <Skeleton width="100%" height="20px" className="skeleton--mb" />
      <Skeleton width="80%" height="20px" className="skeleton--mb" />
      <div className="repository-details__stats">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="repository-details__stat">
            <Skeleton width="100px" height="16px" className="skeleton--mb-xs" />
            <Skeleton width="60px" height="24px" />
          </div>
        ))}
      </div>
      <Skeleton width="150px" height="40px" className="skeleton--mb" />
      <Skeleton width="150px" height="40px" />
    </div>
  );
};

