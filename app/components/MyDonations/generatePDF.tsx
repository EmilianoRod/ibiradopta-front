import autoTable from "jspdf-autotable"; // Opcional para tablas más fáciles
import jsPDF from "jspdf";

interface Payment {
    id: number;
    quantity: number;
    amount: number;
    date: string;
    userId: string;
    project: Project;
    user:User;
}
export interface Project {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    location: string;
    endDate: string;
    price: number;
    isFinished: number;
}

export interface User {
    id: number;
    userName: string;
    email: string;
}

const generatePDF = (payment: Payment) => {
    const doc = new jsPDF();

    // Logo y Encabezado
    const logoUrl = "/logo2.png"; // Asegúrate de que este archivo esté en la carpeta /public
    doc.addImage(logoUrl, "PNG", 10, 10, 40, 20); // Agrega el logo (ajusta tamaño y posición)
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor("#2d5700"); // Usa el color `moss-green`
    doc.text("Detalle de Donacion", 70, 20);

    // Información del Cliente y Factura
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor("#000");
    doc.text(`Cliente: ${payment.user.userName}`, 10, 40);
    doc.text(`ID de Pago: ${payment.id}`, 10, 50);
    doc.text(`Fecha: ${payment.date}`, 10, 60);

    // Detalles de la Compra
    const tableData = [
        ["Descripción","Cantidad", "Monto"],
        [payment.project.name,payment.quantity, payment.amount],
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
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor("#2d5700");
    doc.text(`Total: ${payment.amount}`, 10, doc.lastAutoTable.finalY + 20);

    // Mensaje de Agradecimiento
    const agradecimiento = "Gracias "+ payment.user.userName +" por donar al Proyecto: " + payment.project.name + ".\nTu contribución es invaluable y ayuda a mejorar el mundo.";
    const marginLeft = 10; // Espaciado a la izquierda

    // Ajustar el texto a un ancho máximo
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor("#000");
    doc.text(agradecimiento, marginLeft, doc.lastAutoTable.finalY + 30, { maxWidth: 180 });


    // Descargar PDF
    doc.save(`Comprobante-${payment.id}.pdf`);
};

export default generatePDF;
