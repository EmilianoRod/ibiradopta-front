"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();

  // Divide el nombre completo en nombre y apellido
  const [firstName, lastName] = session?.user?.name?.split(" ") || ["", ""];

  const [formData, setFormData] = useState({
    id: session?.user?.id || "",
    name: firstName || "",
    lastName: lastName || "",
    email: session?.user?.email || "",
    password: "",
    direction: session?.user?.direction || "",
    fechaNacimiento: session?.user?.fechaNacimiento || "",
  });

  const handleChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const body = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] !== "" && formData[key] !== undefined) {
        acc[key] = formData[key];
      }
      return acc;
    }, {} as Partial<typeof formData>);

    try {
      const response = await fetch("http://localhost:9090/users/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error details:", errorData);
        throw new Error("Error al actualizar los datos");
      }

      alert("Datos actualizados exitosamente");
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      alert("Error al actualizar los datos");
    }
  };

  if (!session) {
    return <div>No estás autenticado. Por favor, inicia sesión.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar perfil</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-semibold">Apellido</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="direction" className="block text-sm font-semibold">Direccion</label>
          <input
            type="text"
            id="direction"
            name="direction"
            value={formData.direction}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fechaNacimiento" className="block text-sm font-semibold">Fecha de nacimiento</label>
          <input
            type="text"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-moss-green text-white px-6 py-2 rounded-full hover:bg-green-700"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
