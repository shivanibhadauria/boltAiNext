"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { MassageContext } from "@/context/MassageContext";
import { useState } from "react";
import { UserContext } from "@/context/UserContext";

const Provider = ({ children }) => {
  const [massage, setMassage] = useState();
  const [userDetail, setUserDetail] = useState();

  return (
    <UserContext.Provider value={{ userDetail, setUserDetail }}>
      <MassageContext.Provider value={{ massage, setMassage }}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div>{children}</div>
        </NextThemesProvider>
      </MassageContext.Provider>
    </UserContext.Provider>
  );
};

export default Provider;
