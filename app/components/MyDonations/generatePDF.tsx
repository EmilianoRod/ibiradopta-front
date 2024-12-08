import autoTable from "jspdf-autotable"; // Opcional para tablas más fáciles
import jsPDF from "jspdf";

interface Payment {
    id: number;
    date: string;
    amount: string;
    method: string;
    status: string;
}

const generatePDF = (payment: Payment) => {
    const doc = new jsPDF();

    // Logo y Encabezado
    const logoUrl = "/logo2.png"; // Asegúrate de que este archivo esté en la carpeta /public
    doc.addImage(logoUrl, "PNG", 10, 10, 50, 20); // Agrega el logo (ajusta tamaño y posición)
    doc.setFont("Poppins", "bold");
    doc.setFontSize(18);
    doc.setTextColor("#2d5700"); // Usa el color `moss-green`
    doc.text("Factura de Compra", 70, 20);

    // Información del Cliente y Factura
    doc.setFont("Poppins", "normal");
    doc.setFontSize(12);
    doc.setTextColor("#000");
    doc.text(`ID de Pago: ${payment.id}`, 10, 50);
    doc.text(`Fecha: ${payment.date}`, 10, 60);
    doc.text(`Estado: ${payment.status}`, 10, 70);

    // Detalles de la Compra
    const tableData = [
        ["Descripción", "Monto"],
        ["Producto adquirido", payment.amount],
    ];

    autoTable(doc, {
        startY: 80,
        head: [tableData[0]], // Encabezados de la tabla
        body: tableData.slice(1), // Datos de la tabla
        headStyles: {
            fillColor: "#2d5700", // Color de fondo para el encabezado
            textColor: "#fff",
        },
        bodyStyles: {
            textColor: "#000",
        },
    });

    // Total
    doc.setFont("Poppins", "bold");
    doc.setFontSize(14);
    doc.setTextColor("#2d5700");
    doc.text(`Total: ${payment.amount}`, 10, doc.lastAutoTable.finalY + 20);

    // Descargar PDF
    doc.save(`factura-${payment.id}.pdf`);
};

export default generatePDF;
