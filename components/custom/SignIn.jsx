import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { UserContext } from "@/context/UserContext";

import { useGoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import axios from "axios";

const SignIn = ({ openDialog, closeDialog }) => {
  const { userDetail, setUserDetail } = useContext(UserContext);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer" + tokenResponse.access_token } }
      );

      console.log(userInfo);
      setUserDetail(userInfo?.data);
      closeDialog(false);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <div className=" flex items-center justify-center flex-col gap-4 ">
            <h1 className=" font-bold text-2xl">Continue with bolt.New 2.0</h1>
            <p className=" text-white/60 font-sm text-wrap ">
              To use Bolt you must log into an existing account or create one.
            </p>
            <button
              onClick={googleLogin}
              className=" bg-blue-500 rounded-lg p-2 cursor-pointer "
            >
              Sign in with google
            </button>
            <p className=" text-xs text-white/60  ">
              By using Bolt, you agree to the collection of usage data for
              analytics.
            </p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SignIn;
