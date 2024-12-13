"use client";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter(); // Inicializa el hook de router

  const handleRedirect = () => {
    router.push("/proyectos"); // Redirige a la URL /proyectos
  };

    return (
      <main id="HeroSection" className="py-10 bg-cover bg-center bg-no-repeat font-Poppins" style={{ backgroundImage: "url('/arbol_fondo.png')" }}>
        <div className="container mx-auto flex flex-col items-center lg:items-start space-y-8 py-20 lg:py-52 px-4 lg:px-24">
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold text-center lg:text-left">Plantá un árbol, transformá el futuro</h1>
          <p className="text-white text-xl sm:text-2xl lg:text-3xl text-center lg:text-left">
            Un pequeño gesto puede crear un cambio gigante. Adopta un árbol hoy y forma parte de un movimiento global para restaurar nuestro planeta...
          </p>
          <button
            onClick={handleRedirect} // Asocia el evento de clic con la función handleRedirect
            className="bg-moss-green text-white text-xl sm:text-2xl lg:text-3xl w-40 sm:w-60 lg:w-80 h-15 sm:h-14 lg:h-16 border-dotted border-2 rounded-full hover:bg-green-700">QUIERO PLANTAR</button>
        </div>
      </main>
    );
  };

  export default HeroSection;