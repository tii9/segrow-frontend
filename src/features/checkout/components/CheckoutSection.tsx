"use client";

import { useState } from "react";
import { LockIcon } from "lucide-react";

import { authClient } from "~/lib/auth-client";
import { SALATIGA_SHIPPING_RATES } from "~/constants/shippingRate";
import { idrFormat } from "~/lib/idr-format";

import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Separator } from "~/components/ui/separator";
import { toast } from "~/components/ui/toast";

import { useGetCarts } from "~/features/cart/api/getCarts";
import {
  AddressResponse,
  useGetAddressesByUserId,
} from "~/features/profile/api/getAddresses";
import ShippingAddressSection from "~/features/profile/shared/address/ShippingAddressSection";
import CheckoutProductsSection from "~/features/checkout/components/CheckoutProductsSection";
import OrderConfirmationDrawer from "~/features/checkout/components/OrderConfirmationDrawer";
import QRISDrawer from "~/features/checkout/components/QRISDrawer";
import { useCreateOrder } from "~/features/checkout/api/createOrder";

const PaymentMethods = [
  {
    id: "QRIS",
    name: "QRIS",
  },
  {
    id: "COD",
    name: "Cash on Delivery (COD)",
  },
];

const CheckoutSection = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const { data: cartItems, isLoading: loadingCartItems } = useGetCarts();
  const { data: addresses, isLoading: isLoadingAddresses } =
    useGetAddressesByUserId({
      userId: session?.user.id ?? "",
    });
  const {
    mutate: createOrderMutation,
    isPending: createOrderPending,
    data: orderMutationResponse,
  } = useCreateOrder({
    mutationConfig: {
      onSuccess: () => {
        setIsDrawerOpen(true);
        return;
      },
    },
  });

  const [userSelectedAddress, setUserSelectedAddress] = useState<
    AddressResponse | undefined
  >(undefined);
  const selectedAddress =
    userSelectedAddress ?? addresses?.find((address) => address.isDefault);

  const [userSelectedPaymentMethod, setUserSelectedPaymentMethod] = useState(
    PaymentMethods[0],
  );

  const deliveryFee = SALATIGA_SHIPPING_RATES.find(
    (shipping) =>
      shipping.kecamatan.toLocaleLowerCase() ===
      selectedAddress?.district.toLocaleLowerCase(),
  );

  const handleCheckout = () => {
    if (selectedAddress === undefined || selectedAddress === null) {
      toast.add({
        type: "error",
        description: "Anda belum memilih alamat pengiriman.",
      });
      return;
    }

    createOrderMutation({
      payment: {
        paymentMethod: userSelectedPaymentMethod.id,
      },
      items:
        cartItems?.items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })) ?? [],
      shippingAddress: {
        recipient: selectedAddress.recipient,
        phone: selectedAddress.phone,
        street: selectedAddress.street,
        district: selectedAddress.district,
        detail: selectedAddress.detail,
        notes: selectedAddress.notes,
      },
      shippingCost: deliveryFee?.price ?? 0,
      notes: "",
    });
  };

  return (
    <section>
      <ShippingAddressSection
        addresses={addresses}
        isLoadingAddresses={isLoadingAddresses}
        selectedAddress={selectedAddress}
        setUserSelectedAddress={setUserSelectedAddress}
      />

      <CheckoutProductsSection
        cartItems={cartItems}
        loadingCartItems={loadingCartItems}
      />

      {/*Payment Section*/}
      <div className="mt-4 bg-white p-4">
        <h2 className="font-semibold">Metode pembayaran</h2>
        <RadioGroup
          className="mt-2 gap-0 divide-y overflow-hidden rounded-2xl border"
          value={userSelectedPaymentMethod.id}
          onValueChange={(value) => {
            const selected = PaymentMethods.find(
              (method) => method.id === value,
            );
            if (selected) {
              setUserSelectedPaymentMethod(selected);
            }
          }}
        >
          {PaymentMethods.map((method) => (
            <Label
              key={method.id}
              htmlFor={method.id}
              className="flex cursor-pointer items-center justify-between gap-3 p-4 transition-colors hover:bg-slate-50"
            >
              <span className="text-sm font-medium">{method.name}</span>
              <RadioGroupItem value={method.id} id={method.id} />
            </Label>
          ))}
        </RadioGroup>
      </div>

      {/*Payment Summary*/}
      <div className="mt-4 bg-white p-4">
        <div className="rounded-md border p-4">
          <div className="space-y-3 text-sm">
            <p className="flex items-center justify-between">
              Subtotal
              <span className="font-semibold">
                {idrFormat(cartItems?.totalPrice ?? 0)}
              </span>
            </p>
            <p className="flex items-center justify-between">
              Ongkos kirim
              <span className="font-semibold">
                {idrFormat(deliveryFee?.price ?? 0)}
              </span>
            </p>
          </div>
          <Separator className="my-4" />
          <p className="flex items-center justify-between">
            Total
            <span className="font-semibold">
              {idrFormat(
                (cartItems?.totalPrice ?? 0) + (deliveryFee?.price ?? 0),
              )}
            </span>
          </p>
        </div>
      </div>

      <div className="h-14 shrink-0" aria-hidden="true" />

      {/*Payment Button*/}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center">
        <div className="pointer-events-auto w-full max-w-md border-t bg-white p-4 shadow">
          <p className="flex items-center justify-between text-sm">
            Total belanja
            <span className="text-base font-semibold">
              {idrFormat(
                (cartItems?.totalPrice ?? 0) + (deliveryFee?.price ?? 0),
              )}
            </span>
          </p>
          <Button
            className="mt-4 mb-3 w-full rounded-full py-4"
            disabled={
              createOrderPending || loadingCartItems || isLoadingAddresses
            }
            onClick={handleCheckout}
          >
            Pesan Sekarang
          </Button>
          <span className="flex items-center justify-center gap-2 text-xs">
            <LockIcon className="inline-block" size={14} /> Pembayaran anda aman
            dan terlindungi
          </span>
        </div>
      </div>

      {userSelectedPaymentMethod.id === "QRIS" && (
        <QRISDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
          data={orderMutationResponse}
        />
      )}

      {userSelectedPaymentMethod.id === "COD" && (
        <OrderConfirmationDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
    </section>
  );
};

export default CheckoutSection;
