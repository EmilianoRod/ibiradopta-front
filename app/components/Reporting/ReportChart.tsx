'use client';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';



interface ReportChartProps {
  chartType: 'bar' | 'pie' | 'line';
  title: string;
  categories: string[];
  series: { name?: string; data: number[] }[];
}

const ReportChart: React.FC<ReportChartProps> = ({ chartType, title, categories, series }) => {
   // Asegurarse de que los datos no estén vacíos
   if (!categories || categories.length === 0) {
    console.error('Categories are empty or undefined');
    return <div>Error: No categories data.</div>;
  }

  if (!series || series.length === 0) {
    console.error('Series are empty or undefined');
    return <div>Error: No series data.</div>;
  }
  
  const chartOptions: ApexOptions = {
    chart: {
      type: chartType,
      height: 350,
    },
    title: {
      text: title,
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    xaxis: chartType !== 'pie' ? { categories } : undefined, // Solo aplica para gráficos que no sean tipo pie
    labels: chartType === 'pie' ? categories : undefined,   // Aplica solo para gráficos tipo pie
  };

  return  <Chart options={chartOptions} series={series} type={chartType} height={350} />;



};

export default ReportChart;
