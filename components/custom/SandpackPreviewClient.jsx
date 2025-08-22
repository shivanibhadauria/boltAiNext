"use client";
import React , {useRef , useEffect , useContext }  from 'react'
import { SandpackPreview , useSandpack } from '@codesandbox/sandpack-react';
import { ActionContext } from '@/context/ActionContext';

const SandpackPreviewClient = () => {

  const previewRef = useRef();
const {sandpack} = useSandpack();
const {action , setAction} = useContext(ActionContext);


useEffect(()=>{
  GetSandpackClient();
  
}, [sandpack&&action])

const GetSandpackClient= async ()=>{
 
  const client = previewRef.current?.getClient();
  if (client) {
    console.log("client:", client);

    const result  = await client.getCodeSandboxURL();
    if(action?.actionType=='deploy'){
      window.open('https://'+ +'.csb.app/');
    }
    console.log("result:", result);


  }
 

}
  
  
  return (
    <>
     <SandpackPreview
    ref={previewRef}
    
    style={{ height: "80vh" }} showNavigator />
    
    </>
  )
   
}

export default SandpackPreviewClient