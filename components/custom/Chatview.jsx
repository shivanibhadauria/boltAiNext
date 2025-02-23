"use client";
import { MassageContext } from "@/context/MassageContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { SquareChevronRight, Link } from "lucide-react";
import link from "next/link";
import Image from "next/image";
import { UserContext } from "@/context/UserContext";

const Chatview = () => {
  const { id } = useParams();
  const convex = useConvex();
  const { userDetail, setUserDetail } = useContext(UserContext);
  const [userInput, setUserInput] = useState();

  const { massage, setMassage } = useContext(MassageContext);
  console.log("🛠️ Debugging massage:", massage, typeof massage);
  console.log("debugging userdetail", userDetail);

  useEffect(() => {
    id && Getworkspacedata();
  }, [id]);

  const Getworkspacedata = async () => {
    const result = await convex.query(api.workspace.Getworkspace, {
      workspaceId: id,
    });

    setMassage(result.messages);
    console.log("get work space data", result);
  };

  return (
    <div className=" flex flex-col   h-[600px] ">
      <div className="flex-1 overflow-y-scroll  ">
        {massage?.map((msg, index) => (
          <div className="flex items-center   px-4 ">
            <div>
              {msg?.role === "user" && (
                <Image
                  className=" rounded-full  "
                  src={userDetail?.picture}
                  alt="userImage "
                  width={40}
                  height={40}
                />
              )}
            </div>
            <div className=" bg-gray-900 p-2 rounded-xl m-2  " key={index}>
              <h1>{msg.content}</h1>{" "}
            </div>
          </div>
        ))}
      </div>

      <div className="relative mt-6 bg-white/5 rounded-xl ">
        {userInput && (
          <SquareChevronRight
            onClick={() => onGenerate(userInput)}
            className=" absolute right-4 top-2 size-10 text-blue-600   "
          />
        )}

        <textarea
          onChange={(e) => setUserInput(e.target.value)}
          className="  w-full h-full  p-4 bg-transparent border-white/20 border-2 rounded-xl "
          placeholder="What do you want to build?"
        />

        <Link className=" absolute bottom-2 left-2 hover:text-blue-400  cursor-pointer " />
      </div>
    </div>
  );
};

export default Chatview;
