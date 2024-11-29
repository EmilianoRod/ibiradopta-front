"use client";

import { useRouter } from "next/navigation";

export const ErrorFeedback = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/proyectos");
  };

  return (
    <main
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/fondo-hojas.png')" }}
    >
      <section className="rounded-2xl shadow-lg bg-black/75 font-Poppins text-white text-center p-10 max-w-lg">
        <h1 className="text-2xl font-bold mb-6">Hubo un error en la compra</h1>
        <p className="text-lg mb-8">
          Lo sentimos, no se ha podido completar la compra. Por favor, revisa los
          detalles de tu pago e intenta nuevamente.
        </p>
        <button
          onClick={handleRedirect}
          className="bg-moss-green text-lg w-full py-3 rounded-full hover:bg-green-700"
        >
          Ir a proyectos
        </button>
      </section>
    </main>
  );
};
