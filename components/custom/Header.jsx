import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserContext);
  return (
    <div className="flex items-center justify-between p-4">
      <Image src={"/logo.png"} alt="logo " width={40} height={40} />

      {!userDetail && (
        <div className=" flex  gap-4 ">
          <Button variant="ghost">Sign In</Button>
          <Button className=" text-white bg-blue-500 ">Get Started</Button>
        </div>
      )}
    </div>
  );
};

export default Header;
