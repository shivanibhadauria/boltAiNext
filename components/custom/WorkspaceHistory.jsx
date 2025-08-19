import { UserContext } from '@/context/UserContext'
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import React , {useContext , useEffect} from 'react'

export const WorkspaceHistory = () => {

  const {userDetail , serUserDetail} = useContext(UserContext);
  const convex = useConvex();

  useEffect(() => {
    if(userDetail){
      GetAllWorkspace();
    }
  }, [userDetail]);

  const GetAllWorkspace = async () => {
    const result = await convex.query(api.workspace.GetAllWorkspace, {
      userId: userDetail?._id

    })
    console.log(result);
  }

  return (
    <div className='font-medium text-lg' > Your Chats </div>
  )
}
