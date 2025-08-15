"use client";

import React, { useState, useEffect, useContext } from "react";
import { MassageContext } from "@/context/MassageContext";
import {
  SandpackFileExplorer,
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import axios from "axios";

const Codeview = () => {
  const [active, setActive] = useState("code");
  const [files, setFiles] = useState({});
  const { massage, setMassage } = useContext(MassageContext);

  // ✅ Corrected function placement
  const GenerateAicode = async () => {
    try {
      if (!massage || massage.length === 0) return;

      const CODE_PROMPT = "Write optimized, clean React code.";
      const lastMessage = massage[massage.length - 1]?.content;
      if (!lastMessage) return;

      const promptText = lastMessage + " " + CODE_PROMPT;
      console.log("Sending request with prompt:", promptText);

      const result = await axios.post("/api/ai-code", {
        prompt: promptText,
      });

      console.log("API Response:", result.data);
      if (result.data?.files) {
        setFiles(result.data.files);
      }
    } catch (error) {
      console.error("Error in GenerateAicode:", error);
    }
  };

  useEffect(() => {
    if (massage && massage.length > 0) {
      console.log("useEffect triggered, massage:", massage);
      const role = massage[massage.length - 1]?.role;
      if (role === "user") {
        console.log("Calling GenerateAicode...");
        GenerateAicode(); // ❌ Wrong: This function is not defined yet!
      }
    }
  }, [massage]); // Dependency array

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
        template="react"
        theme="dark"
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
