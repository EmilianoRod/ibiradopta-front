"use client";
import { useState } from "react";
import ReportFilters from "./ReportFilters";
import ReportChart from "./ReportChart";
import ExportButtons from "./ExportButtons";
import ReportTable from "./ReportTable";    

const sampleData = [
    {
      id: 1,
      amount: 100,
      date: "2024-11-11",
      user: {
        id: "54c5a2f9-3979-402a-b927-3124cdd63f99",
        userName: "jjolo",
        email: "asdasda@dasda.com"
      },
      project: {
        id: 2,
        name: "Reforestación de la Cuenca del Río Santa Lucía",
        description: "Proyecto de reforestación en la cuenca para mejorar la calidad del agua.",
        imageUrl: "https://semanarioelpueblo.com.uy/wp-content/uploads/2017/06/biologo.jpg",
        location: "Canelones, Uruguay",
        endDate: "2024-09-30",
        isFinished: true
      }
    },
    {
      id: 2,
      amount: 200,
      date: "2024-11-13",
      user: {
        id: "12376515-3bea-4b0e-8fd2-4f0b0db24ebe",
        userName: "lfranco",
        email: "leonardojfs83@gmail.com"
      },
      project: {
        id: 1,
        name: "Reforestación del Parque Nacional Quebrada de los Cuervos",
        description: "Iniciativa para plantar 5,000 árboles nativos en el parque.",
        imageUrl: "https://7maravillas.uy/wp-content/uploads/2021/01/quebrada-cuervos-foto-uruguay-natural.jpg",
        location: "Treinta y Tres, Uruguay",
        endDate: "2025-05-15",
        isFinished: false
      }
    },
    {
      id: 3,
      amount: 100,
      date: "2024-11-12",
      user: {
        id: "75e86d3a-d4fa-43d9-8b96-896cecd118ad",
        userName: "erers",
        email: "sadas@asdasd.com"
      },
      project: {
        id: 2,
        name: "Reforestación de la Cuenca del Río Santa Lucía",
        description: "Proyecto de reforestación en la cuenca para mejorar la calidad del agua.",
        imageUrl: "https://semanarioelpueblo.com.uy/wp-content/uploads/2017/06/biologo.jpg",
        location: "Canelones, Uruguay",
        endDate: "2024-09-30",
        isFinished: true
      }
    },
    {
      id: 4,
      amount: 100,
      date: "2024-11-14",
      user: {
        id: "12376515-3bea-4b0e-8fd2-4f0b0db24ebe",
        userName: "lfranco",
        email: "leonardojfs83@gmail.com"
      },
      project: {
        id: 3,
        name: "Reforestación en la Sierra de las Ánimas",
        description: "Plantación de especies autóctonas para conservar la biodiversidad.",
        imageUrl: "https://uruguaytravel.org/uploads/large/paseo-sierra-de-las-animas-4.webp",
        location: "Maldonado, Uruguay",
        endDate: "2023-12-20",
        isFinished: true
      }
    }
  ];

interface DateRange {
    start: string;
    end: string;
  }
  
  interface TreeData {
    project: string;
    treesPlanted: number;
    fundsRaised: number;
    date: string;
  }
  
  interface ReportData {
    treesPlantedPerMonth: number[];
    fundsRaised: number[];
    months: string[];
  }

const ReportPage: React.FC = () => {
    // Datos iniciales para simular el ejemplo
    const initialReportData: ReportData = {
      treesPlantedPerMonth: [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650],
      fundsRaised: [500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500, 2750, 3000, 3250],
      months: ['Enero', 'Febrero', 'Marzo', "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
    };
  
    const initialTreeData: TreeData[] = [
      { project: 'Proyecto A', treesPlanted: 100, fundsRaised: 500, date: '2024-01-15' },
      { project: 'Proyecto B', treesPlanted: 150, fundsRaised: 750, date: '2024-02-10' },
      { project: 'Proyecto A', treesPlanted: 200, fundsRaised: 1000, date: '2024-03-05' },
      { project: 'Proyecto C', treesPlanted: 250, fundsRaised: 1250, date: '2024-04-20' },
      { project: 'Proyecto B', treesPlanted: 300, fundsRaised: 1500, date: '2024-05-12' },
      { project: 'Proyecto A', treesPlanted: 350, fundsRaised: 1750, date: '2024-06-30' },
      { project: 'Proyecto C', treesPlanted: 400, fundsRaised: 2000, date: '2024-07-25' },
      { project: 'Proyecto B', treesPlanted: 450, fundsRaised: 2250, date: '2024-08-18' },
      { project: 'Proyecto A', treesPlanted: 500, fundsRaised: 2500, date: '2024-09-05' },
      { project: 'Proyecto C', treesPlanted: 550, fundsRaised: 2750, date: '2024-10-10' },
      { project: 'Proyecto B', treesPlanted: 600, fundsRaised: 3000, date: '2024-11-22' },
      { project: 'Proyecto A', treesPlanted: 650, fundsRaised: 3250, date: '2024-12-15' },
    ];
  
    const [reportData, setReportData] = useState<ReportData>(initialReportData);
    const [treeData, setTreeData] = useState<TreeData[]>(initialTreeData);
  
    const handleFilterChange = (filters: { dateRange: DateRange; project: string }) => {
      const { dateRange, project } = filters;
  
      // Filtrar `treeData` basado en rango de fechas y proyecto
      const filteredTreeData = initialTreeData.filter((item) => {
        const itemDate = new Date(item.date);
        const startDate = dateRange.start ? new Date(dateRange.start) : null;
        const endDate = dateRange.end ? new Date(dateRange.end) : null;
  
        const isInDateRange = (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);
        const isInProject = project ? item.project === project : true;
  
        return isInDateRange && isInProject;
      });
  
      // Filtrar `reportData` para actualizar los datos por mes según los datos filtrados
      const filteredReportData: ReportData = {
        treesPlantedPerMonth: [0, 0, 0], // Reiniciar los contadores
        fundsRaised: [0, 0, 0],
        months: initialReportData.months,
      };
  
      filteredTreeData.forEach((item) => {
        const monthIndex = new Date(item.date).getMonth(); // Usar el mes de la fecha para el índice (0 = Enero, 1 = Febrero, ...)
        if (monthIndex !== -1) {
            filteredReportData.treesPlantedPerMonth[monthIndex] += item.treesPlanted;
            filteredReportData.fundsRaised[monthIndex] += item.fundsRaised;
          }
      });
  
      // Actualizar el estado con los datos filtrados
      setTreeData(filteredTreeData);
      setReportData(filteredReportData);
    };
  
    // Extract unique project names
  const uniqueProjects = Array.from(new Set(initialTreeData.map(item => item.project)));

    return (
      <div>
        <h2>Informe de Actividad</h2>
        <ReportTable data={sampleData}/>
        <ReportFilters onFilterChange={handleFilterChange} projects={uniqueProjects} />
        <ReportChart data={reportData} />
        <ExportButtons data={treeData} />
        <div>
        <h2>Filtered Report Data</h2>
        <ul>
          {treeData.map((item, index) => (
            <li key={index}>
              {item.project} - {item.treesPlanted} trees planted, {item.fundsRaised} funds raised on {item.date}
            </li>
          ))}
        </ul>
      </div>
      </div>
    );
  };
  
  export default ReportPage;
  