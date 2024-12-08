"use client";

import PaymentsTable from '../components/MyDonations/PaymentsTable';
import React from 'react';
import TreeCard from '../components/MyDonations/TreeCard';

const trees = [
    {
        id: 1,
        imageSrc: '/recienPlantado.jpg',
        title: 'Roble Andino',
        adoptionDate: '2023-05-12',
        location: 'Bogotá, Colombia',
    },
    {
        id: 2,
        imageSrc: '/recienPlantado.jpg',
        title: 'Pino Patagónico',
        adoptionDate: '2023-06-20',
        location: 'Bariloche, Argentina',
    },
    {
        id: 3,
        imageSrc: '/recienPlantado.jpg',
        title: 'Pino Patagónico',
        adoptionDate: '2023-06-20',
        location: 'Bariloche, Argentina',
    },
    {
        id: 4,
        imageSrc: '/recienPlantado.jpg',
        title: 'Pino Patagónico',
        adoptionDate: '2023-06-20',
        location: 'Bariloche, Argentina',
    },
];

const payments = [
    {
        id: '12345',
        date: '2023-05-12',
        amount: '$25.00',
        method: 'Tarjeta de Crédito',
        status: 'Completado',
    },
    {
        id: '67890',
        date: '2023-06-15',
        amount: '$50.00',
        method: 'PayPal',
        status: 'Pendiente',
    },
    {
        id: '6782',
        date: '2023-06-15',
        amount: '$50.00',
        method: 'PayPal',
        status: 'Pendiente',
    },
    {
        id: '67640',
        date: '2023-06-15',
        amount: '$50.00',
        method: 'PayPal',
        status: 'Pendiente',
    },
    {
        id: '65490',
        date: '2023-06-15',
        amount: '$50.00',
        method: 'PayPal',
        status: 'Pendiente',
    },

];



const MyDonations = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">

            {/* Header */}
            <header className="bg-moss-green text-white py-6">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-Righteous">Historial de Árboles y Pagos</h1>
                    <p className="text-sm font-Poppins">Consulta tus adopciones y pagos realizados.</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Adopted Trees Section */}
                <section className="mb-8 animate-fade-in">
                    <h2 className="text-xl font-Poppins font-semibold mb-4">Árboles Adoptados</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trees.map((tree) => (
                            <TreeCard
                                key={tree.id}
                                imageSrc={tree.imageSrc}
                                title={tree.title}
                                adoptionDate={tree.adoptionDate}
                                location={tree.location}
                            />
                        ))}
                    </div>
                </section>

                {/* Payments History Section */}
                <section className="animate-fade-in-delay">
                    <h2 className="text-xl font-Poppins font-semibold mb-4">Historial de Pagos</h2>
                    <PaymentsTable payments={payments} />
                </section>
            </main>

        </div>
    );
};

export default MyDonations;
