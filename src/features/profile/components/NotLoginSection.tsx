import { LogInIcon, UserCircle2Icon, UserPlusIcon } from "lucide-react";
import Link from "next/link";

const NotLoginSection = () => {
  return (
    <section className="bg-card border-border mt-6 w-full rounded-2xl border p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="bg-muted mb-4 flex size-20 items-center justify-center rounded-full">
          <UserCircle2Icon
            className="text-muted-foreground size-12"
            strokeWidth={1.5}
          />
        </div>
        <h2 className="text-foreground text-lg font-semibold">
          Masuk ke akunmu
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Masuk untuk mendapatkan rekomendasi meal kit sesuai seleramu.
        </p>

        <div className="mt-6 flex w-full flex-col gap-3">
          <Link
            href="/sign-in"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-medium transition-colors"
          >
            <LogInIcon className="size-4" />
            Masuk
          </Link>
          <Link
            href="/sign-up"
            className="border-border bg-background text-foreground hover:bg-accent inline-flex h-12 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition-colors"
          >
            <UserPlusIcon className="size-4" />
            Buat akun
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotLoginSection;
