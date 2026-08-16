"use client";

import { AxiosError } from "axios";
import { CheckIcon, HomeIcon, MapPinIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { authClient } from "~/lib/auth-client";
import { ApiErrorResponse } from "~/lib/axios";
import { toast } from "~/components/ui/toast";
import LoadingComponent from "~/components/LoadingComponent";
import { useGetAddressesByUserId } from "~/features/profile/api/getAddresses";
import { useSetDefaultAddress } from "~/features/profile/api/setDefaultAddress";
import { useDeleteAddress } from "~/features/profile/api/deleteAddress";
import DeleteAddressModal from "~/features/profile/components/address/DeleteAddressModal";

const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

const AddressGroup = () => {
  const { data: session, isPending } = authClient.useSession();
  const { data: addresses, isPending: isAddressesPending } =
    useGetAddressesByUserId({ userId: session?.user.id ?? "" });
  const { mutate: handleDeleteAddress, isPending: isDeletePending } =
    useDeleteAddress({
      mutationConfig: {
        onSuccess: () => {
          toast.add({
            type: "success",
            description: "Alamat berhasil dihapus.",
          });
        },
        onError: (error) => {
          const err = error as AxiosError<ApiErrorResponse>;
          toast.add({
            type: "error",
            description: err.response?.data.message,
          });
        },
      },
    });

  const { mutate: handleSetDefaultAddress } = useSetDefaultAddress({
    mutationConfig: {
      onError: (error) => {
        const err = error as AxiosError<ApiErrorResponse>;
        toast.add({
          type: "error",
          description: err.response?.data.message,
        });
      },
    },
  });

  if (isPending || isAddressesPending || isDeletePending) {
    return <LoadingComponent />;
  }

  return (
    <div>
      {addresses?.length === 0 ? (
        <div className="border-border bg-card rounded-2xl border border-dashed p-8 text-center">
          <div className="bg-muted mx-auto mb-3 flex size-14 items-center justify-center rounded-full">
            <MapPinIcon className="text-muted-foreground size-6" />
          </div>
          <p className="text-foreground text-sm font-medium">
            Belum ada alamat yang terdaftar.
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            Tambahkan alamat pengiriman untuk memudahkan proses checkout dan
            pengiriman
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {addresses?.map((address, index) => {
            const Icon = HomeIcon;
            const capitalizedCity = capitalize(address.city);
            const capitalizedDistrict = capitalize(address.district);
            return (
              <li
                key={index}
                className="bg-card border-border rounded-2xl border p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-full">
                    <Icon className="text-primary size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-foreground text-sm font-semibold">
                        {address.detail}
                      </p>
                      {address.isDefault && (
                        <span className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium">
                          <CheckIcon className="size-3" /> Default
                        </span>
                      )}
                    </div>
                    <p className="text-foreground mt-1 truncate text-sm">
                      {address.recipient} · {address.phone}
                    </p>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {address.street}
                      {capitalizedDistrict ? `, ${capitalizedDistrict}` : ""}
                      ,&nbsp;
                      {capitalizedCity}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {!address.isDefault && (
                        <button
                          onClick={() => handleSetDefaultAddress(address.id)}
                          className="bg-primary/10 text-primary hover:bg-primary/15 rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
                        >
                          Set as default
                        </button>
                      )}
                      <button className="border-border text-foreground hover:bg-accent rounded-full border px-3 py-1.5 text-xs font-medium transition-colors">
                        Edit
                      </button>
                      {!address.isDefault && (
                        <DeleteAddressModal
                          addressId={address.id}
                          handleDelete={handleDeleteAddress}
                        />
                      )}
                    </div>
                  </div>
                  <button
                    aria-label="More"
                    className="hover:bg-accent inline-flex size-8 items-center justify-center rounded-full transition-colors"
                  ></button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div className="pointer-events-none fixed right-0 bottom-14 left-0 flex justify-center">
        <div className="from-background via-background pointer-events-auto w-full max-w-md bg-linear-to-t to-transparent px-5 pt-3 pb-6">
          <Link
            href="/account/address/new"
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold shadow-lg transition-colors"
          >
            <PlusIcon className="size-4" />
            Tambah alamat baru
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddressGroup;
