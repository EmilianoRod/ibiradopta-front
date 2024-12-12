"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Project {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  endDate: string;
  isFinished: number;
  price: number;
  images: { imageUrl: string; imageOrder: number }[];
}

function ApoyarCard() {
  const { data: session, status } = useSession();
  const [cantidad, setCantidad] = useState(1);
  const [project, setProject] = useState<Project | null>(null);
  const router = useRouter();

  // Fetch query parameter manually
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("proyecto");

  // Fetch the project
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

  const total = cantidad * project.price;

  const handleCantidadChange = (type: string) => {
    setCantidad((prev) => (type === "increment" ? prev + 1 : Math.max(1, prev - 1)));
  };

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
      return data;
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
      return null;
    }
  };

  const handleRedireccion = async () => {
    if (!session?.user?.id) {
      alert("No se pudo obtener el ID del usuario. Por favor, inicia sesión.");
      return;
    }

    const url = await createPreference(session.user.id);
    if (url) {
      router.push(url.preferenceUrl);
    }
  };

  const selectedImage =
    project.images.find((img) => img.imageOrder === 1)?.imageUrl ||
    project.images[0]?.imageUrl ||
    "/default-image.jpg";

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
