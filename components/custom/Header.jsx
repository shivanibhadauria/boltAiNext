import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import { useSidebar } from "../ui/sidebar";
import { Download , Rocket  } from 'lucide-react';
import { ActionContext } from "@/context/ActionContext";
const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserContext);
  const { toggleSidebar } = useSidebar();
  const {action , setAction} = useContext(ActionContext);

const onAction = (action) => {
  setAction({
    actionType: action,
    timeStamp: Date.now(),
  })
};


  return (
    <div className="flex items-center justify-between p-4">
      <Image src={"/logo.png"} alt="logo " width={40} height={40} />

      {!userDetail && (
        <div className=" flex  gap-4 ">
          <Button variant="ghost">Sign In</Button>
          <Button className=" text-white bg-blue-500 ">Get Started</Button>
         
        </div>
      )}
      <div className=" flex gap-2 " >
        <Button onClick={()=>onAction('export')}  > {<Download/>} Export</Button>
        <Button onClick={()=>onAction('deploy')} variant='outline' >  {<Rocket/>} Deploy</Button>
     

{ userDetail&& <Image onClick={toggleSidebar}  src={userDetail?.picture} alt="user" width={30} height={30} className=" rounded-full cursor-pointer "  ></Image>}


      </div>

    </div>
  );
};

export default Header;
