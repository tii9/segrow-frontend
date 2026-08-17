import { BanknoteIcon, PackageCheckIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui/drawer";

type OrderConfirmationDrawerProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const OrderConfirmationDrawer = ({
  isOpen,
  setIsOpen,
}: OrderConfirmationDrawerProps) => {
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
          <DrawerTitle className="flex items-start justify-between text-left"></DrawerTitle>
          <DrawerDescription className="text-left"></DrawerDescription>
        </DrawerHeader>

        <div className="mb-4 flex flex-col justify-between px-4">
          <section className="flex flex-1 flex-col items-center justify-center py-12 text-center">
            <div className="bg-primary/10 text-primary mb-5 inline-flex h-20 w-20 items-center justify-center rounded-full">
              <PackageCheckIcon className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              Pesanan dibuat
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xs text-sm">
              Pesananmu telah dikonfirmasi. Silakan siapkan uang tunai untuk
              kurir saat meal kit-mu tiba.
            </p>
          </section>

          <section>
            <div className="bg-muted/60 text-muted-foreground mt-3 flex w-full items-start gap-2 rounded-xl p-3 text-left text-xs">
              <BanknoteIcon className="text-primary mt-0.5 h-3.5 w-3.5 shrink-0" />
              Harap siapkan uang tunai pas. Kurir mungkin tidak membawa uang
              kembalian untuk pecahan uang yang besar.
            </div>

            <Button className="mt-3 flex w-full py-5">
              <Link href="/">Kembali ke beranda</Link>
            </Button>
          </section>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default OrderConfirmationDrawer;
