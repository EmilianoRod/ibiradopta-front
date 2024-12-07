"use client";

import { useRouter } from "next/navigation"; 
import { useState } from "react";
import Image from "next/image";

function Projects() {
  const router = useRouter(); // Inicializar el router
  const [activeIndex, setActiveIndex] = useState(1);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const projects = [
    {
      title: "Reforestación del Parque Nacional Quebrada de los Cuervos",
      image: "/quebrada-cuervos.jpg",
      alt: "Parque Nacional Quebrada de los Cuervos",
      description:
        "Iniciativa para plantar 5.000 árboles nativos en el parque. Destinada a recuperar los bosques nativos para proteger las fuentes de agua y la fauna local.<br><br>" +
        "Lugar: Treinta y Tres, Uruguay.<br>" +
        "Fecha finalización: 15/05/2025",
    },
    {
      title: "Reforestación de la cuenca del Río Santa Lucía",
      image: "/rio-santa-lucia.jpg",
      alt: "Cuenca del Río Santa Lucía",
      description:
        "Iniciativa para reforestar la cuenca del Río Santa Lucía mediante la plantación de 3.500 árboles nativos. El objetivo es mejorar la calidad del agua, restaurar los ecosistemas y fomentar la biodiversidad en la región.<br><br>" +
        "Lugar: Canelones, Uruguay.<br>" +
        "Fecha finalización: 10/08/2025.",
    },
    {
      title: "Reforestación en la Sierra de las Ánimas",
      image: "/sierras-animas.jpg",
      alt: "Sierra de las Ánimas",
      description:
        "Proyecto para plantar 4.000 árboles autóctonos en la Sierra de las Ánimas. La iniciativa busca restaurar los suelos degradados, fortalecer los corredores biológicos y proteger las especies endémicas de la región.<br><br>" +
        "Lugar: Maldonado, Uruguay.<br>" +
        "Fecha finalización: 20/11/2025.",
    },
  ];

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    setSelectedProject(null);
  };

  const handleShowMoreClick = (index: number) => {
    if (index === activeIndex) {
      setSelectedProject(projects[index].description);
    }
  };

  const handleApoyarClick = () => {
    // Redirigir a la página de pago con datos del proyecto
    router.push(`/pago?proyecto=${encodeURIComponent(projects[activeIndex].title)}`);
  };

  return (
    <section
      className="relative max-w-full mx-auto px-5 py-20 text-white"
      style={{ backgroundImage: "url('/fondo-hojas.png')" }}
    >
      <div className="mb-14"></div>

      {/* Carrusel de tarjetas */}
      <div className="flex justify-center items-center gap-8 overflow-hidden transition-transform duration-500 opacity-95">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`relative flex flex-col items-center shadow-lg cursor-pointer transition-all duration-500 bg-gray-800 rounded-lg p-6 ${
              index === activeIndex
                ? "w-[420px] h-[480px] scale-110 z-10"
                : "w-[320px] h-[380px] scale-90 opacity-70"
            }`}
            onClick={() => handleCardClick(index)}
          >
            <h2 className="text-lg font-bold text-center mb-4">
              {project.title}
            </h2>
            <div className="relative w-full h-[300px] rounded-lg overflow-hidden shadow-md">
              <Image
                src={project.image}
                alt={project.alt}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <button
              className={`mt-6 mb-6 px-4 py-2 text-white rounded-full transition ${
                index === activeIndex
                  ? "bg-green-600 hover:bg-green-500 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleShowMoreClick(index);
              }}
              disabled={index !== activeIndex}
            >
              Saber más
            </button>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="mt-16 bg-white-50 rounded-lg shadow-lg flex flex-col items-center p-10 relative border-black">
          <h1 className="text-4xl font-bold mb-4 text-black">
            Descripción del proyecto
          </h1>
          <h2 className="text-2xl font-bold mb-4 text-black">
            {projects[activeIndex].title}
          </h2>
          <p
            className="text-gray-700 font-bold text-center mb-8"
            dangerouslySetInnerHTML={{
              __html: selectedProject,
            }}
          />
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
            onClick={handleApoyarClick} // Redirige al hacer clic
          >
            Apoyar
          </button>
        </div>
      )}

      <div className="mt-24"></div>
    </section>
  );
}

export default Projects;
