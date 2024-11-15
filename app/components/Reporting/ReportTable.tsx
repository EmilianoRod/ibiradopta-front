import React from 'react';

// Tipos para los datos de reporte
interface User {
  id: string;
  userName: string;
  email: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  endDate: string;
  isFinished: boolean;
}

interface ReportData {
  id: number;
  amount: number;
  date: string;
  user: User;
  project: Project;
}

interface ReportTableProps {
  data: ReportData[];
}

const ReportTable: React.FC<ReportTableProps> = ({ data }) => {
  return (
    <div className="report-table">
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Cantidad Árboles Plantados</th>
            <th>Nombre del Proyecto</th>
            <th>Fecha</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.user.userName}</td>
              <td>{entry.amount}</td>
              <td>{entry.project.name}</td>
              <td>{new Date(entry.date).toLocaleDateString()}</td>
              <td>{`$${entry.amount}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;