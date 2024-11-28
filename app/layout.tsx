import { ReactNode } from "react";
import { Providers } from "./Providers";
import SessionGuard from "./components/SessionGuard";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import "./globals.css";
import type { Metadata } from "next"; 


export const metadata: Metadata = {
  title: "Dream Tree",
  description: "Bienvenido a Dream Tree - Explora nuestras características y servicios",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  

  return (
    <html lang="es">
      <body>
        <Providers>
          <SessionGuard>
            <div className="flex flex-col min-h-screen">
              <Nav/>
              <main className="flex-grow">
                {children}
              </main>
              <Footer/>
            </div>
          </SessionGuard>
        </Providers>
      </body>
    </html>
  );
}




