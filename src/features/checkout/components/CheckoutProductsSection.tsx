"use client";

import Image from "next/image";

import { idrFormat } from "~/lib/idr-format";

import { Skeleton } from "~/components/ui/skeleton";

type CheckoutProductsSectionProps = {
  cartItems:
    | {
        id?: string | undefined;
        totalItem: number;
        totalPrice: number;
        items: {
          id: string;
          quantity: number;
          product: {
            id: string;
            name: string;
            price: number;
            stock: number;
            cookingTime: number;
            portion: number;
            imageUrl: string | null;
          };
        }[];
      }
    | undefined;
  loadingCartItems: boolean;
};

const CheckoutProductsSection = ({
  cartItems,
  loadingCartItems = false,
}: CheckoutProductsSectionProps) => {
  return (
    <div className="mt-4 space-y-4 bg-white p-4">
      {loadingCartItems
        ? Array.from({ length: 3 }).map((_, index) => (
            <CartItemSkeleton key={index} />
          ))
        : (cartItems?.items ?? []).map((item) => (
            <div key={item.id} className="flex gap-4 rounded-md border p-3.5">
              {item.product.imageUrl && (
                <Image
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  width={100}
                  height={100}
                  priority
                  className="size-16 rounded-md object-cover"
                />
              )}
              <div>
                <p className="text-muted-foreground text-sm font-semibold">
                  {item.product.name}
                </p>
                <p className="text-sm font-semibold">
                  {idrFormat(item.product.price)} x {item.quantity}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};

const CartItemSkeleton = () => {
  return <Skeleton className="h-22 w-full" />;
};

export default CheckoutProductsSection;
