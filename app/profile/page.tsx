"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    fechaNacimiento: "",
  });

  // Rellena los valores iniciales de `formData` al cargar el componente
  useEffect(() => {
    if (session?.user) {
      const [firstName, lastName] = session.user.name?.split(" ") || ["", ""];
      setFormData({
        id: session.user.id || "",
        name: firstName || "",
        lastName: lastName || "",
        email: session.user.email || "",
        password: "",
        address: session.user.address || "",
        fechaNacimiento: session.user.fechaNacimiento || "",
      });
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = Object.keys(formData).reduce((acc, key) => {
      if (formData[key as keyof typeof formData] !== "" && formData[key as keyof typeof formData] !== undefined) {
        acc[key] = formData[key as keyof typeof formData];
      }
      return acc;
    }, {} as Partial<typeof formData>);

    console.log("Body enviado:", body);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/users/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          console.error("Error details:", errorData);
          throw new Error(errorData.message || "Error al actualizar los datos");
        } else {
          const errorText = await response.text();
          console.error("Error details (non-JSON):", errorText);
          throw new Error("Error al actualizar los datos");
        }
      }

      alert("Datos actualizados exitosamente");
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      alert(error.message || "Error al actualizar los datos");
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
          <label htmlFor="address" className="block text-sm font-semibold">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
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
