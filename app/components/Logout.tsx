import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import federatedLogout from "../utils/federatedLogout";

const getUserInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");
};

export default function Logout() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [initials, setInitials] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState(false); // Estado para el rol de administrador
  const router = useRouter();

  useEffect(() => {

    if (session?.user?.name) {
      setInitials(getUserInitials(session.user.name));
    }
    // Verificar si el usuario tiene el rol de administrador
    if (session?.user?.roles?.includes("Administrador")) {
      setIsAdmin(true);
    }
  }, [session?.user?.name]); // Dependencia en la sesión para actualizar al cambiar

  const handleProfileClick = () => {
    router.push("/profile");
    setIsMenuOpen(false);
  };

  const handleInformeClick = () => {
    router.push("/report");
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await federatedLogout();
    setIsMenuOpen(false);
    router.push("/");
  };

  return (
    <div className="relative flex items-center space-x-2">
      {/* Avatar */}
      <div
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center justify-center w-10 h-10 bg-moss-green text-white rounded-full cursor-pointer"
      >
        {initials}
      </div>

      {/* Menú desplegable */}
      {isMenuOpen && (
        <div className="absolute left-full top-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10">
          <button
            onClick={handleProfileClick}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
          >
            Perfil
          </button>
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
