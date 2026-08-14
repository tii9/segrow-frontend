import React from "react";
import BottomNavbar from "~/components/navbar/BottomNavbar";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="relative mx-auto w-full max-w-md bg-[#FCFCFF] min-h-screen shadow">
      {children}
      <BottomNavbar />
    </section>
  );
};

export default Layout;
