"use client";

import { ArrowLeftIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

type TopNavbarProps = {
  header?: string;
  className?: string;
  children?: React.ReactNode;
};

const TopNavbar = ({
  header = "",
  className = "",
  children,
}: TopNavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const current = sessionStorage.getItem("currentPath");

    if (current && current !== pathname) {
      sessionStorage.setItem("previousPath", current);
    }

    sessionStorage.setItem("currentPath", pathname);
  }, [pathname]);

  const handleBack = () => {
    const previousPath = sessionStorage.getItem("previousPath");

    if (previousPath) {
      router.back();
    } else {
      router.replace("/products");
    }
  };

  return (
    <div
      className={`sticky top-0 z-999 container bg-white/99 p-4 shadow ${className}`}
    >
      <div className="flex items-center justify-start gap-4">
        <button onClick={handleBack} className="cursor-pointer">
          <ArrowLeftIcon className="size-6" />
        </button>
        <h2 className="text-base font-medium">{header}</h2>
      </div>
      {children}
    </div>
  );
};

export default TopNavbar;
