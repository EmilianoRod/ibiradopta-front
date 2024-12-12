"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

interface Project {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  price: number;
  isFinished: number;
}

const Projects: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_GATEWAY_URL}/projects/getall`
        );
        const data = await response.json();

        const activeProjects = data.filter(
          (project: Project) => project.isFinished === 0
        );

        setProjects(activeProjects);
        setShowArrows(activeProjects.length > 3);
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
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
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
    <div className="relative w-full max-w-7xl h-[50vh] lg:h-[700px] bg-gray-100 shadow-lg mx-auto my-10">
      {/* Carrusel */}
      <div className="relative h-full">
        {projects.map((project, index) => {
          const isMainVideo = index === currentIndex;
          const isNextVideo =
            (index + projects.length - currentIndex) % projects.length === 1;
          const isSecondNextVideo =
            (index + projects.length - currentIndex) % projects.length === 2;

          const zIndex = isMainVideo
            ? 20
            : isNextVideo
            ? 40
            : isSecondNextVideo
            ? 60
            : 20;

          return (
            <div
              key={project.id}
              className={`absolute top-1/2 transform -translate-y-1/2 rounded-2xl shadow-lg transition-all duration-500 ${
                isMainVideo
                  ? "left-0 w-full h-full rounded-none"
                  : isNextVideo
                  ? "left-2/3 w-[200px] h-[300px]"
                  : isSecondNextVideo
                  ? "left-[calc(50%+440px)] w-[200px] h-[300px]"
                  : "opacity-0"
              }`}
              style={{ zIndex }}
            >
              {/* Video */}
              <video
                className={`w-full h-full object-cover ${
                  isMainVideo ? "rounded-none" : "rounded-lg"
                }`}
                src={project.imageUrl}
                ref={(el) => (videoRefs.current[index] = el!)}
                loop
                muted={!isMainVideo}
              ></video>

              {/* Contenido */}
              {isMainVideo && (
                <div
                className="absolute top-1/2 left-[5%] md:left-[10%] w-[80%] md:w-[300px] text-left text-gray-200 transform -translate-y-1/2 font-sans bg-black bg-opacity-50 p-2 rounded-lg"
              >
                <div className="text-xl sm:text-2xl md:text-4xl uppercase font-bold">
                  {project.name}
                </div>
                <div className="mt-2 mb-5 text-sm md:text-base">
                  {project.description}
                </div>
                <div className="mt-2 text-xs md:text-sm">
                  Ubicación: {project.location}
                </div>
                <div className="text-xs md:text-sm">
                  Precio: ${project.price}
                </div>
                <button
                  className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-md cursor-pointer hover:bg-gray-600"
                  onClick={handleApoyarClick}
                >
                  Apoyar
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
          className="absolute bottom-5 w-full flex justify-between px-5 sm:px-10"
          style={{ zIndex: 100 }}
        >
          <button
            className="bg-gray-700 text-white px-3 sm:px-4 py-1 sm:py-2 rounded hover:bg-gray-600"
            onClick={handlePrev}
          >
            Anterior
          </button>
          <button
            className="bg-gray-700 text-white px-3 sm:px-4 py-1 sm:py-2 rounded hover:bg-gray-600"
            onClick={handleNext}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;
