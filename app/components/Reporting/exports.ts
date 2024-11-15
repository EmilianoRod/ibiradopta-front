// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';


// import { saveAs } from 'file-saver';

// export const exportPDF = (data: TreeData[]) => {
//   const doc = new jsPDF();
//   doc.text('Informe de Conservación del Bosque', 20, 10);
//   autoTable(doc, {
//     head: [['Proyecto', 'Árboles Plantados', 'Fondos Recaudados']],
//     body: data.map((item) => [item.project, item.treesPlanted, item.fundsRaised]),
//   });
//   doc.save('reporte.pdf');
// };

// export const exportCSV = (data: TreeData[]) => {
//   const csvData = data.map((item) => ({
//     Proyecto: item.project,
//     'Árboles Plantados': item.treesPlanted,
//     'Fondos Recaudados': item.fundsRaised,
//   }));

//   const csvContent =
//     'data:text/csv;charset=utf-8,' +
//     ['Proyecto,Árboles Plantados,Fondos Recaudados']
//       .concat(csvData.map(row => `${row.Proyecto},${row['Árboles Plantados']},${row['Fondos Recaudados']}`))
//       .join('\n');

//   const blob = new Blob([decodeURI(csvContent)], { type: 'text/csv;charset=utf-8;' });
//   saveAs(blob, 'reporte.csv');
// };
