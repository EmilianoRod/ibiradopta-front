"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter

function ApoyarCard() {
  const { data: session, status } = useSession();
  const [cantidad, setCantidad] = useState(1); // Cantidad de árboles a adoptar
  const [metodoPago, setMetodoPago] = useState(""); // Método de pago seleccionado
  const router = useRouter(); // Inicializa useRouter

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
          body: JSON.stringify([{
            id: "1",
            name: "Reforestación del Parque Nacional Quebrada de los Cuervos",
            description: "Iniciativa para plantar 5,000 árboles nativos en el parque.",
            imageUrl: "https://7maravillas.uy/wp-content/uploads/2021/01/quebrada-cuervos-foto-uruguay-natural.jpg",
            location: "Treinta y Tres, Uruguay",
            quantity: cantidad,
            unitPrice: 1000,
          }]),
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

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100 py-12 px-4"
      style={{ backgroundImage: "url('/fondo-hojas.png')" }}
    >
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold text-center mb-6">APOYAR</h2>

        {/* Selector de cantidad */}
        <div className="mb-6">
          <p className="mb-2">Seleccione cantidad de árboles a adoptar</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleCantidadChange("decrement")}
              className="px-3 py-2 bg-gray-700 rounded-md"
            >
              -
            </button>
            <span className="text-xl">{cantidad}</span>
            <button
              onClick={() => handleCantidadChange("increment")}
              className="px-3 py-2 bg-gray-700 rounded-md"
            >
              +
            </button>
          </div>
        </div>

        {/* Selector de método de pago */}
        <div className="mb-6">
          <p className="mb-2">Seleccione método de pago</p>
          <select
            className="w-full p-2 rounded-md text-black"
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
          >
            <option value="" disabled>
              Seleccione un método
            </option>
            <option value="Tarjeta de crédito">Tarjeta de crédito</option>
            <option value="Tarjeta de débito">Tarjeta de débito</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>

        {/* Botón para ir a pagar */}
        <button
          className="w-full px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700"
          onClick={handleRedireccion}
        >
          Ir a Pagar
        </button>
      </div>
    </div>
  );
}

export default ApoyarCard;