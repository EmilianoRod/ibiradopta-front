
"use client";

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface TreeCardProps {
    imageSrc: string;
    title: string;
    adoptionDate: string;
    location: string;
}

const TreeCard: React.FC<TreeCardProps> = ({ imageSrc, title, adoptionDate, location }) => {
    return (
        <div className="bg-primary-100 rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <div className="relative h-64 w-full mb-3">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover rounded-md"
                />
            </div>
            <h3 className="text-xl font-Righteous font-bold text-primary-900 mb-2">
                {title}
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-1">
                Adoptado el: {adoptionDate}
            </p>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-4">
                Ubicación: {location}
            </p>
            <Link
                href={`/trees/${title.toLowerCase().replace(/ /g, '-')}`}
                className="mt-4 bg-primary-500 text-primary-50 py-3 px-5 rounded hover:bg-primary-600 block text-center"
            >
                Ver más detalles
            </Link>
        </div>
    );
};

export default TreeCard;
