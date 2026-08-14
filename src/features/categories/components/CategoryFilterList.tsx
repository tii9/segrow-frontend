"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Skeleton } from "~/components/ui/skeleton";
import { useGetCategories } from "~/features/categories/api/getCategories";
import { cn } from "~/lib/utils";

const CategoryFilterList = () => {
  const { data: categories, isLoading: fetchCategoriesLoading } =
    useGetCategories();

  if (fetchCategoriesLoading) return <CategoryFilterSkeleton />;

  return (
    <ScrollArea>
      <div className="flex gap-2 pb-4">
        <CategoryFilterItem name="Semua" />
        {categories?.map((category) => (
          <CategoryFilterItem key={category.id} name={category.name} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

const CategoryFilterItem = ({ name }: { name: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryFilter = searchParams.get("category") || "";

  const currentCategory = (categoryFilter ?? "").toLowerCase();

  const isActive =
    currentCategory === ""
      ? name === "Semua"
      : name.toLowerCase() === currentCategory;

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (name === "Semua") {
      params.delete("category");
    } else {
      params.set("category", name.toLowerCase());
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className={cn(
        "shrink-0 basis-20 cursor-pointer rounded-full border bg-white px-2.5 py-1 text-center text-sm font-medium transition-colors",
        isActive && "bg-primary text-white",
      )}
      onClick={handleClick}
    >
      {name}
    </div>
  );
};

const CategoryFilterSkeleton = () => {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="h-7.5 w-20 rounded-full" />
      ))}
    </div>
  );
};

export default CategoryFilterList;
