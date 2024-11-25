"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function ApoyarCard() {
  const router = useRouter();
  const [cantidad, setCantidad] = useState(1);
  const [metodoPago, setMetodoPago] = useState("");

  const handleCantidadChange = (type: string) => {
    setCantidad((prev) => (type === "increment" ? prev + 1 : Math.max(1, prev - 1)));
  };

  const handleRedireccion = () => {
    router.push(`/pago?cantidad=${cantidad}&metodo=${metodoPago}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12 px-4" style={{ backgroundImage: "url('/fondo-hojas.png')" }}>
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold text-center mb-6">APOYAR</h2>
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
            <option value="Tarjeta de debito">Tarjeta de débito</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>
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
