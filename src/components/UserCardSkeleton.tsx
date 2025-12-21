import { Skeleton } from "./Skeleton";

export const UserCardSkeleton = () => {
  return (
    <div className="user-card">
      <div className="user-card__header">
        <Skeleton width="80px" height="80px" className="skeleton--circle" />
        <div className="user-card__info" style={{ flex: 1 }}>
          <Skeleton width="200px" height="24px" className="skeleton--mb-small" />
          <Skeleton width="150px" height="18px" className="skeleton--mb-small" />
          <Skeleton width="100%" height="16px" className="skeleton--mb-small" />
          <Skeleton width="80px" height="16px" />
        </div>
      </div>
      <div className="user-card__stats">
        <div className="user-card__stat">
          <Skeleton width="80px" height="16px" className="skeleton--mb-xs" />
          <Skeleton width="40px" height="20px" />
        </div>
        <div className="user-card__stat">
          <Skeleton width="80px" height="16px" className="skeleton--mb-xs" />
          <Skeleton width="40px" height="20px" />
        </div>
        <div className="user-card__stat">
          <Skeleton width="80px" height="16px" className="skeleton--mb-xs" />
          <Skeleton width="40px" height="20px" />
        </div>
      </div>
    </div>
  );
};

