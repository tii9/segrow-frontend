import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = async ({ children }: LayoutProps) => {
  return (
    <section className="relative mx-auto w-full max-w-md bg-[#FCFCFF] shadow">
      {children}
    </section>
  );
};

export default Layout;
