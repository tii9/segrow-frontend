import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="mx-auto w-full max-w-md bg-[#FCFCFF] shadow min-h-screen">
      {children}
    </section>
  );
};

export default Layout;
