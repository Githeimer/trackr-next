"use client"
import { useAuthStore } from "@/store/store";
import {signIn, useSession} from "next-auth/react"
import { useRouter} from "next/navigation";
import { useEffect } from "react";

const Login = () => {
  const {user,setUser}= useAuthStore();
  const {data:session, status}=useSession();
  const router = useRouter();

  useEffect(()=>{
      if(session?.user)
      {
          setUser({
            id: session.user?.id as string,
            username: session.user?.name as string,
            email: session.user?.email as string,
            image: session.user?.image as string,
          })
      }
  },[session,router,setUser])

  const handleGoogleLogin = async() => {
    await signIn("google");
  };
  return (
    <div>
      {/* <h1 className="text-white">hello {newURL}</h1> */}
      {/* for debug purpose */}
      <div className="container login text-[var(--light-color)] items-center justify-center h-[80vh]">
        <h1 className="text-white text-3xl p-5">Sign In</h1>
        <div className="bg-[var(--nav-color)] p-6 rounded-sm h-auto flex flex-col gap-2 w-auto">
          <h1 className="text-center text-[var(--brand-color)] ">
            Sign in to your account using one of the following options.
          </h1>
          <hr className="border-[var(--text-color)] w-[60%] self-center p-1 " />
          <button
            className=" p-2 border-[1px] border-[var(--brand-color)] hover:bg-zinc-800 cursor-pointer "
            onClick={handleGoogleLogin}
          >
            {/* google login */}
            <div className="flex flex-row gap-5 justify-center items-center ">
              <img src="./google.png" className="h-5" alt="" />
              <p className="text-base">Google</p>
            </div>
          </button>
          {/* github login */}
          <button className="p-2 border-[1px] border-[var(--brand-color)] bg-zinc-900 cursor-not-allowed">
            <div className="flex flex-row gap-5 justify-center items-center">
              <img src="./github_white.png" className="h-5" alt="" />
              <p className="text-base">Github</p>
            </div>
          </button>
          <button className="p-2 border-[1px] border-[var(--brand-color)] bg-zinc-900 cursor-not-allowed ">
            <div className="flex flex-row gap-5 justify-center items-center">
              <img src="./X.png" className="h-5" alt="" />
              <p className="text-base">Twitter</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
