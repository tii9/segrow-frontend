"use client";

import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";

import { idrFormat } from "~/lib/idr-format";

import LoadingComponent from "~/components/LoadingComponent";
import TopNavbar from "~/components/navbar/TopNavbar";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

import { useGetCarts } from "~/features/cart/api/getCarts";
import CartItem from "~/features/cart/components/CartItem";

const CartPage = () => {
  const { data: cartItems, isLoading } = useGetCarts({
    queryConfig: {},
  });

  if (isLoading) return <LoadingComponent />;

  if (cartItems?.items.length === 0)
    return (
      <div>
        <TopNavbar header="Keranjang" />
        <div className="flex min-h-[calc(100dvh-150px)] flex-col items-center justify-center gap-4 p-4">
          <div className="bg-primary/10 text-primary inline-flex h-16 w-16 items-center justify-center rounded-2xl">
            <ShoppingBagIcon className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-bold">Keranjangmu masih kosong</h2>
          <p className="text-center text-[14px]">
            Yuk, tambahkan meal kit favoritmu dan mulai memasak hidangan sehat
            di rumah.
          </p>
          <Button className="px-4 py-5">
            <Link href={"/products"}>Mulai Belanja</Link>
          </Button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen pb-20">
      <TopNavbar header="Keranjang" />

      <div className="px-4 py-4">
        {/* product cart list */}
        <div className="space-y-4">
          {cartItems?.items.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>

        {/* cart summary */}
        <div className="mt-6 space-y-2.5 rounded-md border bg-white p-4">
          <p className="flex items-center justify-between text-sm">
            Subtotal <span>{idrFormat(cartItems?.totalPrice ?? 0)}</span>
          </p>
          <Separator />
          <p className="flex items-center justify-between font-semibold">
            Total
            <span className="text-primary">
              {idrFormat(cartItems?.totalPrice ?? 0)}
            </span>
          </p>
        </div>

        <Button className="mt-6 flex w-full px-4 py-5">
          <Link href={"/cart/checkout"}>Lanjutkan Pembayaran</Link>
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
