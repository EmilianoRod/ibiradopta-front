"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import Login from "../Login";
import Logout from "../Logout";
import MyDonationsButton from "../../MyDonations/MyDonationsButtom";
import RegisterButton from "../RegisterButton";
import { useSession } from "next-auth/react";
import HamMenu from "./HamMenu";

const Nav = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Función para cerrar el menú cuando una opción es seleccionada
  const handleOptionClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center">
              <Image src="/logo.svg" alt="logo" width={108} height={96} />
              <div className="text-moss-green text-2xl lg:text-5xl font-Righteous pt-2 lg:pt-8">IBIRADOPTÁ</div>
            </div>
          </Link>
        </div>
        <div className="flex flex-wrap justify-end">
          <div className=" lg:hidden">
            <button onClick={handleOptionClick} className="text-moss-green focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
          <div
            ref={menuRef}
            className={`lg:flex ${isOpen && window.innerWidth < 1024 ? 'z-50 absolute rounded-b-lg p-5 top-full bg-white right-0 shadow-lg overflow-y-auto' : 'hidden'} block w-full lg:w-auto`}>
            <ul className="flex flex-col lg:flex-row lg:space-x-10 space-y-2 lg:space-y-0 font-Poppins text-center lg:text-left items-center">
              <li className="lg:flex hidden border-b-2 border-gray-300 lg:border-none w-full">
                <Link href="/" className="text-moss-green block px-4 py-2 text-lg lg:text-2xl hover:text-green-700 text-shadow transition-all duration-200 transform hover:scale-105"
                  onClick={handleOptionClick}
                >
                  Home
                </Link>
              </li>
              <li className="lg:flex hidden border-b-2 border-gray-300 lg:border-none w-full">
                <Link href="/explorar" className="text-moss-green block px-4 py-2 text-lg lg:text-2xl hover:text-green-700 text-shadow transition-all duration-200 transform hover:scale-105"
                  onClick={handleOptionClick}
                >
                  Explorar
                </Link>
              </li>
              <li className="lg:hidden order-first w-full"
                onClick={handleOptionClick}
              >
                <HamMenu />
              </li>

              {session ? (
                <>
                  <li className="lg:flex hidden border-b-2 border-gray-300 lg:border-none w-full"
                    onClick={handleOptionClick}
                  >
                    <MyDonationsButton />
                  </li>
                </>
              ) : (
                <></>
              )}

              {!session ? (
                <>
                  <li className="lg:flex hidden"  >
                    <RegisterButton className="bg-moss-green text-white px-6 py-2 ml-2 text-2xl w-60 h-16 rounded-full hover:bg-green-700" />
                  </li>
                  <li className="lg:hidden w-full"
                    onClick={handleOptionClick}
                  >
                    {/* Estilos para pantallas pequeñas */}
                    <RegisterButton className="text-moss-green block px-4 py-2 text-lg border-b-2 border-gray-300 w-full" />
                  </li>
                  <li className="lg:flex hidden">
                    <Login className="bg-moss-green text-white px-6 py-2 text-2xl w-60 h-16 rounded-full hover:bg-green-700" />
                  </li>
                  <li className="lg:hidden w-full"
                    onClick={handleOptionClick}
                  >
                    {/* Estilos para pantallas pequeñas */}
                    <Login className="text-moss-green block px-4 py-2 text-lg border-b-2 border-gray-300 w-full" />
                  </li>
                </>
              ) : (
                <>
                  <li className="lg:flex hidden">
                    <Logout />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

