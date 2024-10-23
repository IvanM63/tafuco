import Footer from "@/components/navigation/Footer";
import Header from "@/components/navigation/Header";
import React from "react";

const RootLayout = ({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <main>
      <Header />
      {children}
      <Footer />
      {modal}
    </main>
  );
};

export default RootLayout;
