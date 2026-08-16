import axios from "axios";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

import { getProductBySlugQueryOptions } from "~/features/products/api/getProductBySlug";

import ProductDetailPage from "~/features/products/views/ProductDetailPage";

type ProductResponse = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  slug: string;
  imageUrl: string;
  categoryId: string;
  category: {
    name: string;
  };
};

type Props = {
  params: Promise<{ slug: string }>;
};

const serverAxios = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

const getProductBySlugServer = async (slug: string) => {
  try {
    const response = await serverAxios.get<{
      totalProducts: number;
      data: ProductResponse;
      nextCursor: string;
    }>(`/api/product/${slug}`);

    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch product:", error);

    return null;
  }
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;

  const product = await getProductBySlugServer(slug);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan",
      description: "Produk yang Anda cari tidak tersedia.",
    };
  }

  return {
    title: `${product.name} | SeGrow`,

    description:
      product.description.length > 160
        ? `${product.description.slice(0, 157)}...`
        : product.description,

    keywords: [
      product.name,
      product.category.name,
      "meal kit",
      "belanja online",
      "sayuran segar",
      "ecommerce",
    ],

    openGraph: {
      title: product.name,
      description: product.description,

      images: [
        {
          url: product.imageUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],

      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.imageUrl],
    },

    alternates: {
      canonical: `/product/${slug}`,
    },
  };
};

const Page = async ({ params }: Props) => {
  const { slug } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getProductBySlugQueryOptions(slug));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailPage slug={slug} />
    </HydrationBoundary>
  );
};

export default Page;
