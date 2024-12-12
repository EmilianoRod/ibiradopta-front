"use client";

import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import Login from "../Login";
import Logout from "../Logout";
import MyDonationsButton from "../../MyDonations/MyDonationsButtom";
import RegisterButton from "../RegisterButton";
import { useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/logo.svg" alt="logo" width={108} height={96} />
          <div className="text-moss-green text-2xl lg:text-5xl font-Righteous pt-2 lg:pt-8">IBIRADOPTÁ</div>
        </div>
        <div className="block lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-moss-green focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        <div className={`lg:flex ${isOpen ? 'block' : 'hidden'} w-full lg:w-auto`}>
          <ul className="flex flex-col lg:flex-row lg:space-x-10 space-y-2 lg:space-y-0 font-Poppins text-center lg:text-left">
            <li>
              <Link href="/" className="text-moss-green block px-4 py-2 text-lg lg:text-2xl hover:text-green-700">Home</Link>
            </li>
            <li>
              <Link href="/explorar" className="text-moss-green block px-4 py-2 text-lg lg:text-2xl hover:text-green-700">Explorar</Link>
            </li>

            {session ? (
              <>
                <li>
                  <MyDonationsButton />
                </li>
              </>
            ) : (
              <></>
            )}

            {!session ? (
              <>
                <li>
                  <RegisterButton />
                </li>
                <li>
                  <Login />
                </li>
              </>
            ) : (
              <li>
                <Logout />
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

