"use client";

import {
  ArrowLeftIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Skeleton } from "~/components/ui/skeleton";
import { toast } from "~/components/ui/toast";
import { authClient } from "~/lib/auth-client";
import { idrFormat } from "~/lib/idr-format";
import { useGetProductBySlug } from "~/features/products/api/getProductBySlug";
import { useGetProducts } from "~/features/products/api/getProducts";
import { useAddToCart } from "~/features/cart/api/addToCard";
import ProductCard from "~/features/products/components/ProductCard";
import LoadingComponent from "~/components/LoadingComponent";

const ProductDetailPage = ({ slug }: { slug: string }) => {
  const { data: session } = authClient.useSession();

  const router = useRouter();
  const pathname = usePathname();

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(1);
  const { data: product, isLoading } = useGetProductBySlug({
    slug,
    queryConfig: {
      enabled: !!slug,
    },
  });
  const { data: products, isLoading: productsLoading } = useGetProducts({
    take: 4,
    category: product?.category.name,
    sort: "populer",
  });
  const { mutate: addToCartMutation, isPending: isAddToCart } = useAddToCart({
    mutationConfig: {
      onSuccess: () => {
        toast.add({
          type: "success",
          description: "Produk berhasil ditambahkan ke keranjang",
        });

        setCartQuantity(1);
      },
    },
  });

  const similarProduct = products?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    const current = sessionStorage.getItem("currentPath");

    if (current && current !== pathname) {
      sessionStorage.setItem("previousPath", current);
    }

    sessionStorage.setItem("currentPath", pathname);
  }, [pathname]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  const handleBack = () => {
    const previousPath = sessionStorage.getItem("previousPath");

    if (previousPath) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = () => {
    if (!session) {
      router.replace("/sign-in");
      return;
    }

    if (product?.id) {
      addToCartMutation({ productId: product?.id, quantity: cartQuantity });
    }
  };

  const handleCartQuantity = (action: "add" | "remove") => {
    if (action === "add" && cartQuantity < (product?.stock || 1)) {
      setCartQuantity(cartQuantity + 1);
    } else if (action === "remove" && cartQuantity > 1) {
      setCartQuantity(cartQuantity - 1);
    }
  };

  return (
    <div className="mb-22 min-h-screen">
      {/*Top Navbar*/}
      <div className="sticky top-0 flex z-99 items-center justify-between border-b-2 bg-white/95 py-2.5 pe-4 backdrop-blur">
        <div className="flex items-center gap-2">
          <Button onClick={handleBack} variant="ghost">
            <ArrowLeftIcon className="size-6" />
          </Button>
          <h1 className="text-base font-medium">{product?.name}</h1>
        </div>
        <HeartIcon
          className={cn(
            "border-none text-red-500",
            isWishlisted && "fill-current",
          )}
          onClick={handleWishlist}
        />
      </div>

      <section>
        <div className="bg-white px-4 pt-6 pb-4">
          {product?.imageUrl ? (
            <Image
              src={product?.imageUrl}
              height={200}
              width={200}
              alt={product?.name}
              loading="eager"
              className="bg-muted-foreground aspect-square w-full rounded-xl object-cover"
            />
          ) : (
            <div className="bg-muted-foreground aspect-square w-full rounded-xl"></div>
          )}
        </div>

        <div className="space-y-1.5 bg-white px-4 pb-6">
          <h1 className="text-2xl font-bold">
            {idrFormat(product?.price || 0)}
          </h1>
          <h2>{product?.name}</h2>
          <div className="flex items-center gap-1 text-xs">
            <StarIcon className="size-4 fill-current text-yellow-400" />
            <span className="me-2 font-semibold">
              {product?.averageRating || 0}
            </span>
            ({product?.reviewCount || 0} ulasan)
          </div>

          {product?.category.name.toLowerCase() !== "bibit" && (
            <div className="grid grid-cols-2 mt-4 gap-4">
              <div className="border rounded-md p-2 space-y-1">
                <p className="text-xs">Waktu</p>
                <span className="font-medium">
                  {product?.cookingTime} Menit
                </span>
              </div>
              <div className="border rounded-md p-2 space-y-1">
                <p className="text-xs">Porsi</p>
                <span className="font-medium">{product?.portion} porsi</span>
              </div>
            </div>
          )}
        </div>

        {/*Product serupa*/}
        <div className="mt-4 bg-white p-4">
          <h2 className="mb-2 font-semibold">Deskripsi produk</h2>
          <p className="text-sm whitespace-pre-line">{product?.description}</p>
        </div>
        {similarProduct.length > 1 && (
          <div className="mt-4 bg-white p-4">
            <h2 className="mb-2 font-semibold">Produk serupa</h2>
            <ScrollArea>
              <div className="flex gap-4 pb-4 pt-2 px-1">
                {!productsLoading
                  ? similarProduct?.map((sProduct) =>
                      sProduct.id !== product?.id ? (
                        <div key={sProduct.id}>
                          <ProductCard {...sProduct} />
                        </div>
                      ) : null,
                    )
                  : Array.from({ length: 4 }).map((_, i) => (
                      <Skeleton key={i} className="aspect-square h-56 w-full" />
                    ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        )}
      </section>

      <div className="bg-background/95 border-border fixed inset-x-0 bottom-0 left-1/2 z-20 flex w-full max-w-md -translate-x-1/2 justify-between gap-4 border-t p-4 backdrop-blur">
        {product?.stock === 0 ? (
          <Button disabled className="flex-1 p-4">
            Tidak Tersedia
          </Button>
        ) : (
          <>
            <div className="flex w-fit items-center justify-center gap-2 rounded-full border p-1">
              <Button
                variant="ghost"
                disabled={cartQuantity === 1}
                onClick={() => handleCartQuantity("remove")}
              >
                <MinusIcon />
              </Button>
              <span className="w-6 text-center text-sm font-semibold">
                {cartQuantity}
              </span>
              <Button
                variant="ghost"
                disabled={cartQuantity === product?.stock}
                onClick={() => handleCartQuantity("add")}
              >
                <PlusIcon />
              </Button>
            </div>

            <Button
              className="h-auto flex-1"
              onClick={handleAddToCart}
              disabled={isAddToCart}
            >
              <ShoppingBagIcon />
              Tambahkan ke Keranjang
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
