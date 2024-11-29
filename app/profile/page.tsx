"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    id: "",
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

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
      if (formData[key] !== "" && formData[key] !== undefined) {
        acc[key] = formData[key];
      }
      return acc;
    }, {} as Partial<typeof formData>);

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
        const errorData = await response.json();
        console.error("Error details:", errorData);
        throw new Error(errorData.message || "Error al actualizar los datos");
      }

      const updatedData = await response.json();

      setFormData((prev) => ({
        ...prev,
        ...updatedData,
      }));

      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      alert(error.message || "Error al actualizar los datos");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user?.id) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/users/id/${session.user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });

        const profile = await response.json();
        setFormData(profile);
      }
    };

    fetchProfile();
  }, [session?.user?.id]);

  if (!session || status === "loading") {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {showSuccessAlert && (
        <div
          id="alert-border-3"
          className="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800"
          role="alert"
        >
          <svg
            className="flex-shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <div className="ms-3 text-sm font-medium">
            Cambios actualizados exitosamente.
          </div>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">Editar perfil</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userName" className="block text-sm font-semibold">
            Nombre de usuario
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-semibold">
            Nombre
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-semibold">
            Apellido
          </label>
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
          <label htmlFor="email" className="block text-sm font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        {/* <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-semibold">
            Dirección
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div> */}
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

