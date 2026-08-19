"use client";

import { ChefHatIcon, ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";

import { orderStatusStyles } from "~/constants/orderStatusStyle";

import { indonesiaDateFormat } from "~/lib/date-format";
import { formatOrderStatus } from "~/lib/format-order-status";
import { idrFormat } from "~/lib/idr-format";
import { cn } from "~/lib/utils";

import { useGetOrders } from "~/features/order/api/getOrdersByUser";

const OrderListSection = () => {
  const { data: userOrders, isLoading: userOrdersLoading } = useGetOrders();

  return (
    <div className="flex flex-col gap-4">
      {userOrdersLoading ? (
        <OrderCardSkeleton />
      ) : userOrders?.orders.length === 0 ? (
        <EmptyOrder />
      ) : (
        <>
          {userOrders?.orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-4 rounded-xl border p-3 shadow"
            >
              {/* top */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold">{order.orderNumber}</p>
                  <span className="text-xs">
                    {indonesiaDateFormat(order.createdAt)}
                  </span>
                </div>
                <p
                  className={cn(
                    "w-fit rounded px-2 py-1 text-xs font-semibold",
                    orderStatusStyles[
                      order.status as keyof typeof orderStatusStyles
                    ],
                  )}
                >
                  {formatOrderStatus(order.status)}
                </p>
              </div>

              {/* products */}
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      width={100}
                      height={100}
                      className="size-16 rounded-md object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold">
                        {item.productName}
                      </p>
                      <p className="text-xs">
                        {item.quantity} Paket <span className="mx-1">x</span>{" "}
                        {idrFormat(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* bottom */}
              <div className="flex items-end-safe justify-between">
                <div>
                  <p className="text-xs">Total belanja</p>
                  <p className="text-sm font-semibold">
                    {idrFormat(order.total)}
                  </p>
                </div>
                <Link href={`/account/order-details/${order.id}`}>
                  <Button size={"sm"}>Lihat detail</Button>
                </Link>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

const EmptyOrder = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="bg-muted flex size-20 items-center justify-center rounded-full">
        <ShoppingBagIcon className="text-muted-foreground size-9" />
      </div>
      <h2 className="text-foreground mt-6 text-lg font-semibold">
        Belum ada pesanan
      </h2>
      <p className="text-muted-foreground mt-2 text-sm">
        Temukan menu favoritmu dan mulai pesan sekarang!
      </p>
      <Button className="mt-6 h-10 px-4">
        <Link
          href="/products"
          // className="bg-primary text-primary-foreground hover:bg-primary/90 mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-medium transition-colors"
        >
          <ChefHatIcon className="size-4" />
          Explore produk
        </Link>
      </Button>
    </div>
  );
};

const OrderCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="h-22 w-full" />
      ))}
    </div>
  );
};

export default OrderListSection;
