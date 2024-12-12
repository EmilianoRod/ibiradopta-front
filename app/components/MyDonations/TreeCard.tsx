
"use client";

import Image from 'next/image';
// import Link from 'next/link';
import React from 'react';

interface TreeCardProps {
    id: number;
    imageSrc: string;
    title: string;
    endDate: string;
    location: string;
}

const TreeCard: React.FC<TreeCardProps> = ({ imageSrc, title, endDate, location }) => {
    // Convertir endDate a un objeto Date para comparación
    const endDateObj = new Date(endDate);
    const today = new Date();

    // Comparar si la fecha endDate es pasada o no
    const isPast = endDateObj < today;

    // Determinar el texto que se mostrará dependiendo de la fecha
    const fechaTexto = isPast ? 'Finalizó el' : 'Finaliza el';
    return (
        <div className="bg-gray-200 rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <div className="relative h-64 w-full mb-3">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover rounded-md"
                    priority
                />
            </div>
            <h3 className="text-xl font-Righteous font-bold text-moss-green mb-2">
                {title}
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-1">
            {fechaTexto}: {endDate}
            </p>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-4">
                Ubicación: {location}
            </p>
            {/* <Link
                href={`/trees/${id}`}
                className="mt-4 bg-primary-500 text-primary-50 py-3 px-5 rounded hover:bg-primary-600 block text-center"
            >
                Ver más detalles
            </Link> */}
        </div>
    );
};

export default TreeCard;
