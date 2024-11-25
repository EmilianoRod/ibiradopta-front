import Image from "next/image";
import Link from "next/link";

function PlantingLocations() {
  return (
    <section className="h-screen p-12 font-Poppins">
      <h1 className="text-moss-green text-center text-3xl font-bold pb-20">
        ¿Dónde plantamos nuestros árboles?
      </h1>
      <div className="flex gap-6">
        {/* Artículos de plantación con texto diferente para cada uno */}
        <PlantingLocationCard
          img="personas-1.jpeg"
          text="Plantar árboles es una de las formas más efectivas de combatir el cambio climático. Los árboles absorben dióxido de carbono durante la fotosíntesis y liberan oxígeno, lo que ayuda a reducir los niveles de CO₂ en la atmósfera."
        />
        <PlantingLocationCard
          img="personas-2.jpg"
          text="Los árboles juegan un papel crucial en la conservación del agua y la prevención de la erosión del suelo. Sus raíces actúan como una red natural que ayuda a retener el agua en el suelo, lo que reduce el riesgo de inundaciones."
        />
        <PlantingLocationCard
          img="personas-3.png"
          text="Contribuye a mantener el equilibrio ecológico y la biodiversidad de un área. Los bosques y las zonas arboladas albergan una increíble variedad de especies animales, plantas y microorganismos, creando ecosistemas ricos y saludables."
        />
      </div>
    </section>
  );
}

function PlantingLocationCard({ img, text }: { img: string, text: string }) {
  return (
    <article className="relative max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden h-[600px]">
      <Image
        src={`/${img}`}
        alt="personas plantando"
        width={450}
        height={200}
        className="object-cover"
      />
      <div className="p-12 bg-moss-green">
        <div className="flex justify-between uppercase tracking-wide text-sm text-white font-semibold">
          <div>29 de Noviembre 2024</div>
          <div>Montevideo, Uruguay</div>
        </div>
        <p className="mt-8 text-white pt-4">
          {text}
        </p>
      </div>
      {/* Botón "Leer más" */}
      <Link
        href="/proyectos"
        className="absolute bottom-2 right-2 bg-white text-moss-green font-bold px-2 py-1 rounded shadow-md hover:bg-gray-200 transition"
      >
        Leer más
      </Link>
    </article>
  );
}

export default PlantingLocations;
