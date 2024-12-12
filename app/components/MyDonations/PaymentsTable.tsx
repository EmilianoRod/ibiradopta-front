import React from 'react';
import generatePDF from './generatePDF';

interface Payment {
    id: number;
    quantity: number;
    amount: number;
    date: string;
    userId: string;
    project: Project;
    user: User;
}
export interface Project {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    location: string;
    endDate: string;
    price: number;
    isFinished: number;
    images: { imageUrl: string; imageOrder: number }[]; // Lista de imágenes
}

export interface User {
    id: number;
    userName: string;
    email: string;
}

interface PaymentsTableProps {
    payments: Payment[];
}

const PaymentsTable: React.FC<PaymentsTableProps> = ({ payments }) => {


    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
            <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    <tr>
                        <th className="py-2 px-4">ID de Pago</th>
                        <th className="py-2 px-4">Fecha</th>
                        <th className="py-2 px-4">Arboles</th>
                        <th className="py-2 px-4">Monto</th>
                        <th className="py-2 px-4">Proyecto</th>
                        <th className="py-2 px-4">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id} className="border-b border-gray-300 dark:border-gray-700">
                            <td className="py-2 px-4">{payment.id}</td>
                            <td className="py-2 px-4">{payment.date}</td>
                            <td className="py-2 px-4">{payment.quantity}</td>
                            <td className="py-2 px-4">{payment.amount}</td>
                            <td className="py-2 px-4">{payment.project.name}</td>
                            <td className="py-2 px-4">
                                <button
                                    onClick={() => generatePDF(payment)}
                                    //disabled={payment.status !== "Completado"}
                                    className={`py-1 px-3 rounded bg-gray-200 text-moss-green font-bold hover:bg-moss-green hover:text-white`

                                    }
                                >
                                    Descargar Factura
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentsTable;
