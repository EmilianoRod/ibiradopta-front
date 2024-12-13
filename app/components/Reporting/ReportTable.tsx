import React, { useState } from 'react';

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

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'date',
    direction: 'asc'
  });

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

  // Función para manejar la ordenación
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Ordenar los datos según el criterio y dirección
  const sortedData = [...data].sort((a, b) => {
    let aValue = a[sortConfig.key as keyof ReportData];
    let bValue = b[sortConfig.key as keyof ReportData];

    // Verificar si estamos ordenando por una propiedad anidada (como project.name o user.userName)
    if (sortConfig.key === 'project.name') {
      aValue = a.project.name;
      bValue = b.project.name;
    } else if (sortConfig.key === 'user.userName') {
      aValue = a.user.userName;
      bValue = b.user.userName;
    }

    // Si estamos ordenando por una propiedad de tipo string (como nombre del proyecto o usuario)
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    // Si estamos ordenando por un número (como cantidad o monto)
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });


  return (
    <div className="flex space-x-4 mt-4 mx-4 mb-8">
      {/* Sección de la tabla */}
      <div className="flex-1 overflow-y-auto max-h-[500px]">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-yellow-500">
              <th className="px-4 py-2 text-left border-b cursor-pointer" onClick={() => handleSort('date')}>
                <div className="flex justify-left items-center">
                  <span>Fecha</span>
                  {sortConfig.key === 'date' && (<span className='ml-2'>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th className="px-4 py-2 text-left border-b cursor-pointer" onClick={() => handleSort('project.name')}>
                <div className="flex justify-left items-center">
                  <span>Nombre del Proyecto</span>
                  {sortConfig.key === 'project.name' && (<span className='ml-2'>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th className="px-4 py-2 text-left border-b cursor-pointer" onClick={() => handleSort('user.userName')}>
                <div className="flex justify-left items-center">
                  <span>Usuario</span>
                  {sortConfig.key === 'user.userName' && (<span className='ml-2'>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th className="px-4 py-2 text-left border-b cursor-pointer" onClick={() => handleSort('quantity')}>
                <div className="flex justify-left items-center">
                  <span>Árboles</span>
                  {sortConfig.key === 'quantity' && (<span className='ml-2'>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}

                </div>
              </th>
              <th className="px-4 py-2 text-left border-b cursor-pointer" onClick={() => handleSort('amount')}>
                <div className="flex justify-left items-center">
                  <span>Monto</span>
                  {sortConfig.key === 'amount' && (<span className='ml-2'>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((entry) => (
              <tr key={entry.id} className="hover:bg-yellow-50">
                <td className="px-4 py-2 border-b">{new Date(entry.date).toLocaleDateString('es-UY', { timeZone: 'UTC' })}</td>
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