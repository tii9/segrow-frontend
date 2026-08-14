"use client";

import { Skeleton } from "~/components/ui/skeleton";
import { useGetCategories } from "~/features/categories/api/getCategories";
import CategoryItem from "~/features/categories/components/CategoryItem";

const CategorySection = () => {
  const { data: categories, isLoading } = useGetCategories();

  return (
    <div className="mt-8">
      <div className="flex items-end justify-between">
        <h2 className="text-lg font-semibold">Kategori</h2>
      </div>
      <div className="no-scrollbar mt-4 flex gap-6 overflow-x-auto">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="size-14 rounded-full" />
            ))
          : categories?.map((item, index) => (
              <CategoryItem key={index} {...item} />
            ))}
      </div>
    </div>
  );
};

export default CategorySection;
