// Crea o edita un archivo de declaraciones globales(puede ser global.d.ts en la raíz de tu proyecto o un archivo separado) para extender el tipo de jsPDF.

import "jspdf-autotable";

declare module "jspdf" {
    interface jsPDF {
        lastAutoTable: {
            finalY: number; // Última posición Y después de la tabla
        };
    }
}
