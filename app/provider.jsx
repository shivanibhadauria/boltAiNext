"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { MassageContext } from "@/context/MassageContext";
import { useState } from "react";
import { UserContext } from "@/context/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Provider = ({ children }) => {
  const [massage, setMassage] = useState();
  const [userDetail, setUserDetail] = useState();

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}
    >
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
    </GoogleOAuthProvider>
  );
};

export default Provider;
