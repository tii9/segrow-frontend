"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useGetProducts } from "../api/getProducts";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { Skeleton } from "~/components/ui/skeleton";

const sortOptions = [
  { value: "populer", label: "Populer" },
  { value: "price_asc", label: "Termurah" },
  { value: "fastest", label: "Tercepat" },
];

const ProductsList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? undefined;
  const sort = searchParams.get("sort") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetProducts({ take: 6, category, sort, search });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const products = data?.pages.flatMap((page) => page.data) ?? [];

  const handleSortChange = (value: string | null) => {
    if (!value) return;

    const params = new URLSearchParams(searchParams);

    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-2">
        <span>{data?.pages[0].totalProducts || "0"} produk</span>

        <Select
          value={searchParams.get("sort") ?? "populer"}
          onValueChange={handleSortChange}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Populer">
              {(value) =>
                sortOptions.find((item) => item.value === value)?.label ??
                "Populer"
              }
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {sortOptions.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className="capitalize"
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {!isLoading && products?.length === 0 && (
          <div className="col-span-2 flex items-center justify-center">
            <p className="text-muted-foreground">Belum ada produk</p>
          </div>
        )}

        {!isLoading &&
          products?.length > 0 &&
          products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}

        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square h-56 w-full" />
          ))}

        {isFetchingNextPage &&
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square h-56 w-full" />
          ))}

        <div ref={ref} />
      </div>
    </div>
  );
};

export default ProductsList;
