import React from 'react';

interface Payment {
    id: string;
    date: string;
    amount: string;
    method: string;
    status: string;
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
                        <th className="py-2 px-4">Monto</th>
                        <th className="py-2 px-4">Método</th>
                        <th className="py-2 px-4">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id} className="border-b border-gray-300 dark:border-gray-700">
                            <td className="py-2 px-4">{payment.id}</td>
                            <td className="py-2 px-4">{payment.date}</td>
                            <td className="py-2 px-4">{payment.amount}</td>
                            <td className="py-2 px-4">{payment.method}</td>
                            <td
                                className={`py-2 px-4 ${payment.status === 'Completado'
                                    ? 'text-primary-600'
                                    : 'text-red-600'
                                    }`}
                            >
                                {payment.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentsTable;
