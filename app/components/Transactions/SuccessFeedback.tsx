"use client";

import { useRouter } from "next/navigation";


export const SuccessFeedback = () => {
    const router = useRouter();

    const handleRedirect = () => {
      router.push("/proyectos");
    };

    return (
        <main className="h-fit px-20 py-20 bg-cover flex justify-center" style={{ backgroundImage: "url('/fondo-hojas.png')" }}>
            <section className="rounded-2xl shadow-lg bg-moss-green/50 font-Poppins space-y-8 text-white text-center w-2/5 content-center py-4">
                <h1 className="text-2xl font-bold ">¡GRACIAS POR TU ADOPCIÓN!</h1>
                <p className="px-10 text-xl">Tu aporte a sido recibido con éxito. Has apoyado al proyecto seleccionado y podrás hacer seguimiento desde la sección “Mis Proyectos”. Te pedimos que mantengas actualizada tu información de contacto para enviarte información al cerrar los proyectos</p>
                <button
                    onClick={handleRedirect}
                    className="bg-moss-green  text-xl w-60 h-14 rounded-full hover:bg-green-700"> Ver más proyectos</button>
            </section>
        </main>
    )
}