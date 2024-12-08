"use client";

import { useParams, useRouter } from "next/navigation";

import Image from "next/image";
import React from "react";

interface Adoption {
    id: number;
    imageSrc: string;
    title: string;
    adoptionDate: string;
    location: string;
    description: string;
}

const dummyAdoptions: Adoption[] = [
    {
        id: 1,
        imageSrc: "/recienPlantado.jpg",
        title: "Roble Andino",
        adoptionDate: "2023-05-12",
        location: "Bogotá, Colombia",
        description: "Un árbol robusto y de gran importancia ecológica.",
    },
    {
        id: 2,
        imageSrc: "/recienPlantado.jpg",
        title: "Pino Patagónico",
        adoptionDate: "2023-06-20",
        location: "Bariloche, Argentina",
        description: "Árbol característico de los bosques patagónicos.",
    },
];

const AdoptionDetailsPage = () => {
    const { id } = useParams(); // Obtener el ID desde la URL
    const router = useRouter();
    const adoption = dummyAdoptions.find((item) => item.id === Number(id));

    if (!adoption) {
        return <div>Adopción no encontrada</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">

            <div className="container mx-auto px-4 py-8" >

                {/* Botón Volver */}
                <div className="absolute mt-32 top-4 left-4">
                    <button
                        onClick={() => router.back()} // Función para volver atrás
                        className="bg-primary-900 text-primary-50 py-2 px-4 rounded hover:bg-primary-600 shadow-lg"
                    >
                        Volver
                    </button>
                </div>
                <h1 className="text-3xl font-Righteous text-primary-600 mb-4">{adoption.title}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Imagen del árbol */}
                    <div>
                        <Image
                            src={adoption.imageSrc}
                            alt={adoption.title}
                            width={400}
                            height={400}
                            className="w-full h-auto rounded-lg shadow"
                        />
                    </div>
                    {/* Detalles */}
                    <div>
                        <h2 className="text-xl font-Poppins mb-2">Detalles de la Adopción</h2>
                        <p className="mb-2">
                            <strong>Fecha de Adopción:</strong> {adoption.adoptionDate}
                        </p>
                        <p className="mb-2">
                            <strong>Ubicación:</strong> {adoption.location}
                        </p>
                        <p className="mb-4">{adoption.description}</p>
                        <button className="bg-primary-900 text-white py-2 px-4 rounded hover:bg-primary-600">
                            Descargar Certificado
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdoptionDetailsPage;
