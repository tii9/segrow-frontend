"use client";

import { AxiosError } from "axios";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";

import { idrFormat } from "~/lib/idr-format";
import { toast } from "~/components/ui/toast";

import { useAddToCart } from "~/features/cart/api/addToCard";
import { useDecreaseCartItem } from "~/features/cart/api/decreaseCartItem";
import { useDeleteCartItem } from "~/features/cart/api/deleteCartItem";

type CartItemProps = {
  item: {
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
  };
};

const CartItem = ({ item }: CartItemProps) => {
  const { mutate: increaseCartMutation, isPending: increaseCartPending } =
    useAddToCart({
      mutationConfig: {
        onError: (error) => {
          if (error instanceof AxiosError) {
            alert(error.response?.data.message);
          } else {
            console.log(error);
          }
        },
      },
    });

  const { mutate: decreaseCartMutation, isPending: decreaseCartPending } =
    useDecreaseCartItem();

  const { mutate: deleteCartMutation, isPending: deleteCartPending } =
    useDeleteCartItem({
      mutationConfig: {
        onSuccess: () => {
          toast.add({
            type: "success",
            description: "Berhasil menghapus produk",
          });
        },
      },
    });

  const handleQuantity = (action: "increment" | "decrement") => {
    if (action === "increment" && item.quantity < item.product.stock) {
      increaseCartMutation({ productId: item.product.id, quantity: 1 });
    } else if (action === "decrement") {
      decreaseCartMutation(item.id);
    }
  };

  const cookingTimePortionInfo =
    item.product.cookingTime < 1 && item.product.portion < 1
      ? ""
      : `${item.product.portion} porsi · ${item.product.cookingTime} menit`;

  return (
    <div className="flex gap-4 rounded-md bg-white p-4 shadow">
      <div className="relative aspect-square w-20 overflow-hidden rounded-md">
        <Image
          src={item.product.imageUrl || ""}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col items-start justify-between">
        <div>
          <h3 className="line-clamp-1 text-sm font-semibold">
            {item.product.name}{" "}
          </h3>
          <p className="text-xs">{cookingTimePortionInfo}</p>
        </div>
        <h3 className="font-semibold text-sm">
          {idrFormat(item.product.price)}
        </h3>
      </div>

      <div className="flex flex-1 flex-col items-end justify-between">
        <button
          onClick={() => deleteCartMutation(item.id)}
          disabled={deleteCartPending}
          className="disabled:text-foreground/50 hover:text-red-400"
        >
          <Trash2Icon size={20} />
        </button>
        <div className="flex rounded-full border p-1">
          <button
            className="disabled:text-foreground/50 flex items-center justify-center"
            onClick={() => handleQuantity("decrement")}
            disabled={decreaseCartPending}
          >
            <MinusIcon size={18} />
          </button>
          <span className="w-10 text-center text-sm">{item.quantity}</span>
          <button
            className="disabled:text-foreground/50 flex items-center justify-center"
            onClick={() => handleQuantity("increment")}
            disabled={
              item.quantity === item.product.stock || increaseCartPending
            }
          >
            <PlusIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
