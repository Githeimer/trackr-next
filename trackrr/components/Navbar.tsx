"use client"

import Link from "next/link";
import { AuthState } from "@/store/store";
import { User } from "@/types";
import React, { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/store/store";
import Image from "next/image";
import {PlusSquareIcon} from "lucide-react"
import { useRouter } from "next/navigation";
import {ListChecks} from "lucide-react"
import { signOut, useSession } from "next-auth/react";
// const RedirectToGithubCode = () => {
//   window.location.href = "https://www.github.com/githeimer/trackr-next";
// };

const Navbar:React.FC = () => {
    const router= useRouter();

  const {data:session}=useSession();
  const { user, logout } = useAuthStore() as AuthState;
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = ():void => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent):void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside );
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-row items-center justify-between mt-3 p-2 rounded-xl bg-[var(--nav-color)]">
      {/* left division */}
      <Link href={"/"}>
      <div className="flex flex-row gap-3 items-center align-center">
       <img src="./TR.jpg" className="h-10 rounded-lg" alt="" />
        <h1 className="text-white text-3xl font-bold">
          Trackrr<span className="text-[var(--text-color)] ">.</span>
        </h1>
      </div>
      </Link>
      {/* right division */}
      <div className="flex flex-row gap-4 items-center align-center">
        {/* github redirect */}
        <ListChecks className="text-[var(--text-color)] cursor-pointer hover:bg-gray-800  hover:ease-in-out hover:duration-300" onClick={()=>router.push("/todo") }/>
        <PlusSquareIcon className="text-[var(--text-color)] cursor-pointer hover:bg-gray-800  hover:ease-in-out hover:duration-300" onClick={()=>router.push("/dashboard") }></PlusSquareIcon>
        {session ? (
          <div className="relative" ref={dropdownRef}>
            <Image
              src={session.user?.image as string}
              className="h-7 cursor-pointer rounded-full"
              width={30}
              height={30}
              alt={session.user?.name as string}
              onClick={toggleDropdown}
            />
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <Link 
                  href="/dashboard" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    signOut();
                    setIsDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/auth">
            <Image src="/login-avatar.png" className="h-7" alt="img"   width={30}
              height={30} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;