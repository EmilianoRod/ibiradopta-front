"use client";
import React, { useState } from 'react';
import Chart from 'react-apexcharts';

interface ReportChartProps {
  data: ReportData;
}

const ReportChart: React.FC<ReportChartProps> = ({ data }) => {
  const [chartData] = useState({
    series: [
      {
        name: 'Árboles Plantados',
        data: data.treesPlantedPerMonth,
      },
      {
        name: 'Fondos Recaudados',
        data: data.fundsRaised,
      },
    ],
    options: {
      chart: {
        type: 'bar' as const,
        height: 350,
      },
      title: {
        text: 'Informe de Conservación de Bosques',
      },
      xaxis: {
        categories: data.months,
      },
    },
  });

  return (
    <>
  <Chart options={chartData.options} series={chartData.series} type="bar" height={500} />;
  <h2>Tendencia de Plantación de Árboles - Gráfico de Líneas</h2>
  <Chart
    options={{
      chart: { type: 'line' },
      xaxis: { categories: data.months },
    }}
    series={[
      { name: 'Árboles Plantados', data: data.treesPlantedPerMonth },
    ]}
    type="line"
    height={350}
  />

  <h2>Distribución de Proyectos - Gráfico de Donut</h2>
  <Chart
    options={{
      chart: { type: 'donut' },
      labels: ['Proyecto A', 'Proyecto B', 'Proyecto C'], // Ajusta según tus proyectos
    }}
    series={[30, 40, 30]} // Porcentajes de ejemplo
    type="donut"
    height={350}
  />

  <h2>Comparativa de Fondos - Gráfico de Área</h2>
  <Chart
    options={{
      chart: { type: 'area' },
      xaxis: { categories: data.months },
    }}
    series={[
      { name: 'Fondos Recaudados', data: data.fundsRaised },
    ]}
    type="area"
    height={350}
  />
</>

  )
};

export default ReportChart;
