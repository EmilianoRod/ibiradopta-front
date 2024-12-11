"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

interface Project {
  id: number;
  name: string;
  description: string;
  imageUrl: string; // Ruta del video
  location: string;
  price: number;
  isFinished: number; // 0 o 1
}

const FinishedProjects: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]); // Estado para los proyectos
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false); // Para mostrar flechas solo si hay más de 3 proyectos
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_GATEWAY_URL}/projects/getall`
        );
        const data = await response.json();

        const inactiveProjects = data.filter(
          (project: Project) => project.isFinished === 1
        );

        setProjects(inactiveProjects);

        if (inactiveProjects.length >= 3) {
          setShowArrows(true);
        }
      } catch (error) {
        console.error("Error al obtener proyectos:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.play(); // Reproduce el video seleccionado
        } else {
          video.pause(); // Pausa los demás videos
          video.currentTime = 0; // Reinicia los videos no seleccionados
        }
      }
    });
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleApoyarClick = () => {
    const selectedProjectId = projects[currentIndex]?.id;

    if (!session) {
      signIn("keycloak", {
        callbackUrl: `/pago?proyecto=${encodeURIComponent(selectedProjectId)}`,
      });
    } else {
      router.push(`/pago?proyecto=${encodeURIComponent(selectedProjectId)}`);
    }
  };

  return (
    <div className="relative w-[1200px] h-[700px] bg-gray-100 shadow-[0_30px_50px_rgba(219,219,219,1)] mx-auto my-20">
      {/* Carrusel */}
      <div className="relative h-full">
        {projects.map((project, index) => {
          const zIndex =
            index === currentIndex
              ? 50 // Video actual
              : (index + projects.length - currentIndex) % projects.length === 1
              ? 40 // Video siguiente
              : 60; // Videos restantes

          return (
            <div
              key={project.id}
              className={`absolute w-[200px] h-[300px] top-1/2 transform -translate-y-1/2 rounded-2xl shadow-[0_30px_50px_rgba(80,80,80,1)] transition-all duration-500 ${
                currentIndex === index
                  ? "left-0 w-full h-full rounded-none"
                  : currentIndex === (index + 1) % projects.length
                  ? "left-2/3"
                  : currentIndex === (index + 2) % projects.length
                  ? "left-[calc(50%+440px)]"
                  : "left-[calc(50%+440px)] opacity-0"
              }`}
              style={{ zIndex }}
            >
              {/* Video */}
              <video
                className="w-full h-full object-cover rounded-lg"
                src={project.imageUrl}
                ref={(el) => (videoRefs.current[index] = el!)} // Asignar referencia al video
                loop
                muted={index !== currentIndex} // Solo el video seleccionado tendrá sonido
              ></video>

              {/* Contenido */}
              {currentIndex === index && (
                <div className="absolute top-1/2 left-[100px] w-[300px] text-left text-gray-200 transform -translate-y-1/2 font-sans">
                  <div className="text-4xl uppercase font-bold">
                    {project.name}
                  </div>
                  <div className="mt-2 mb-5">{project.description}</div>
                  <div className="mt-2 text-sm">Ubicación: {project.location}</div>
                  
                  <button
                    className="mt-4 px-5 py-2 bg-gray-700 text-white rounded-md cursor-pointer"
                    // onClick={handleApoyarClick}
                    // images: { imageUrl: string; imageOrder: number }[]; // Lista de imágenes
                  > 
                    Ver más 
                  </button> 
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Botones de navegación */}
      {showArrows && (
        <div
          className="absolute bottom-5 w-full flex justify-between px-10"
          style={{ zIndex: 100 }} // Asegura que los botones estén delante de los videos
        >
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={handleNext}
          >
            Anterior
          </button>
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={handlePrev}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default FinishedProjects;