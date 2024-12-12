"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
  images: { imageUrl: string; imageOrder: number }[]; // Lista de imágenes
}

function ApoyarCard() {
  const { data: session, status } = useSession();
  const [cantidad, setCantidad] = useState(1); // Cantidad de árboles a adoptar
  const [project, setProject] = useState<Project | null>(null); // Estado para el proyecto
  const router = useRouter(); // Inicializa useRouter
  const searchParams = useSearchParams(); // Hook para obtener parámetros de la URL

  // Obtén el id del proyecto desde los parámetros de la URL
  const id = searchParams.get("proyecto");

  // Fetch para obtener el proyecto
  useEffect(() => {
    if (!id) {
      console.error("No se proporcionó un ID válido en la URL.");
      return;
    }

    const fetchProject = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/projects/id/${id}`);
        if (!response.ok) {
          throw new Error(`Error al obtener el proyecto: ${response.status}`);
        }
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error("Error al cargar el proyecto:", error);
      }
    };

    fetchProject();
  }, [id]);

  if (!session || status === "loading") {
    return <div>Cargando...</div>;
  }

  if (!project) {
    return <div>Cargando datos del proyecto...</div>;
  }


  // Calcula el total basado en la cantidad y el precio por árbol
  const total = cantidad * project.price;

  // Maneja el cambio en la cantidad de árboles
  const handleCantidadChange = (type: string) => {
    setCantidad((prev) => (type === "increment" ? prev + 1 : Math.max(1, prev - 1)));
  };

  // Crea la preferencia llamando al backend
  const createPreference = async (userId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_GATEWAY_URL}/payments/createpreference?userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify([
            {
              id: project.id,
              name: project.name,
              description: project.description,
              imageUrl: project.imageUrl,
              location: project.location,
              quantity: cantidad,
              price: project.price,
            },
          ]),
        }
      );

      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.status}`);
      }

      const data = await response.json();
      return data; // Suponiendo que el backend devuelve una URL
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
    }
  };

  // Maneja la redirección y configuración de la preferencia
  const handleRedireccion = async () => {
    if (!session?.user?.id) {
      alert("No se pudo obtener el ID del usuario. Por favor, inicia sesión.");
      return;
    }

    const url = await createPreference(session.user.id);
    if (url) {
      router.push(url.preferenceUrl); // Redirige a la URL obtenida del backend
    }
  };

  if (!session || status === "loading") {
    return <div>Cargando...</div>;
  }

  // Lógica para mostrar la imagen
  const selectedImage = project.images.find(img => img.imageOrder === 1)?.imageUrl || project.images[0]?.imageUrl || '/default-image.jpg';


  return (
    <div
  className="flex justify-center items-center max-h-screen bg-gradient-to-r from-green-100 via-white to-green-100 py-12 px-4"
  style={{ backgroundImage: "url('/fondo-hojas.png')" }}
>
  <div className="bg-gray-800 text-white p-8 rounded-lg shadow-black shadow-2xl max-w-lg">
    <h2 className="text-xl font-bold text-center mb-6">{project.name}</h2>
    <p className="text-base mb-4">{project.description}</p>
    <img
      src={selectedImage}
      alt={project.name}
      className="w-full h-40 object-cover mb-4 rounded-lg shadow-md"
    />
    <p className="mb-2">
      <strong>Ubicación:</strong> {project.location}
    </p>
    <p className="mb-4">
      <strong>Precio por árbol:</strong> ${project.price}
    </p>

    {/* Selector de cantidad */}
    <div className="mb-6 space-y-4">
      <p className="text-sm">Seleccione cantidad de árboles a adoptar</p>
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={() => handleCantidadChange("decrement")}
          className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
        >
          -
        </button>
        <span className="text-xl">{cantidad}</span>
        <button
          onClick={() => handleCantidadChange("increment")}
          className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
        >
          +
        </button>
      </div>
    </div>

    {/* Muestra el total */}
    <p className="mb-6">
      <strong>Total:</strong> ${total}
    </p>

    {/* Botón para ir a pagar */}
    <button
      className="w-full px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-200"
      onClick={handleRedireccion}
    >
      Ir a Pagar
    </button>

    {/* Botón Volver */}
    <button
      className="w-full px-6 py-3 bg-gray-600 text-white rounded-full mt-4 hover:bg-gray-700 transition duration-200"
      onClick={() => router.back()}
    >
      Volver
    </button>
  </div>
</div>
  );
}

export default ApoyarCard;
