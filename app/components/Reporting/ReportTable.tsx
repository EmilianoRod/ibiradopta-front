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
  quantity: number;
  amount: number;
  date: string;
  user: User;
  project: Project;
}

interface ReportTableProps {
  data: ReportData[];
}



const ReportTable: React.FC<ReportTableProps> = ({ data }) => {

  // Calcular totales
  const totalQuantity = data.reduce((acc, entry) => acc + entry.quantity, 0);
  const totalAmount = data.reduce((acc, entry) => acc + entry.amount, 0);

  // Agrupar por proyecto
  const totalsByProject = data.reduce((acc: any, entry) => {
    if (!acc[entry.project.name]) {
      acc[entry.project.name] = { totalQuantity: 0, totalAmount: 0 };
    }
    acc[entry.project.name].totalQuantity += entry.quantity;
    acc[entry.project.name].totalAmount += entry.amount;
    return acc;
  }, {});


  return (
    <div className="flex space-x-4 mt-4 mx-4 mb-8">
      {/* Sección de la tabla */}
      <div className="flex-1 overflow-y-auto max-h-[500px]">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-yellow-500">
              <th className="px-4 py-2 text-left border-b">Fecha</th>
              <th className="px-4 py-2 text-left border-b">Nombre del Proyecto</th>
              <th className="px-4 py-2 text-left border-b">Usuario</th>
              <th className="px-4 py-2 text-left border-b">Árboles Plantados</th>
              <th className="px-4 py-2 text-left border-b">Monto</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry.id} className="hover:bg-yellow-50">
                <td className="px-4 py-2 border-b">{new Date(entry.date).toLocaleDateString('es-UY',{timeZone:'UTC' })}</td>
                <td className="px-4 py-2 border-b">{entry.project.name}</td>
                <td className="px-4 py-2 border-b">{entry.user.userName}</td>
                <td className="px-4 py-2 text-center border-b">{entry.quantity}</td>
                <td className="px-4 py-2 border-b">{`$${entry.amount.toFixed(2)}`}</td>
              </tr>
            ))}
          </tbody>

          {/* Fila de totales al final */}
          <tfoot>
            <tr className="bg-yellow-100 font-bold">
              <td className="px-4 py-2 text-center border-t" colSpan={3}>Totales</td>
              <td className="px-4 py-2 text-center border-t">{totalQuantity}</td>
              <td className="px-4 py-2 text-center border-t">{`$${totalAmount.toFixed(2)}`}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Sección de resumen tipo tabla con totales por proyecto */}
      <div className="w-1/2 p-4 bg-yellow-500 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Resumen de Totales por Proyecto</h2>
        
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-yellow-100">
              <th className="px-4 py-2 text-left border-b">Proyecto</th>
              <th className="px-4 py-2 text-left border-b">Árboles Plantados</th>
              <th className="px-4 py-2 text-left border-b">Monto</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(totalsByProject).map((projectName) => (
              <tr key={projectName} className="hover:bg-yellow-100">
                <td className="px-4 py-2 border-b">{projectName}</td>
                <td className="px-4 py-2 border-b">{totalsByProject[projectName].totalQuantity}</td>
                <td className="px-4 py-2 border-b">{`$${totalsByProject[projectName].totalAmount.toFixed(2)}`}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Resumen total general */}
        <div className="mt-4 font-semibold">
          <p>Total de Árboles Plantados: <span>{totalQuantity}</span></p>
          <p>Total Monto: <span>{`$${totalAmount.toFixed(2)}`}</span></p>
        </div>
      </div>
    </div>
  );
};

export default ReportTable;