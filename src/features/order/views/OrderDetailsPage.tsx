"use client";

import { CircleIcon } from "lucide-react";
import Image from "next/image";

import { orderStatusStyles } from "~/constants/orderStatusStyle";

import TopNavbar from "~/components/navbar/TopNavbar";
import { Separator } from "~/components/ui/separator";

import { formatOrderStatus } from "~/lib/format-order-status";
import { idrFormat } from "~/lib/idr-format";
import { cn } from "~/lib/utils";

import { useGetOrderById } from "~/features/order/api/getOrderById";

const datePart = (date: Date) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

const timePart = (date: Date) =>
  new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  }).format(date);

const formatDate = (date?: Date | string | null) => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "-";

  const dateP = datePart(parsedDate);

  const timeP = timePart(parsedDate);

  return `${dateP}, ${timeP} WIB`;
};

const statusColor = {
  PENDING_PAYMENT: "text-yellow-500",
  PAID: "text-green-500",
  PROCESSING: "text-blue-500",
  SHIPPED: "text-blue-500",
  DELIVERED: "text-green-500",
  COMPLETED: "text-green-500",
  CANCELLED: "text-red-500",
  REFUNDED: "text-purple-500",
};

type OrderDetailPageProps = {
  id: string;
};

const OrderDetailPage = ({ id }: OrderDetailPageProps) => {
  const { data: order } = useGetOrderById({ id });

  return (
    <div className="min-h-screen">
      <TopNavbar header="Detail Pesanan" />

      {/* Order detail */}
      <section className="bg-white p-4">
        <h5
          className={cn(
            "w-fit rounded px-2 py-1 text-xs font-semibold",
            orderStatusStyles[order?.status as keyof typeof orderStatusStyles],
          )}
        >
          {formatOrderStatus(order?.status ?? "")}
        </h5>
        <Separator className="my-4" />
        <div className="space-y-3 text-xs">
          <p>No Pesanan: {order?.orderNumber}</p>
          <p className="flex items-center justify-between">
            Tanggal Pemesanan <span>{formatDate(order?.createdAt)}</span>
          </p>
        </div>
      </section>

      {/* Product detail */}
      <section className="mt-4 bg-white p-4">
        <h5 className="text-sm font-bold">Detail Produk</h5>
        <div className="mt-2 space-y-4">
          {order?.items?.map((item) => (
            <div key={item.id} className="flex gap-4">
              <Image
                src={item.productImage}
                alt={item.productName}
                height={100}
                width={100}
                className="size-14 rounded-md border-[0.5px]"
              />
              <div className="text-sm">
                <p className="line-clamp-2 font-semibold">{item.productName}</p>
                <p>
                  {item.quantity} <span>x</span> {idrFormat(item.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Order status */}
      <section className="mt-4 bg-white p-4">
        <h5 className="text-sm font-bold">Status Pesanan</h5>
        <div className="mt-2 space-y-4">
          {order?.histories.map((history, index) => (
            <div key={history.id} className="flex items-stretch gap-4">
              <div className="mt-1 flex flex-col items-center">
                <CircleIcon
                  size={16}
                  fill="currentColor"
                  className={
                    index === 0 ? statusColor[history.status] : "text-slate-300"
                  }
                />

                {index !== order.histories.length - 1 && (
                  <div className="mt-1 w-px flex-1 bg-slate-300" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h5
                    className={cn(
                      "text-sm font-semibold",
                      index === 0 ? statusColor[history.status] : "text-black",
                    )}
                  >
                    {datePart(new Date(history.createdAt))}
                  </h5>

                  <p className="text-muted-foreground shrink-0 text-xs">
                    {timePart(new Date(history.createdAt))} WIB
                  </p>
                </div>

                <p className="text-muted-foreground mt-0.5 text-xs">
                  {history.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Payment detail */}
      <section className="mt-4 bg-white p-4">
        <h5 className="text-sm font-bold">Detail Pembayaran</h5>
        <div className="mt-3 space-y-3 text-xs font-medium">
          <p className="flex items-center justify-between">
            Metode pembayaran <span>{order?.payment.paymentMethod}</span>
          </p>
          <Separator />
          <p className="flex items-center justify-between">
            Subtotal produk <span>{idrFormat(order?.subtotal || 0)}</span>
          </p>
          <p className="flex items-center justify-between">
            Ongkos kirim <span>{idrFormat(order?.shippingCost || 0)}</span>
          </p>
          <Separator />
          <p className="flex items-center justify-between text-sm font-bold">
            Total belanja <span>{idrFormat(order?.total || 0)}</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default OrderDetailPage;
