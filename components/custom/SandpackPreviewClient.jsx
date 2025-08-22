import React from 'react'
import { SandpackPreview } from '@codesandbox/sandpack-react';

const SandpackPreviewClient = () => {
  return (
    <SandpackPreview style={{ height: "80vh" }} showNavigator />
  )
}

export default SandpackPreviewClient