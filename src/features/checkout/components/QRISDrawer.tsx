import {
  CheckCircle2Icon,
  LoaderCircleIcon,
  SmartphoneIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { idrFormat } from "~/lib/idr-format";

import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui/drawer";

import { CreateOrderResponse } from "~/features/checkout/api/createOrder";
import { useGetOrderById } from "~/features/order/api/getOrderById";
import QRISExpiryCountdown from "~/features/checkout/components/QRISExpiryCountdown";

type QRISDrawerProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: CreateOrderResponse["data"] | undefined;
};

const QRISDrawer = ({ isOpen = false, setIsOpen, data }: QRISDrawerProps) => {
  const { data: order, isLoading } = useGetOrderById({
    id: data?.id || "",
    queryConfig: {
      refetchInterval: (query) => {
        const status = query.state.data?.status;

        const finishedStatuses = [
          "PAID",
          "PROCESSING",
          "SHIPPED",
          "DELIVERED",
          "COMPLETED",
          "CANCELLED",
          "REFUNDED",
        ];

        return finishedStatuses.includes(status ?? "") ? false : 1000;
      },
    },
  });

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(nextOpen) => {
        if (nextOpen) {
          setIsOpen(true);
        }
      }}
    >
      <DrawerContent className="mx-auto w-full max-w-md">
        <DrawerHeader>
          <DrawerTitle className="flex items-start justify-between text-left">
            Bayar dengan QRIS
            {order?.status === "PENDING_PAYMENT" && (
              <QRISExpiryCountdown expiryTime={data?.payment.expiryTime} />
            )}
          </DrawerTitle>
          <DrawerDescription className="text-left">
            {order?.status === "PENDING_PAYMENT"
              ? "Pindai kode ini menggunakan GoPay, OVO, DANA, ShopeePay, atau aplikasi mobile banking apa pun."
              : "Pembayaranmu telah selesai."}
          </DrawerDescription>
        </DrawerHeader>

        {/* content */}
        <div className="px-4 pb-4">
          {isLoading ? (
            <div className="flex animate-spin items-center justify-center">
              <LoaderCircleIcon />
            </div>
          ) : order?.status === "PENDING_PAYMENT" ? (
            data?.payment.qrUrl && (
              <Image
                src={data.payment.qrUrl}
                alt="QRIS"
                width={200}
                height={200}
                className="mx-auto"
              />
            )
          ) : (
            <section className="flex flex-1 flex-col items-center justify-center py-12 text-center">
              <div className="bg-primary/10 text-primary mb-5 inline-flex h-20 w-20 items-center justify-center rounded-full">
                <CheckCircle2Icon className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">
                Pembayaran Berhasil
              </h2>
              <p className="text-muted-foreground mt-2 max-w-xs text-sm">
                Terima kasih atas pesananmu! Paket segarmu sedang disiapkan dan
                akan segera tiba.
              </p>
            </section>
          )}

          <div className="border-border bg-card mt-4 w-full space-y-2 rounded-2xl border p-4">
            <p className="text-muted-foreground flex items-center justify-between">
              Merchant <span className="font-medium text-black">Segrow</span>
            </p>
            <p className="text-muted-foreground flex items-center justify-between">
              NMID <span className="font-medium text-black">M436190952</span>
            </p>
            <p className="text-muted-foreground flex items-center justify-between">
              Total{" "}
              <span className="font-medium text-black">
                {idrFormat(data?.total ?? 0)}
              </span>
            </p>
          </div>

          <div className="bg-muted/60 text-muted-foreground mt-4 flex items-start gap-2 rounded-xl p-3 text-left text-xs">
            <SmartphoneIcon className="text-primary mt-0.5 h-3.5 w-3.5 shrink-0" />
            Tetap buka halaman ini. Pesananmu akan otomatis dikonfirmasi setelah
            pembayaran diterima.
          </div>

          {order?.status !== "PENDING_PAYMENT" && (
            <Button className="mt-4 flex py-2 w-full">
              <Link href={"/"}>Kembali ke beranda</Link>
            </Button>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default QRISDrawer;
