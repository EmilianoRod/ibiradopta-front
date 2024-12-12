"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Project {
  id: number;
  name: string;
  description: string;
  videoUrl: string; // Ruta del video
  location: string;
  price: number;
  isFinished: number; // 0 o 1
  imageUrl: string;
  images: { imageUrl: string; imageOrder: number }[]; // Lista de imágenes
}



function PlantingLocations() {

  const [projects, setProjects] = useState<Project[]>([]); // Estado para los proyectos

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_GATEWAY_URL}/projects/getall`
        );
        const data = await response.json();

        const activeProjects = data.filter(
          (project: Project) => project.isFinished === 0
        );

        setProjects(activeProjects);


      } catch (error) {
        console.error("Error al obtener proyectos:", error);
      }
    };

    fetchProjects();
  }, []);

  // return (
  //   <section className='min-h-screen p-6 lg:p-10 font-Poppins"'>
  //     <h1 className="text-moss-green text-center text-3xl lg:text-4xl font-bold pb-10">¿Dónde plantamos nuestros árboles?</h1>
  //     <div className='grid gap-6 lg:grid-cols-3'>
  //     {projects.slice(0, 3).map((project) => {

  //       return(

  //       <article key={project.id} className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden '>
  //         <Image src={project.images.find(img => img.imageOrder === 1)?.imageUrl || project.images[0]?.imageUrl || '/default-image.jpg'} alt="personas plantando" width={450} height={200} className='object-cover' />
  //         <div className='p-8 bg-moss-green '>
  //           <div className=" flex justify-between uppercase tracking-wide text-sm text-white font-semibold">
  //             <div className=" text-balance">
  //               {project.name}
  //             </div>
  //             <div className="text-balance">
  //               {project.location}
  //             </div>
  //           </div>
  //           <p className="mt-2 text-white pt-5">
  //             {project.description}
  //           </p>
  //         </div>
  //       </article>
  //    )})}
  //     </div>
  //   </section>
  // );

  return (
    <section id="PlantingLocations" className="min-h-full p-6 lg:p-10 font-Poppins">
      <h1 className="text-moss-green text-center text-3xl lg:text-4xl font-bold pb-10">
        ¿Dónde plantamos nuestros árboles?
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((project) => (
          <article key={project.id} className=" overflow-hidden rounded-xl shadow-md bg-white">
            <div className="relative h-64 w-full">
              <Image
                src={project.images.find(img => img.imageOrder === 1)?.imageUrl || project.images[0]?.imageUrl || '/default-image.jpg'}
                alt={`Imagen de ${project.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="bg-moss-green text-white p-8">
              <div className="flex justify-between uppercase tracking-wide text-sm font-semibold">
                <div className="text-balance">{project.name}</div>
                <div className="text-balance">{project.location}</div>
              </div>
              <p className="mt-2 line-clamp-4 pt-5">{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )

}


{/* // <article className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden'>
          //   <Image src="/personas-2.jpg" alt="personas plantando" width={450} height={200} className='object-cover' />
          //   <div className='p-8 bg-moss-green'>
          //     <div className=" flex justify-between uppercase tracking-wide text-sm text-white font-semibold">
          //       <div>
          //         1 de noviembre de 2024
          //       </div>
          //       <div>
          //         Montevideo, Uruguay
          //       </div>
          //     </div>
          //     <p className="mt-2 text-white pt-5">
          //       Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eius veritatis animi, alias labore ullam, ex dolorem odio eos aperiam cupiditate expedita ipsam. Doloremque, quos maiores optio temporibus asperiores dicta.
          //     </p>
          //   </div>
          // </article>
          // <article className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden'>
          //   <Image src="/personas-3.png" alt="personas plantando" width={450} height={200} className='object-cover' />
          //   <div className='p-8 bg-moss-green'>
          //     <div className=" flex justify-between uppercase tracking-wide text-sm text-white font-semibold">
          //       <div>
          //       1 de noviembre de 2024
          //       </div>
          //       <div>
          //         Montevideo, Uruguay
          //       </div>
          //     </div>
          //     <p className="mt-2 text-white pt-5">
          //       Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eius veritatis animi, alias labore ullam, ex dolorem odio eos aperiam cupiditate expedita ipsam. Doloremque, quos maiores optio temporibus asperiores dicta.
          //     </p>
          //   </div>
          // </article> */}

{/* function PlantingLocationCard({ img, date, location }: { img: string, date: string, location: string }) {
    return (
      <article className="bg-white rounded-xl shadow-md overflow-hidden">
        <Image src={`/${img}`} alt="personas plantando" width={450} height={200} className="object-cover w-full h-48" />
        <div className="p-8 bg-moss-green">
          <div className="flex justify-between uppercase tracking-wide text-sm text-white font-semibold">
            <div>{date}</div>
            <div>{location}</div>
          </div>
          <p className="mt-2 text-white pt-5">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eius veritatis animi...
          </p>
        </div>
      </article>
    );
  } */}

export default PlantingLocations;
