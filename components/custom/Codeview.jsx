"use client";

import React, { useState, useEffect, useContext } from "react";
import { api } from "@/convex/_generated/api";
import { MassageContext } from "@/context/MassageContext";
import { LoaderCircle } from "lucide-react";
import {
  SandpackFileExplorer,
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  
} from "@codesandbox/sandpack-react";
import axios from "axios";
import Lookup from "@/app/data/Lookup";
import { useConvex, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { countTokens } from "./Chatview";
import {UserContext} from "@/context/UserContext";
import SandpackPreviewClient from "./SandpackPreviewClient";
import { ActionContext } from "@/context/ActionContext";
import Prompt from "@/app/data/Prompt";


const Codeview = () => {
  const {id} = useParams();
  const [active, setActive] = useState("code");
  const {massage, setMassage} = useContext(MassageContext);
  const [ files , setFiles ] = useState(Lookup?.DEFAULT_FILE);
  const UpdateFiles  = useMutation(api.workspace.updateFiles);
  const { userDetail , setUserDetail } = useContext(UserContext);
  const {action, setAction} = useContext(ActionContext);

  const convex = useConvex();
  const [loading, setLoading] = useState(false);
  const UpdateTokens  = useMutation(api.users.UpdateTokens );


  useEffect(() => {
    id&&getFiles();
  }, [id]);

  useEffect(() =>{
    setActive("preview");
  },[action]);
  const getFiles = async () => {
    setLoading(true);
   const result = await convex.query(api.workspace.Getworkspace, {
    workspaceId: id,
   });
   const mergedFiles = {...Lookup.DEFAULT_FILE,...result?.UpdateFiles};
   setFiles(mergedFiles);
   setLoading(false);
  }

  useEffect(() => {
    if (massage?.length > 0) {
      const role = massage[massage.length - 1].role;
      if (role === "user") {
        GenAiCode();
      }
    }
  }, [massage]);

 

const GenAiCode = async () => {
  // const PROMPT = (massage || "") + " " + Prompt.CODE_PROMPT;
  setLoading(true);

  const lastUserMessage = massage?.[massage.length - 1]?.content || "";
const PROMPT = lastUserMessage + "\n\n" + Prompt.CODE_PROMPT;
 const result = await axios.post("/api/ai-code" , {
  prompt: PROMPT,
 });
 
  const AIresp =  result.data;
const mergedFiles = { ...Lookup.DEFAULT_FILE, ...AIresp?.files};
setFiles(mergedFiles);
await UpdateFiles( {
  workspaceId: id,
  files: AIresp?.files,
});

const token = Number(userDetail?.token) - Number(countTokens(JSON.stringify(AIresp)));

    await UpdateTokens ({
     userId: userDetail?._id,
      token:  token,
     
    });

    setUserDetail(
      prev=> ({
        ...prev,
        token: token,
      })
    );

setLoading(false);
  
}

  return (
    <div className=" relative " >
      <div className="w-full bg-[#181818] flex gap-2 h-16 items-center">
        <div className="bg-slate-900 flex gap-4 ml-4 p-2 rounded-full">
          <h1
            onClick={() => setActive("code")}
            className={`cursor-pointer p-1 ${
              active === "code" && "bg-blue-700 text-white rounded-full"
            }`}
          >
            Code
          </h1>
          <h1
            onClick={() => setActive("preview")}
            className={`cursor-pointer p-1 ${
              active === "preview" && "bg-blue-700 text-white rounded-full"
            }`}
          >
            Preview
          </h1>
        </div>
      </div>

      <SandpackProvider
       className=" relative "
      files={files}
        template="react"
        theme="dark"
        customSetup={{
          dependencies:{
            ...Lookup.DEPENDANCY,
          }
        }}
       
        
        options={{ externalResources: ["https://cdn.tailwindcss.com"] }}
      >
        <SandpackLayout>
          {active === "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "80vh" }} />
              <SandpackCodeEditor style={{ height: "80vh" }} />
            </>
          ) : (
            <>
              <SandpackPreviewClient/>
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>

     {loading&&<div className="bg-gray-900 opacity-60 top-0 absolute h-full w-full flex items-center justify-center">
          
              <LoaderCircle className="animate-spin" />
              <h2>Generating response....</h2>
          
          </div>}
     
    </div>
    
  );
};

export default Codeview;
