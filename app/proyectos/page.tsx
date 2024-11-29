'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useSession, signIn } from "next-auth/react";

// Definimos la interfaz para los proyectos
interface Project {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  endDate: string; // Fecha en formato string (ISO 8601: "yyyy-mm-dd")
  isFinished: number; // 0 o 1
  price: number;
}

function Projects() {
  const { data: session } = useSession(); // Hook para gestionar la sesión
  const router = useRouter(); // Inicializar el router
  const [activeIndex, setActiveIndex] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]); // Estado para proyectos
  const [showArrows, setShowArrows] = useState(false); // Para controlar si se deben mostrar las flechas

  // Refs para controlar el scroll
  const detailsSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/projects/getall`);
        const data = await response.json();

        // Filtrar proyectos con isFinished igual a 0
        const activeProjects = data.filter((project: any) => project.isFinished === 0);
        setProjects(activeProjects);

        // Si hay más de 3 proyectos, mostrar flechas
        if (activeProjects.length > 3) {
          setShowArrows(true);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    setSelectedProject(null);

    // Scroll hacia arriba cuando cambias la tarjeta seleccionada
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowMoreClick = (index: number) => {
    if (index === activeIndex) {
      setSelectedProject(projects[index]);
      // Desplazar a la sección de detalles
      detailsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const handleApoyarClick = () => {
    const selectedProjectId = projects[activeIndex]?.id;

    if (!session) {
      // Redirige al login si el usuario no está autenticado
      signIn("keycloak", {
        callbackUrl: `/pago?proyecto=${encodeURIComponent(selectedProjectId)}`,
      });
    } else {
      // Redirige directamente a la página de pagos si está autenticado
      router.push(`/pago?proyecto=${encodeURIComponent(selectedProjectId)}`);
    }
  };

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));

        // Scroll hacia arriba
        window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1));

        // Scroll hacia arriba
        window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calcular los proyectos que deben mostrarse (3 proyectos alrededor del activo)
  const getVisibleProjects = () => {
    const start = Math.max(0, activeIndex - 1);
    const end = Math.min(projects.length, activeIndex + 2); // Mostrar 3 proyectos
    return projects.slice(start, end);
  };

  return (
    <section
      className="relative max-w-full mx-auto px-5 py-20 text-white"
      style={{ backgroundImage: "url('/fondo-hojas.png')" }}
    >
      <div className="mb-14"></div>

      {/* Carrusel de tarjetas */}
      <div className="flex justify-center items-center gap-8 overflow-hidden transition-transform duration-500 opacity-95 relative">
        {showArrows && (
          <button
            onClick={handlePrevClick}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full"
          >
            &lt;
          </button>
        )}

        <div className="flex gap-8 transition-transform duration-2000">
          {getVisibleProjects().map((project, index) => {
            const projectIndex = projects.indexOf(project); // Obtener el índice real del proyecto
            return (
              <div
                key={projectIndex}
                className={`relative flex flex-col items-center shadow-lg cursor-pointer transition-all duration-100 bg-gray-800 rounded-lg p-6 ${projectIndex === activeIndex
                  ? 'w-[420px] h-[480px] scale-110 z-10 rounded-lg ' // Aquí se asegura que la tarjeta seleccionada tenga bordes redondeados
                  : 'w-[320px] h-[380px] scale-90 opacity-70' // Aseguramos que las tarjetas fuera de foco tengan bordes redondeados también
                  }`}
                onClick={() => handleCardClick(projectIndex)}
              >
                <h2 className="text-lg font-bold text-center mb-4">{project.name}</h2>
                <div className="relative w-full h-[300px] rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={project.imageUrl}
                    alt={project.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <button
                  className={`mt-6 mb-6 px-4 py-2 text-white rounded-full transition ${projectIndex === activeIndex
                    ? 'bg-green-600 hover:bg-green-500 cursor-pointer'
                    : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShowMoreClick(projectIndex);
                  }}
                  disabled={projectIndex !== activeIndex}
                >
                  Saber más
                </button>
              </div>
            );
          })}
        </div>

        {showArrows && (
          <button
            onClick={handleNextClick}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-black p-2 rounded-full"
          >
            &gt;
          </button>
        )}
      </div>

      {/* Mostrar detalles del proyecto seleccionado */}
      <div ref={detailsSectionRef}>
        {selectedProject && (
          <div className="mt-16 bg-white-50 rounded-lg shadow-lg flex flex-col items-center p-10 relative border-black">
            <h1 className="text-4xl font-bold mb-4 text-black">Descripción del proyecto</h1>
            <h2 className="text-2xl font-bold mb-4 text-black">{selectedProject.name}</h2>
            <p className="text-gray-700 mb-4 text-center">{selectedProject.description}</p>
            <p className="text-gray-700 mb-4 text-center"><strong>Ubicación:</strong> {selectedProject.location}</p>
            <p className="text-gray-700 mb-8 text-center"><strong>Fecha de finalización:</strong> {selectedProject.endDate}</p>
            <button
              className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
              onClick={handleApoyarClick} // Redirige al hacer clic
            >
              Apoyar
            </button>
          </div>
        )}
      </div>

      <div className="mt-24"></div>
    </section>
  );
}

export default Projects;
