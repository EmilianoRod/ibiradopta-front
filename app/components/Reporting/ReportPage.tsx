"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
// import ReportFilters from "./ReportFilters";
// import ReportChart from "./ReportChart";
// import ExportButtons from "./ExportButtons";
import ReportTable from "./ReportTable";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";

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


const ReportPage: React.FC = () => {

    const { data: session } = useSession();
    const [allData, setAllData] = useState<ReportData[]>([]);  // Todos los datos
    const [filteredData, setFilteredData] = useState<ReportData[]>([]);
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        projectId: '',
        userName: '',
        minAmount: '',
        maxAmount: '',
    });

    // Función para obtener los datos de la API <--- Leo
    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/payments/filters`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            });
            const data = await response.json();

            // Ordenar los datos por fecha de forma descendente o ascendente según prefieras
            const sortedData = data.sort((a: ReportData, b: ReportData) => new Date(a.date).getTime() - new Date(b.date).getTime());
            setAllData(sortedData);  // Guardar todos los datos
            setFilteredData(sortedData);  // Inicialmente los datos filtrados son todos los datos

            // Establecer los filtros de fecha por el mes en curso
            const currentDate = new Date();
            const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

            setFilters({
                ...filters,
                startDate: startOfMonth.toISOString().split('T')[0],
                endDate: endOfMonth.toISOString().split('T')[0],
            });

            // Aplicar filtros iniciales (mes actual)
            const initialFilteredData = data.filter((item) => {
                const itemDate = new Date(item.date);
                return itemDate >= startOfMonth && itemDate <= endOfMonth;
            });

            setFilteredData(initialFilteredData);  // Inicialmente los datos filtrados por el mes actual

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Obtener los datos al cargar la página
    useEffect(() => {
        fetchData();
    }, []);

    // Función para manejar cambios en los filtros
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    // Función para aplicar los filtros
    const applyFilters = () => {
        let data = allData;

        // Filtro por rango de fechas
        if (filters.startDate) {
            data = data.filter((item) => new Date(item.date) >= new Date(filters.startDate));
        }
        if (filters.endDate) {
            data = data.filter((item) => new Date(item.date) <= new Date(filters.endDate));
        }

        // Filtro por proyecto
        if (filters.projectId) {
            data = data.filter((item) => item.project.id.toString() === filters.projectId);
        }

        // Filtro por usuario
        if (filters.userName) {
            data = data.filter((item) => item.user.userName === filters.userName);
        }

        // Filtro por monto mínimo y máximo
        if (filters.minAmount) {
            data = data.filter((item) => item.amount >= Number(filters.minAmount));
        }
        if (filters.maxAmount) {
            data = data.filter((item) => item.amount <= Number(filters.maxAmount));
        }

        setFilteredData(data);
    };

    // Limpiar los filtros y aplicar el filtro por defecto (mes actual)
    const clearFilters = () => {
        // Establecer los filtros al mes actual
        const currentDate = new Date();
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        // Restablecer los filtros a las fechas del mes actual
        setFilters({
            startDate: startOfMonth.toISOString().split('T')[0], // Inicio del mes actual
            endDate: endOfMonth.toISOString().split('T')[0], // Fin del mes actual
            projectId: '',
            userName: '',
            minAmount: '',
            maxAmount: '',
        });
    };

    // Cuando se actualizan los filtros, aplicamos los filtros automáticamente
    useEffect(() => {
        applyFilters();
    }, [filters]);  // Aplicamos los filtros cuando el estado 'filters' cambie



    // Exportar a PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        // Título centrado
        const title = "Informe de Actividades";
        const pageWidth = doc.internal.pageSize.getWidth(); // Obtiene el ancho de la página
        const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor; // Calcula el ancho del título
        const titleX = (pageWidth - titleWidth) / 2; // Calcula la posición X para centrar el título
        const titleY = 10; // Posición Y

        doc.text(title, titleX, titleY); // Dibuja el título centrado

        autoTable(doc, {
            head: [["Fecha", "Proyecto", "Usuario", "Árboles Plantados", "Monto"]],
            body: filteredData.map((entry) => [
                new Date(entry.date).toLocaleDateString(),
                entry.project.name,
                entry.user.userName,
                entry.quantity,
                `$ ${entry.amount}`,
            ]),
        });

        doc.save("reporte.pdf");
    };

    // Exportar a CSV
    const exportToCSV = () => {
        const csvData = filteredData.map((entry) => ({
            Usuario: entry.user.userName,
            "Árboles Plantados": entry.amount,
            Proyecto: entry.project.name,
            Fecha: new Date(entry.date).toLocaleDateString(),
            Monto: `$${entry.amount}`,
        }));

        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "reporte.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Datos para los gráficos
    // const projects = Array.from(new Set(filteredData.map((d) => d.project.name)));
    // const treesByProject = projects.map((project) =>
    //     filteredData.filter((d) => d.project.name === project).reduce((sum, d) => sum + d.amount, 0)
    // );
    // const totalAmounts = projects.map((project) =>
    //     filteredData.filter((d) => d.project.name === project).reduce((sum, d) => sum + d.amount, 0)
    // );
    // const dates = Array.from(new Set(filteredData.map((d) => d.date))).sort();
    // const amountsByDate = dates.map((date) =>
    //     filteredData.filter((d) => d.date === date).reduce((sum, d) => sum + d.amount, 0)
    // );



    return (
        <div>
            <h1 className="text-2xl pl-10 pt-5 font-Poppins font-bold">Informe de Actividades</h1>

            {/* Filtros */}
            <div className="mb-4 space-y-2">
                <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    placeholder="Fecha de inicio"
                    className="border border-gray-300 px-4 py-2 rounded-md"
                />
                <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                    placeholder="Fecha de fin"
                    className="border border-gray-300 px-4 py-2 rounded-md"
                />
                <select
                    name="projectId"
                    value={filters.projectId}
                    onChange={handleFilterChange}
                    className="border border-gray-300 px-4 py-2 rounded-md"
                >
                    <option value="">Seleccionar Proyecto</option>
                    {[...new Set(filteredData
                        .map((d) => d.project))]
                        .filter((value, index, self) => self.findIndex((p) => p.id === value.id) === index) // Elimina duplicados
                        .map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                </select>
                <input
                    type="text"
                    name="userName"
                    value={filters.userName}
                    onChange={handleFilterChange}
                    placeholder="Nombre de Usuario"
                    className="border border-gray-300 px-4 py-2 rounded-md"
                />
                <input
                    type="number"
                    name="minAmount"
                    value={filters.minAmount}
                    onChange={handleFilterChange}
                    placeholder="Monto mínimo"
                    className="border border-gray-300 px-4 py-2 rounded-md"
                />
                <input
                    type="number"
                    name="maxAmount"
                    value={filters.maxAmount}
                    onChange={handleFilterChange}
                    placeholder="Monto máximo"
                    className="border border-gray-300 px-4 py-2 rounded-md"
                />
                {/* <button className="reportButtons" onClick={applyFilters}>Aplicar Filtros</button> */}
                <button className="reportButtons" onClick={clearFilters}>Limpiar Filtros</button>
            </div>
            <div className="mt-4">
                <button className="reportButtons" onClick={exportToPDF}>Exportar a PDF</button>
                <button className="reportButtons" onClick={exportToCSV}>Exportar a CSV</button>
            </div>
            {/* Tabla con los datos filtrados */}
            <ReportTable data={filteredData} />
            {/* Gráficos */}
            {/* <div className="charts">
                <ReportChart
                    chartType="bar"
                    title="Árboles Plantados por Proyecto"
                    categories=   {projects} 
                    series={[{ name: 'Árboles Plantados', data: treesByProject }]}
                />
                <ReportChart
                    chartType="pie"
                    title="Distribución de Fondos Recaudados"
                    categories={projects}
                    series={[{ name: 'Monto Recaudado', data: totalAmounts }]}
                />
                <ReportChart
                    chartType="line"
                    title="Evolución de Fondos Recaudados"
                    categories={dates.map((date) => new Date(date).toLocaleDateString())}
                    series={[{ name: 'Monto Recaudado', data: amountsByDate }]}
                />
            </div> */}
        </div>
    );
};

export default ReportPage;
