"use client";

import { MapPinIcon } from "lucide-react";
import Link from "next/link";
import { Dispatch } from "react";

import { capitalizeWords } from "~/lib/capitalize-word";

import { Skeleton } from "~/components/ui/skeleton";
import { Button } from "~/components/ui/button";

import { AddressResponse } from "~/features/profile/api/getAddresses";
import UserSelectAddressDrawer from "~/features/profile/shared/address/UserSelectAddressDrawer";

type ShippingAddressSectionProps = {
  addresses: AddressResponse[] | undefined;
  isLoadingAddresses: boolean;
  selectedAddress: AddressResponse | undefined;
  setUserSelectedAddress: Dispatch<
    React.SetStateAction<AddressResponse | undefined>
  >;
};

const ShippingAddressSection = ({
  addresses,
  isLoadingAddresses,
  selectedAddress,
  setUserSelectedAddress,
}: ShippingAddressSectionProps) => {
  return (
    <div className="pt-4 pb-4 bg-white px-4">
      <h2 className="font-semibold">Alamat pengiriman</h2>
      {isLoadingAddresses ? (
        <AddressCardSkeleton />
      ) : !addresses || addresses.length === 0 ? (
        <NewAddressCard />
      ) : (
        <div className="border rounded-xl mt-2 p-2.5 flex justify-between items-center">
          <div className="flex gap-4 items-center justify-start">
            <div className="bg-primary/10 text-primary inline-flex size-10 items-center justify-center rounded-md">
              <MapPinIcon className="size-4" />
            </div>
            <div className="flex-col gap-4 justify-between items-start">
              <p className="flex items-center gap-1 text-sm font-semibold">
                <span>{selectedAddress?.detail}</span>
                <span className="text-muted-foreground text-xs">•</span>
                <span>{selectedAddress?.recipient}</span>
              </p>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {[
                  capitalizeWords(selectedAddress?.street || ""),
                  capitalizeWords(selectedAddress?.district || ""),
                  capitalizeWords(selectedAddress?.city || ""),
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
          </div>

          <UserSelectAddressDrawer
            addresses={addresses}
            userSelectedAddress={selectedAddress}
            setUserSelectedAddress={setUserSelectedAddress}
          />
        </div>
      )}
    </div>
  );
};

const NewAddressCard = () => {
  return (
    <div className="border rounded-xl mt-2 p-2.5 flex justify-between items-center">
      <p className="text-muted-foreground font-semibold text-sm text-center">
        Belum ada alamat pengiriman
      </p>
      <Link href="/account/address/new">
        <Button className="w-fit">Tambah Alamat</Button>
      </Link>
    </div>
  );
};

const AddressCardSkeleton = () => {
  return <Skeleton className="w-full h-15 rounded-xl mt-2" />;
};

export default ShippingAddressSection;
