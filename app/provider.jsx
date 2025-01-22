"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";

const Provider = ({ childrin }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Header />
      <div>{childrin}</div>
    </NextThemesProvider>
  );
};

export default Provider;
