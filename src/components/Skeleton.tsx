interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export const Skeleton = ({ width, height, className = "" }: SkeletonProps) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
};

