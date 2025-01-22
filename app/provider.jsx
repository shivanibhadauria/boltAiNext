"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";

const Provider = ({ children }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Header />
      <div>{children}</div>
    </NextThemesProvider>
  );
};

export default Provider;
