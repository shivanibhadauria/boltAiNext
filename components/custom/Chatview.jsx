"use client";
import { MassageContext } from "@/context/MassageContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import React, { use, useContext, useEffect, useState } from "react";
import { SquareChevronRight, Link, LoaderCircle } from "lucide-react";
import link from "next/link";
import Image from "next/image";
import { UserContext } from "@/context/UserContext";
import axios from "axios";

const Chatview = () => {
  const { id } = useParams();
  const convex = useConvex();
  const { userDetail, setUserDetail } = useContext(UserContext);
  const [userInput, setUserInput] = useState();
  const [loading, setLoading] = useState(false);

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

  const getApiresp = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(massage) + prompt.CHAT_PROMPT;
    const result = await axios.post("/api/ai-chat", { prompt: PROMPT });

    console.log(
      "🚀 ~ file: Chatview.jsx:94 ~ getApiresp ~ result",
      result.data.result
    );

    setMassage((prev) => [
      ...prev,
      {
        role: "ai",
        content: result.data.result,
      },
    ]);

    setLoading(false);
  };

  useEffect(() => {
    if (massage?.length > 0) {
      {
        const role = massage[massage.length - 1].role;

        if (role === "user") {
          getApiresp();
        }
      }
    }
  }, [massage]);

  const onGenerate = (input) => {
    setMassage((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);
  };

  return (
    <div className=" flex flex-col   h-[600px] ">
      <div className="flex-1 overflow-y-scroll scrollbar-hide  ">
        {massage?.map((msg, index) => (
          <div key={index} className="flex items-center   px-4 ">
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
            <div className=" bg-gray-900 p-2 rounded-xl m-2  size-sm ">
              <h1 className="text-sm h-auto w-full ">{msg.content}</h1>
            </div>
          </div>
        ))}

        {loading && (
          <div className=" bg-gray-900 p-2 rounded-xl m-2  ">
            <div className="flex gap-2 animate-pulse ">
              <LoaderCircle className=" animate-spin   " />
              <h2 className="  ">Generating response....</h2>{" "}
            </div>
          </div>
        )}
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
