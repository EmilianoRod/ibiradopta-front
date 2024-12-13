"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import federatedLogout from "@/app/utils/federatedLogout";
import Link from "next/link";
import MyDonationsButton from "@/app/MyDonations/MyDonationsButtom";

const getUserInitials = (name: string) => {
    return name
        .split(" ")
        .map((word) => word[0])
        .join("");
};

const HamMenu = () => {
    const { data: session } = useSession();
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
    }, [session?.user?.name]);

    const handleProfileClick = () => {
        router.push("/profile");
        setIsMenuOpen(false);
    };

    const handleProjectManagementClick = () => {
        router.push("/admin/projects");
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
        <div >
            <div className="flex flex-col items-center space-x-2">
                {session ? (
                    <div
                        className=" avatar bg-moss-green text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                    >
                        {initials}
                    </div>) : (<></>)}
                {/* Menú */}
                <div className="w-full">
                    <ul className="flex flex-col lg:flex-row lg:space-x-10 space-y-2 lg:space-y-0 font-Poppins text-center lg:text-left items-center">
                        {session ? (
                            <li className="justify-center border-b-2 border-gray-300 w-full">
                                <button
                                    onClick={handleProfileClick}
                                    className="text-moss-green px-4 py-2 text-lg hover:text-green-700 text-shadow transition-all duration-200 transform hover:scale-105"
                                >
                                    Perfil
                                </button>
                            </li>) : (<></>)}

                        {isAdmin && (
                            <li className="border-b-2 border-gray-300 w-full">
                                <button
                                    onClick={handleProjectManagementClick}
                                    className="text-moss-green px-4 py-2 text-lg hover:text-green-700 text-shadow transition-all duration-200 transform hover:scale-105"
                                >
                                    Administración de Proyectos
                                </button>
                            </li>
                        )}

                        {isAdmin && (
                            <li className="border-b-2 border-gray-300 w-full">
                                <button
                                    onClick={handleInformeClick}
                                    className="text-moss-green px-4 py-2 text-lg hover:text-green-700 text-shadow transition-all duration-200 transform hover:scale-105"
                                >
                                    Informes
                                </button>
                            </li>
                        )}

                        {session ? (
                            <>
                                <li className="border-b-2 border-gray-300 lg:border-none w-full"
                                // onClick={handleOptionClick}
                                >
                                    <MyDonationsButton />
                                </li>
                            </>
                        ) : (
                            <></>
                        )}
                        <li className="border-b-2 border-gray-300 lg:border-none w-full">
                            <Link href="/" className="text-moss-green block px-4 py-2 text-lg lg:text-2xl hover:text-green-700 text-shadow transition-all duration-200 transform hover:scale-105"
                            //onClick={handleOptionClick}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="border-b-2 border-gray-300 lg:border-none w-full">
                            <Link href="/explorar" className="text-moss-green block px-4 py-2 text-lg lg:text-2xl hover:text-green-700 text-shadow transition-all duration-200 transform hover:scale-105"
                            //onClick={handleOptionClick}
                            >
                                Explorar
                            </Link>
                        </li>
                        {session ? (
                            <li className="border-b-2 border-gray-300 w-full">
                                <button
                                    onClick={handleLogout}
                                    className="text-moss-green px-4 py-2 text-lg hover:text-green-700 text-shadow transition-all duration-200 transform hover:scale-105"
                                >
                                    Cerrar sesión
                                </button>
                            </li>) : (<></>)}
                    </ul>

                </div>
            </div>
        </div >
    );
};

export default HamMenu;
