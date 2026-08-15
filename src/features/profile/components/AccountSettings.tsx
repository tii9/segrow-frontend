"use client";

import { ChevronRightIcon, LogOutIcon, UserXIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, useState } from "react";
import Loading from "~/components/LoadingComponent";
import { toast } from "~/components/ui/toast";
import { signOut } from "~/lib/auth-client";

type ActionItem = "Keluar" | "Hapus Akun";

const handleAction = async (
  action: ActionItem,
  router: ReturnType<typeof useRouter>,
  setIsLoading: Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    if (action === "Keluar") {
      setIsLoading(true);
      const { error } = await signOut();

      if (error) {
        toast.add({
          type: "error",
          description: error.message,
        });
        return;
      }

      router.push("/");
      return;
    } else if (action === "Hapus Akun") {
      alert(
        "Fitur hapus akun belum tersedia. Silakan hubungi support untuk bantuan.",
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    toast.add({
      type: "error",
      description: "Terjadi kesalahan. Silahkan coba lagi.",
    });
    router.push("/");
  }
};

const AccountSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="bg-card mt-6 w-full overflow-hidden rounded-2xl border">
      <ul className="divide-border divide-y">
        {[
          { icon: LogOutIcon, label: "Keluar" },
          { icon: UserXIcon, label: "Hapus Akun" },
        ].map((item, index) => (
          <li
            key={index}
            className="hover:bg-accent group flex w-full cursor-pointer items-center gap-3 p-4 text-left transition-colors"
            onClick={() =>
              handleAction(item.label as ActionItem, router, setIsLoading)
            }
          >
            <item.icon className="text-muted-foreground group-hover:text-destructive size-5" />
            <span className="text-foreground group-hover:text-destructive flex-1 text-sm font-medium">
              {item.label}
            </span>
            <ChevronRightIcon className="text-muted-foreground size-4" />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AccountSettings;
