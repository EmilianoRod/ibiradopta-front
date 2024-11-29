import Image from "next/image";
import Link from "next/link";

function PlantingLocations() {
    return (
      <section className='min-h-screen p-6 lg:p-10 font-Poppins"'>
        <h1 className="text-moss-green text-center text-3xl lg:text-4xl font-bold pb-10">¿Dónde plantamos nuestros árboles?</h1>
        <div className='grid gap-6 lg:grid-cols-3'>
          <article className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden'>
            <Image src="/personas-1.jpeg" alt="personas plantando" width={450} height={200} className='object-cover' />
            <div className='p-8 bg-moss-green'>
              <div className=" flex justify-between uppercase tracking-wide text-sm text-white font-semibold">
                <div>
                  1 de noviembre de 2024
                </div>
                <div>
                  Montevideo, Uruguay
                </div>
              </div>
              <p className="mt-2 text-white pt-5">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eius veritatis animi, alias labore ullam, ex dolorem odio eos aperiam cupiditate expedita ipsam. Doloremque, quos maiores optio temporibus asperiores dicta.
              </p>
            </div>
          </article>
          <article className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden'>
            <Image src="/personas-2.jpg" alt="personas plantando" width={450} height={200} className='object-cover' />
            <div className='p-8 bg-moss-green'>
              <div className=" flex justify-between uppercase tracking-wide text-sm text-white font-semibold">
                <div>
                  1 de noviembre de 2024
                </div>
                <div>
                  Montevideo, Uruguay
                </div>
              </div>
              <p className="mt-2 text-white pt-5">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eius veritatis animi, alias labore ullam, ex dolorem odio eos aperiam cupiditate expedita ipsam. Doloremque, quos maiores optio temporibus asperiores dicta.
              </p>
            </div>
          </article>
          <article className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden'>
            <Image src="/personas-3.png" alt="personas plantando" width={450} height={200} className='object-cover' />
            <div className='p-8 bg-moss-green'>
              <div className=" flex justify-between uppercase tracking-wide text-sm text-white font-semibold">
                <div>
                1 de noviembre de 2024
                </div>
                <div>
                  Montevideo, Uruguay
                </div>
              </div>
              <p className="mt-2 text-white pt-5">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur eius veritatis animi, alias labore ullam, ex dolorem odio eos aperiam cupiditate expedita ipsam. Doloremque, quos maiores optio temporibus asperiores dicta.
              </p>
            </div>
          </article>
        </div>
      </section>
    );
  }
  
  function PlantingLocationCard({ img, date, location }: { img: string, date: string, location: string }) {
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
  }

export default PlantingLocations;
