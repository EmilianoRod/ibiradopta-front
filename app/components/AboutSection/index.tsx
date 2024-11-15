import Image from "next/image";

function AboutSection() {
    return (
      <section id="About" className="flex h-screen bg-gray-100 py-10 font-Poppins" style={{ backgroundImage: "url('/fondo-hojas.png')" }}> 
        <div className="flex flex-col pl-10 pr-80 pt-10 space-y-20">
          <h1 className="text-moss-green text-3xl font-bold">Sobre nosotros</h1>
          <p className=' text-2xl text-moss-green '> En IBIRADOPTÁ, creemos que cada árbol cuenta para un futuro más verde y saludable. Somos un grupo de personas apasionadas por la naturaleza, unidos por la misión de restaurar nuestro planeta, árbol por árbol. Facilitamos a individuos, empresas y comunidades la oportunidad de adoptar y plantar árboles en diversas regiones, promoviendo la biodiversidad, mejorando la calidad del aire y ayudando a combatir el cambio climático.
            <br />
            Creemos que proteger la Tierra no es solo una opción, sino una responsabilidad compartida. Al unirnos en esta misión, creamos un impacto positivo que trasciende generaciones. Nuestro compromiso es acompañarte en cada paso, ofreciendo transparencia sobre los proyectos, el seguimiento de cada árbol plantado y el impacto ambiental que juntos estamos generando.
            <br />
            <br />
            <b>Sé parte de la diferencia y únete a nuestra misión de dar vida a un planeta más verde.</b>
          </p>
        </div>
        <div className="flex flex-col justify-center pr-20">
          <Image src="/logo.svg" alt="logo" width={500} height={300} />
          <div className="text-moss-green text-5xl font-Righteous">IBIRADOPTÁ</div>
        </div>
      </section>
    );
  }

export default AboutSection;
