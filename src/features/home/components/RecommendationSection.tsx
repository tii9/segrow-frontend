"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "~/components/ui/skeleton";
import { useGetProducts } from "~/features/products/api/getProducts";
import ProductCard from "~/features/products/components/ProductCard";

const RecommendationSection = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetProducts({ take: 6 });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const products = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="mt-8">
      <div className="flex items-end justify-between">
        <h2 className="text-lg font-semibold">Rekomendasi</h2>
        <Link
          href={"/products"}
          className="text-primary text-sm font-semibold hover:underline"
        >
          Lihat semua
        </Link>
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

export default RecommendationSection;
