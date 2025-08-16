"use client";

import React, { useState, useEffect, useContext } from "react";
import Prompt, { CODE_PROMPT } from "@/app/data/prompt";
// import { api } from "@/convex/_generated/api";
import { MassageContext } from "@/context/MassageContext";
import {
  SandpackFileExplorer,
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import axios from "axios";
import Lookup from "@/app/data/Lookup";

const Codeview = () => {
  const [active, setActive] = useState("code");
  const {massage, setMassage} = useContext(MassageContext);
  const [ files , setFiles ] = useState(Lookup?.DEFAULT_FILE);


  useEffect(() => {
    if (massage?.length > 0) {
      const role = massage[massage.length - 1].role;
      if (role === "user") {
        GenAiCode();
      }
    }
  }, [massage]);

 

const GenAiCode = async () => {
  const PROMPT  = massage + " " + Prompt.CODE_PROMPT;
 const result = await axios.post("/api/ai-code" , {
  prompt: PROMPT,
 });
  console.log("Raw AI Response:",  result.data);
  const AIresp =  result.data;
const mergedFiles = { ...Lookup.DEFAULT_FILE, ...AIresp?.files };
setFiles(mergedFiles);
  
}


 


  return (
    <div>
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
              <SandpackPreview style={{ height: "80vh" }} showNavigator />
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default Codeview;
