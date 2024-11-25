import Image from "next/image";
import Link from "next/link";

function PlantingLocations() {
  return (
    <section className="h-screen p-10 font-Poppins">
      <h1 className="text-moss-green text-center text-3xl font-bold pb-10">
        ¿Dónde plantamos nuestros árboles?
      </h1>
      <div className="flex gap-6">
        {/* Artículos de plantación */}
        <PlantingLocationCard img="personas-1.jpeg" />
        <PlantingLocationCard img="personas-2.jpg" />
        <PlantingLocationCard img="personas-3.png" />
      </div>
    </section>
  );
}

function PlantingLocationCard({ img }: { img: string }) {
  return (
    <article className="relative max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <Image
        src={`/${img}`}
        alt="personas plantando"
        width={450}
        height={200}
        className="object-cover"
      />
      <div className="p-8 bg-moss-green">
        <div className="flex justify-between uppercase tracking-wide text-sm text-white font-semibold">
          <div>30 de octubre de 2024</div>
          <div>Montevideo, Uruguay</div>
        </div>
        <p className="mt-2 text-white pt-5">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eius veritatis animi...
        </p>
      </div>
      {/* Botón "Leer más" */}
      <Link
        href="/proyectos"
        className="absolute bottom-4 right-4 bg-white text-moss-green font-bold px-4 py-2 rounded shadow-md hover:bg-gray-200 transition "
      >
        Leer más
      </Link>
    </article>
  );
}

export default PlantingLocations;
