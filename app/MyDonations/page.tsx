"use client";

import AdoptedTreesCarousel from '../components/MyDonations/AdoptedTreesCarousel';
import PaymentsTable from '../components/MyDonations/PaymentsTable';
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";
import { fetchPaymentsByUserId } from '../utils/fetchPaymentsByUserId';

const MyDonations = () => {

    const { data: session } = useSession();
    const [payments, setPayments] = useState([]); // Estado para almacenar los pagos
    const [projects, setProjects] = useState([]); // Estado para almacenar proyectos únicos
    const accessToken = session?.accessToken;

    // Obtiene los pagos del usuario
    useEffect(() => {
        const fetchData = async () => {
            if (accessToken && session?.user.id) {
                try {
                    // Fetch de pagos
                    const result = await fetchPaymentsByUserId(accessToken, session.user.id);
                    setPayments(result); // Almacena los pagos en el estado

                    // Procesar los proyectos únicos
                    const uniqueProjects = result.map(payment => {
                        // Buscar la imagen con imageOrder = 1 o la primera imagen si no hay
                        const image = payment.project.images.find(img => img.imageOrder === 1) || payment.project.images[0];

                        return {
                            id: payment.project.id,
                            name: payment.project.name,
                            location: payment.project.location,
                            date: payment.project.endDate,
                            imageUrl: image?.imageUrl || '', // Si no hay imagen, deja la URL en vacío
                        };
                    });

                    // Eliminar proyectos duplicados basados en el `id`
                    const uniqueProjectsSet = uniqueProjects.filter((value, index, self) =>
                        index === self.findIndex((t) => (
                            t.id === value.id
                        ))
                    );

                    setProjects(uniqueProjectsSet); // Establece los proyectos únicos en el estado
                } catch (error) {
                    console.error("Error al obtener los pagos:", error);
                    setPayments([]); // En caso de error, puedes establecer un array vacío
                }
            }
        };

        fetchData();
    }, [accessToken, session?.user.id]); // Ejecutar solo cuando accessToken o session.user.id cambien


    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">

            {/* Header */}
            <header className="bg-moss-green text-white py-6">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-Righteous">Historial de Proyectos y Donaciones</h1>
                    <p className="text-sm font-Poppins">Consulta los proyectos en los que participas y pagos realizados.</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">

                {/* Adopted Trees Section */}
                <section className="mb-8 animate-fade-in w-full">
                    <h2 className="text-xl font-Poppins font-semibold mb-4">Proyectos seleccionados por vos</h2>
                    <div className="w-full">
                        <AdoptedTreesCarousel projectsList={projects} />
                    </div>
                </section>

                {/* Payments History Section */}
                <section className="animate-fade-in-delay">
                    <h2 className="text-xl font-Poppins font-semibold mb-4">Historial de Donaciones</h2>
                    <PaymentsTable payments={payments} />
                </section>
            </main>

        </div>
    );
};

export default MyDonations;
