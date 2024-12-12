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


  return (
    <div className="relative flex items-center space-x-2">
      <div
        className="avatar bg-moss-green text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {initials}
      </div>
      {/* Menú desplegable */}
      {isMenuOpen && (
        <div className="absolute right-0  top-0 mt-12 w-40 bg-white border rounded-md shadow-lg z-50">
          <button
            onClick={handleProfileClick}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
          >
            Perfil
          </button>
          {isAdmin && (
            <button
              onClick={handleProjectManagementClick}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
            >
              Administración de Proyectos
            </button>
          )}
          {isAdmin && (
            <button
              onClick={handleInformeClick}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
            >
              Informes
            </button>
          )}
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
