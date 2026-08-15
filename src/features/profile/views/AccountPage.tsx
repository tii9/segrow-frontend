import { authClient } from "~/lib/auth-client";
import TopNavbar from "~/components/navbar/TopNavbar";
import Link from "next/link";
import {
  ChevronRightIcon,
  FileTextIcon,
  HelpCircleIcon,
  LockKeyholeIcon,
  SettingsIcon,
} from "lucide-react";
import NotLoginSection from "~/features/profile/components/NotLoginSection";
import LoginSection from "~/features/profile/components/LoginSection";

const AccountPage = async () => {
  const { data: session } = await authClient.getSession();

  return (
    <div>
      <TopNavbar header="Akun" />

      <main className="mx-4 pb-20">
        {!session ? (
          <NotLoginSection />
        ) : (
          <LoginSection
            name={session.user.name}
            email={session.user.email}
            image={session.user.image ?? undefined}
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

        <p className="text-muted-foreground mt-auto pt-6 text-center text-xs">
          v1.0.0
        </p>
      </main>
    </div>
  );
};

export default AccountPage;
