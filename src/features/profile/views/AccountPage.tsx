"use client";

import {
  ChevronRightIcon,
  FileTextIcon,
  HelpCircleIcon,
  LockKeyholeIcon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import Loading from "~/components/LoadingComponent";
import { authClient } from "~/lib/auth-client";
import NotLoginSection from "~/features/profile/components/NotLoginSection";
import LoginSection from "~/features/profile/components/LoginSection";
import TopNavbar from "~/components/navbar/TopNavbar";

const AccountPage = () => {
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <TopNavbar header="Akun" />
      <div className={"px-4"}>
        {!data ? (
          <NotLoginSection />
        ) : (
          <LoginSection
            name={data.user.name}
            email={data.user.email}
            image={data.user.image ?? undefined}
          />
        )}

        <section className="mt-8">
          <p className="text-muted-foreground px-1 pb-2 text-lg font-semibold">
            Umum
          </p>
          <ul className="bg-card border-border divide-border divide-y overflow-hidden rounded-2xl border">
            {[
              { icon: FileTextIcon, label: "Blog", link: "/blog" },
              {
                icon: LockKeyholeIcon,
                label: "Kebijakan Privasi",
                link: "/privacy-policy",
              },
              {
                icon: SettingsIcon,
                label: "Pengaturan Akun",
                link: "account/settings",
              },
              { icon: HelpCircleIcon, label: "Bantuan", link: "/help" },
            ].map(({ icon: Icon, label, link }) => (
              <li key={label}>
                <Link
                  href={link}
                  className="hover:bg-accent flex w-full items-center gap-3 px-4 py-4 text-left transition-colors"
                >
                  <Icon className="text-muted-foreground size-5" />
                  <span className="text-foreground flex-1 text-sm font-medium">
                    {label}
                  </span>
                  <ChevronRightIcon className="text-muted-foreground size-4" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="text-muted-foreground mt-auto pt-8 text-center text-xs">
          v1.0.0
        </p>
      </div>
    </div>
  );
};

export default AccountPage;
