import { Dispatch, useState } from "react";
import { ChevronRightIcon } from "lucide-react";

import { cn } from "~/lib/utils";
import { capitalizeWords } from "~/lib/capitalize-word";

import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";

import { AddressResponse } from "~/features/profile/api/getAddresses";

type UserSelectAddressDrawer = {
  addresses: AddressResponse[] | undefined;
  userSelectedAddress: AddressResponse | undefined;
  setUserSelectedAddress: Dispatch<
    React.SetStateAction<AddressResponse | undefined>
  >;
};

const UserSelectAddressDrawer = ({
  addresses,
  userSelectedAddress,
  setUserSelectedAddress,
}: UserSelectAddressDrawer) => {
  const [open, setOpen] = useState(false);
  const [addressList, setAddressList] = useState<AddressResponse[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<
    AddressResponse | undefined
  >(userSelectedAddress);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);

    if (!open) {
      setSelectedAddress(userSelectedAddress);
    } else {
      const initialList = selectedAddress
        ? [
            selectedAddress,
            ...(addresses?.filter((a) => a.id !== selectedAddress?.id) ?? []),
          ]
        : (addresses ?? []);
      setAddressList(initialList);
    }
  };

  const handleUserSelectedAddress = () => {
    if (selectedAddress) {
      setUserSelectedAddress(selectedAddress);
    }
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerTrigger>
        <ChevronRightIcon />
      </DrawerTrigger>
      <DrawerContent className="max-w-md mx-auto ">
        <DrawerHeader>
          <DrawerTitle>Mau Kirim Ke Mana?</DrawerTitle>
          <DrawerDescription>
            Pilih alamat tujuan pengiriman kamu.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-4 space-y-4 overflow-y-scroll no-scrollbar">
          {addressList?.map((address) => (
            <div
              key={address?.id}
              className={cn(
                "p-4 rounded-md border transition-colors",
                address?.id === selectedAddress?.id &&
                  "bg-primary/20 border-primary",
              )}
              onClick={() => setSelectedAddress(address)}
            >
              <div className="flex items-center gap-1">
                <p className="font-bold text-xs">{address?.detail}</p>
                {address?.isDefault && (
                  <span className="text-[10px] py-0.5 px-1 bg-slate-200 rounded">
                    Utama
                  </span>
                )}
              </div>
              <p className="font-bold text-sm mb-1">{address?.recipient}</p>
              <p className="text-xs text-muted-foreground mb-1">
                {address?.phone}
              </p>
              <p className="text-xs text-muted-foreground mb-2">
                {[
                  capitalizeWords(address?.street || ""),
                  capitalizeWords(address?.district || ""),
                  capitalizeWords(address?.city || ""),
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
              <p className="text-xs text-muted-foreground">{address?.notes}</p>
            </div>
          ))}
        </div>

        <DrawerFooter>
          <Button onClick={handleUserSelectedAddress}>Pilih Alamat</Button>
          <DrawerClose render={<Button variant="secondary" />}>
            Tutup
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default UserSelectAddressDrawer;
