"use client";
import { MassageContext } from "@/context/MassageContext";
import { api } from "@/convex/_generated/api";
import { useConvex, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { SquareChevronRight, Link, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Prompt from "@/app/data/prompt";
import { useSidebar } from "../ui/sidebar";

const Chatview = () => {
  const UpdateMessage = useMutation(api.workspace.updateMessage);
  const { id } = useParams();
  const convex = useConvex();
  const { userDetail } = useContext(UserContext);
  const [userInput, setUserInput] = useState();
  const [loading, setLoading] = useState(false);
  const { toggleSidebar } = useSidebar();

  const { massage, setMassage } = useContext(MassageContext);

  useEffect(() => {
    id && Getworkspacedata();
  }, [id]);

  const Getworkspacedata = async () => {
    const result = await convex.query(api.workspace.Getworkspace, {
      workspaceId: id,
    });
    setMassage(result.messages);
  };

  const getApiresp = async () => {
    setLoading(true);
    // const PROMPT = JSON.stringify(massage) + prompt.CHAT_PROMPT;

    const lastUserMessage = massage?.[massage.length - 1]?.content || "";
const PROMPT = lastUserMessage + "\n\n" + Prompt.CHAT_PROMPT;

    const result = await axios.post("/api/ai-chat", {
      prompt: PROMPT,
    });

    const aiRes = {
      role: "ai",
      content: result.data.result,
    };

    setMassage((prev) => [...prev, aiRes]);

    await UpdateMessage({
      messages: [...massage, aiRes],
      workspaceId: id,
    });

    setLoading(false);
  };

  useEffect(() => {
    if (massage?.length > 0) {
      const role = massage[massage.length - 1].role;
      if (role === "user") {
        getApiresp();
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
    setUserInput("");
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-scroll scrollbar-hide  ">
        {massage?.map((msg, index) => (
          <div key={index} className="flex items-center px-4 text-wrap  ">
            <div className="bg-pink-50" >
              {msg?.role === "user" && (
                <Image
                  className="rounded-full"
                  src={userDetail?.picture}
                  alt="userImage"
                  width={40}
                  height={40}
                />
              )}
            </div>
            <div className="bg-gray-900 p-4 rounded-xl m-2 size-sm flex flex-col gap-4 overflow-hidden  ">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}

        {loading && (
          <div className="bg-gray-900 p-2 rounded-xl m-2">
            <div className="flex gap-2 animate-pulse">
              <LoaderCircle className="animate-spin" />
              <h2>Generating response....</h2>
            </div>
          </div>
        )}
      </div>

 <div className=" flex gap-2 items-end " >

 { userDetail&& <Image onClick={toggleSidebar} src={userDetail?.picture} alt="user" width={30} height={30} className=" rounded-full cursor-pointer "  ></Image>}
      <div className="relative mt-6 bg-white/5 rounded-xl w-full">
        {userInput && (
          <SquareChevronRight
            onClick={() => onGenerate(userInput)}
            className="absolute right-4 top-2 size-10 text-blue-600"
          />
        )}

        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full h-full p-4 bg-transparent border-white/20 border-2 rounded-xl"
          placeholder="What do you want to build?"
        />

        <Link className="absolute bottom-2 left-2 hover:text-blue-400 cursor-pointer" />
      </div></div>
    </div>
  );
};

export default Chatview;
