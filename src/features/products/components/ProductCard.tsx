"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { ProductResponse } from "../api/getProducts";
import { idrFormat } from "~/lib/idr-format";
import AddToCartButton from "~/features/cart/shared/AddToCartButton";

type Product = ProductResponse["data"][number];

const ProductCard = (product: Product) => {
  return (
    <Card className="gap-0">
      <Link href={`/product/${product.slug}`}>
        <CardContent>
          <div className="relative flex flex-col">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={150}
                height={150}
                priority
                className="size-48 rounded-md object-cover"
              />
            ) : (
              <Skeleton className="size-48 max-w-full" />
            )}

            <div className="mt-3 flex flex-1 flex-col gap-1">
              <p className="line-clamp-2 min-h-10 text-sm font-medium">
                {product.name}
              </p>

              <div className="mt-auto">
                <p className="text-base font-medium text-black">
                  {idrFormat(product.price)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="border-none bg-white pt-0">
        <AddToCartButton productId={product.id} disabled={product.stock <= 0} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
