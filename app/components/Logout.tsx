"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import federatedLogout from "../utils/federatedLogout";

const getUserInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("");
};

export default function Logout() {
  const { data: session, status } = useSession();
  const [initials, setInitials] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.name) {
      setInitials(getUserInitials(session.user.name));
    }

    if (session?.user?.roles?.includes("Administrador")) {
      setIsAdmin(true);
    }

    // Escuchar actualizaciones del perfil
    const handleProfileUpdate = (event: CustomEvent) => {
      if (event.detail.firstName && event.detail.lastName) {
        const fullName = `${event.detail.firstName} ${event.detail.lastName}`;
        setInitials(getUserInitials(fullName));
      }
    };

    window.addEventListener("profileUpdated", handleProfileUpdate);
    return () => window.removeEventListener("profileUpdated", handleProfileUpdate);
  }, [session?.user?.name]);

  const handleProfileClick = () => {
    router.push("/profile");
    setIsMenuOpen(false);
  };

  const handleProjectManagementClick = () => {
    router.push("/admin/projects"); // Redirigir al administrador a la página de administración de proyectos
    setIsMenuOpen(false);
  };

  const handleInformeClick = () => {
    router.push("/report");
    setIsMenuOpen(false);
  };


  const handleLogout = async () => {
    await federatedLogout();
    router.push("/");
  };

  // Manejadores de mouse para abrir y cerrar el menú
  const handleMouseEnter = () => {
    setIsMenuOpen(true); // Abrir menú cuando el cursor entra en el área del avatar
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false); // Cerrar menú cuando el cursor sale del área del avatar o del menú
  };


  return (
    <div className="relative flex items-center space-x-2">
      <div>
      <div
        className="avatar bg-moss-green text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        onMouseEnter={handleMouseEnter} // Abrir menú al pasar el cursor sobre el avatar

      >
        {initials}
      </div>
              {/* Menú desplegable con animación */}
        <div
          className={`absolute right-0 top-0 mt-12 w-40 bg-white border rounded-md shadow-lg z-50 
                      ${isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 delay-100"} 
                      transition-all duration-500 ease-out`}
          onMouseLeave={handleMouseLeave} // Cerrar menú al sacar el cursor del avatar
        >
          <button
            onClick={handleProfileClick}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-t-md transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
          >
            Perfil
          </button>
          {isAdmin && (
            <button
              onClick={handleProjectManagementClick}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200  transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
            >
              Administración de Proyectos
            </button>
          )}
          {isAdmin && (
            <button
              onClick={handleInformeClick}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
            >
              Informes
            </button>
          )}
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-b-md transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
