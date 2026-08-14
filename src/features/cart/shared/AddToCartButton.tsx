"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { toast } from "~/components/ui/toast";
import { useAddToCart } from "~/features/cart/api/addToCard";
import { authClient } from "~/lib/auth-client";

type AddToCartButtonProps = {
  productId: string;
  disabled?: boolean;
};

const AddToCartButton = ({
  productId,
  disabled = false,
}: AddToCartButtonProps) => {
  const router = useRouter();

  const { mutate: AddToCartMutation, isPending: isAddingToCart } = useAddToCart(
    {
      mutationConfig: {
        onSuccess: () => {
          toast.add({
            type: "success",
            description: "Produk berhasil ditambahkan ke keranjang",
          });
        },
      },
    },
  );

  const handleAddToCard = async () => {
    const { data: session } = await authClient.getSession();

    if (!session) {
      router.replace("/sign-in");
      return;
    }

    AddToCartMutation({ productId, quantity: 1 });
  };

  return (
    <Button
      variant="outline"
      className="text-primary mt-3 w-full text-xs"
      disabled={disabled || isAddingToCart}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleAddToCard();
      }}
      onTouchStart={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      Tambah ke Keranjang
    </Button>
  );
};

export default AddToCartButton;
