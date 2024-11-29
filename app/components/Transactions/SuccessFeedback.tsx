"use client";

import { useRouter } from "next/navigation";


export const SuccessFeedback = () => {
    const router = useRouter();

    const handleRedirect = () => {
      router.push("/proyectos");
    };

    return (
        <main className="h-screen px-20 py-20 bg-cover flex justify-center" style={{ backgroundImage: "url('/fondo-hojas.png')" }}>
            <section className="rounded-2xl shadow-lg bg-black/75 font-Poppins space-y-20 text-white text-center w-1/2 content-center">
                <h1 className="text-3xl font-bold ">¡GRACIAS POR TU ADOPCIÓN!</h1>
                <p className="px-36 text-2xl">Tu aporte a sido recibido con éxito. Has apoyado al proyecto seleccionado y podrás hacer seguimiento desde la sección “Mis Proyectos”.Te pedimos que mantengas actualizada tu información de contacto para enviarte información al cerrar los proyectos</p>
                <button
                    onClick={handleRedirect}
                    className="bg-moss-green  text-2xl w-80 h-16 rounded-full hover:bg-green-700"> Ver más proyectos</button>
            </section>
        </main>
    )
}