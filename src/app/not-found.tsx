import Link from "next/link";
import { Metadata } from "next";
import { buttonVariants } from "~/components/ui/button";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan | SeGrow",
  description:
    "Ups, halaman yang kamu cari mungkin sudah dipindahkan atau tidak tersedia.",
};

export default async function NotFound() {
  return (
    <div className="mx-auto flex h-screen w-full max-w-md flex-col items-center justify-center gap-4 bg-[#FCFCFF] px-4 pt-6">
      <h2 className="text-2xl font-bold">Halaman tidak ditemukan</h2>
      <p className="text-center">
        Ups, halaman yang kamu cari mungkin sudah dipindahkan atau tidak
        tersedia.
      </p>
      <Link
        href={"/"}
        className={buttonVariants({
          variant: "default",
          className: "px-4 py-5",
        })}
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
