import { BouncingDots } from "./ui/bouncing-dots";

const LoadingComponent = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <BouncingDots className="text-primary size-12" />
    </div>
  );
};

export default LoadingComponent;
