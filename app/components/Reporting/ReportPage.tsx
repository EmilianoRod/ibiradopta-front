"use client";
import { useState } from "react";
// import ReportFilters from "./ReportFilters";
// import ReportChart from "./ReportChart";
// import ExportButtons from "./ExportButtons";
import ReportTable from "./ReportTable";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";
import sampleData from "./sampleData.json";

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


const ReportPage: React.FC = () => {

    const [filteredData, setFilteredData] = useState<ReportData[]>(sampleData);
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        projectId: '',
        userName: '',
        minAmount: '',
        maxAmount: '',
    });

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
        let data = sampleData;

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

    // Exportar a PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Informe de Actividades", 10, 10);

        autoTable(doc, {
            head: [["Usuario", "Árboles Plantados", "Proyecto", "Fecha", "Monto"]],
            body: filteredData.map((entry) => [
                entry.user.userName,
                entry.amount,
                entry.project.name,
                new Date(entry.date).toLocaleDateString(),
                `$${entry.amount}`,
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
            <div className="filters">
                <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    placeholder="Fecha de inicio"
                />
                <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                    placeholder="Fecha de fin"
                />
                <select
                    name="projectId"
                    value={filters.projectId}
                    onChange={handleFilterChange}
                >
                    <option value="">Seleccionar Proyecto</option>
                    {[...new Set(sampleData.map((d) => d.project))].map((project) => (
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
                />
                <input
                    type="number"
                    name="minAmount"
                    value={filters.minAmount}
                    onChange={handleFilterChange}
                    placeholder="Monto mínimo"
                />
                <input
                    type="number"
                    name="maxAmount"
                    value={filters.maxAmount}
                    onChange={handleFilterChange}
                    placeholder="Monto máximo"
                />
                <button className="reportButtons" onClick={applyFilters}>Aplicar Filtros</button>
            </div>
            <div>
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
