"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchPayments, Payment } from "../utils/fetchPayments";

function hasAdminRole(session: any): boolean {
  return session?.user?.roles?.includes("Administrador");
}

export default function PaymentsTable() {
  const { data: session } = useSession();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session ){//&& hasAdminRole(session)) {
      fetchPayments(session.accessToken as string, {
        // Puedes agregar filtros aquí si es necesario
        projectId: 1,
        startDate: "2024-01-01",
        endDate: "2024-12-31",
      })
        .then((data) => setPayments(data))
        .catch((error) => setError(error.message));
    }
  }, [session]);

  if (!session) {
    return <p>Loading...</p>;
  }

  if (!hasAdminRole(session)) {
    return <p>No tienes permisos para ver esta información.</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Amount</th>
          <th>Date</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Project</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((payment) => (
          <tr key={payment.id}>
            <td>{payment.id}</td>
            <td>{payment.amount}</td>
            <td>{payment.date}</td>
            <td>{payment.user.userName}</td>
            <td>{payment.user.email}</td>
            <td>
              <img
                src={payment.project.imageUrl}
                alt={payment.project.name}
                width="50"
                height="50"
              />
              <p>{payment.project.name}</p>
              <p>{payment.project.location}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
