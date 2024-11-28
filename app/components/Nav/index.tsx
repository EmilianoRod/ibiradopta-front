"use client";

import Link from "next/link";
import Image from "next/image";
import Logout from "../Logout"; 
import Login from "../Login";
import RegisterButton from "../RegisterButton";
import { useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo y título */}
        <div className="flex">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={108} height={96} />
          </Link>
          <div className="text-moss-green text-5xl font-Righteous pt-8">
            IBIRADOPTÁ
          </div>
        </div>

        {/* Navegación y sesión */}
        <div className="space-x-10 font-Poppins flex items-center">
          <Link
            href="/"
            className="text-moss-green px-4 py-2 ml-2 text-2xl hover:text-green-700"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-moss-green px-4 py-2 ml-2 text-2xl hover:text-green-700"
          >
            Explorar
          </Link>
          {!session ? (
            <>
              <RegisterButton />
              <Login />
            </>
          ) : (
            // Pasar los datos del usuario al componente Logout
            <Logout
              firstName={session.user.firstName || ""}
              lastName={session.user.lastName || ""}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;

