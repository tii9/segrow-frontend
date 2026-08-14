import { CategoryResponse } from "../api/getCategories";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "~/components/ui/skeleton";

const CategoryItem = (category: CategoryResponse) => {
  return (
    <Link
      href={`/products?category=${category.name.toLowerCase()}`}
      className="flex shrink-0 flex-col items-center gap-1"
    >
      {category.imageUrl ? (
        <Image
          src={category.imageUrl}
          alt={category.name}
          width={150}
          height={150}
          className="size-14 rounded-full border object-cover"
        />
      ) : (
        <Skeleton className="size-14 rounded-full" />
      )}

      <p className="text-sm font-medium">{category.name}</p>
    </Link>
  );
};

export default CategoryItem;
