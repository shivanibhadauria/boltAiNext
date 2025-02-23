"use client";

import React, { useContext, useState } from "react";
import { SquareChevronRight, Link } from "lucide-react";
import { MassageContext } from "@/context/MassageContext";
import SignIn from "./SignIn";
import { UserContext } from "@/context/UserContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

const dummydata = [
  {
    prompt: "Create a todo app in react",
  },
  {
    prompt: "Create a Budget track app",
  },
  {
    prompt: "create a gym managment portal Dashboard",
  },
  {
    prompt: "Create a Vite app",
  },
  {
    prompt: "Create login signup screan",
  },
];

const Hero = () => {
  const [userInput, setUserInput] = useState();
  const { massage, setMassage } = useContext(MassageContext);
  const [openDialog, setOpenDialog] = useState(false);
  const { userDetail, setUserDetail } = useContext(UserContext);
  const createWorkSpace = useMutation(api.workspace.createWorkSpace);
  const router = useRouter();

  const onGenerate = async (input) => {
    try {
      console.log("🚀 onGenerate function is running!");

      if (!userDetail?.name) {
        setOpenDialog(true);
        console.log("⚠️ User does not have a name. Opening dialog...");
        return;
      }

      const msg = {
        role: "user",
        content: input,
      };

      console.log("✅ Message created:", msg);

      console.log("📝 Data being sent to Convex:", {
        users: [userDetail._id],
        messages: [msg],
      });

      const workspaceId = await createWorkSpace({
        users: [userDetail._id],
        messages: [msg],
      });

      console.log("🎉 Workspace created with ID:", workspaceId);
      router.push("/workspace/" + workspaceId);
    } catch (error) {
      console.error("❌ Error in onGenerate:", error);
    }
  };

  return (
    <>
      <div className=" text-white h-screen flex flex-col gap-2 items-center justify-center ">
        <h1 className=" text-3xl font-bold  ">What do you want to build?</h1>
        <p className=" text-white/50 text-sm ">
          Prompt, run, edit, deploy full stack web apps.
        </p>

        <div className="w-1/2  h-1/3 relative mt-6 bg-white/5 rounded-xl ">
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
        <div className=" w-1/2 mt-6 ">
          <div className="flex  gap-4 flex-wrap items-center justify-center  h-auto cursor-pointer ">
            {dummydata.map((data, index) => (
              <p
                onClick={() => onGenerate(data.prompt)}
                className="bg-transparent border-white/20 border-2 rounded-sm text-sm text-white/80 hover:text-white p-1 "
                key={index}
              >
                {data.prompt}
              </p>
            ))}
          </div>
          <SignIn
            openDialog={openDialog}
            closeDialog={() => setOpenDialog(false)}
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
