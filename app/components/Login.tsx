"use client";
import { signIn, useSession } from "next-auth/react";

export default function Login({ className = "" }) {
  const { data: session } = useSession();

  const handleLogin = () => {
    if (!session) {
      signIn("keycloak");
    } else {
      console.log("Ya estás logeado");
    }
  };

  return (
    <button
      onClick={handleLogin}
      //className="bg-moss-green text-white px-6 py-2 text-2xl w-60 h-16 rounded-full hover:bg-green-700"
      className={className}
    >
      Iniciar Sesión
    </button>
  );
}
