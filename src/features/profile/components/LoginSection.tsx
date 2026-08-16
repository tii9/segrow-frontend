import { ChevronRightIcon, MapPinIcon, ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type User = {
  name: string;
  email: string;
  image?: string;
  plan?: string;
};

const LoginSection = (user: User) => {
  return (
    <div className="mt-6">
      <section className="from-primary to-primary/80 text-primary-foreground rounded-2xl bg-linear-to-br p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <Image
            src={
              user.image ||
              `https://ui-avatars.com/api/?name=${user.name}&background=random&size=128&color=fff&bold=true`
            }
            width={50}
            height={50}
            alt={user.name}
            className="bg-primary-foreground/15 ring-primary-foreground/30 flex size-16 items-center justify-center rounded-full text-xl font-semibold ring-2 backdrop-blur"
            loading="eager"
          />

          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold">{user.name}</h2>
            <p className="text-primary-foreground/80 truncate text-sm">
              {user.email}
            </p>
          </div>
        </div>

        {/* <div className="bg-primary-foreground/10 mt-5 flex items-center justify-between rounded-xl px-4 py-3 backdrop-blur">
          <div>
            <p className="text-primary-foreground/70 text-xs">Current plan</p>
            <p className="text-sm font-medium">
              {user.plan || "No plan selected"}
            </p>
          </div>
          <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-3 py-1.5 text-xs font-medium transition-colors">
            Manage
          </Button>
        </div> */}
      </section>

      <section className="mt-8">
        <p className="text-muted-foreground px-1 pb-2 text-lg font-semibold">
          Pesanan
        </p>
        <ul className="bg-card border-border divide-border divide-y overflow-hidden rounded-2xl border">
          {[
            {
              icon: ShoppingBagIcon,
              label: "Pesanan Saya",
              link: "account/order-list",
            },
            {
              icon: MapPinIcon,
              label: "Alamat Pengiriman",
              link: "account/address",
            },
            // {
            //   icon: CreditCardIcon,
            //   label: "Metode Pembayaran",
            //   link: "account/payment",
            // },
          ].map(({ icon: Icon, label, link }) => (
            <li key={label}>
              <Link
                href={link}
                className="hover:bg-accent flex w-full items-center gap-3 px-4 py-4 text-left transition-colors"
              >
                <span className="bg-primary/10 flex size-9 items-center justify-center rounded-full">
                  <Icon className="text-primary size-5" />
                </span>
                <span className="text-foreground flex-1 text-sm font-medium">
                  {label}
                </span>
                {/* <span className="text-muted-foreground text-xs">{hint}</span> */}
                <ChevronRightIcon className="text-muted-foreground size-4" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default LoginSection;
