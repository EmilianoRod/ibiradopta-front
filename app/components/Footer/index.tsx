import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons/faXTwitter";

function Footer() {
  return (
    <footer className="flex flex-col lg:flex-row bg-moss-green text-white font-Poppins p-6 lg:p-12 space-y-6 lg:space-y-0">
      <div className="flex-1 space-y-3 text-center lg:text-left">
        <Link href="#HeroSection" className="hover:underline block">Plantá un árbol con nosotros</Link>
        <Link href="#About" className="hover:underline block">Sobre nosotros</Link>
        <Link href="#PlantingLocations" className="hover:underline block">Dónde plantamos nuestros árboles</Link>
        <Link href="#" className="hover:underline block">Contacto</Link>
      </div>

      <div className="flex-8 space-y-2 text-center lg:text-left">
        <p className="font-semibold">Ibiradoptá</p>
        <p>Calle 7 esq. Calle 6</p>
        <p>Montevideo, Uruguay</p>
        <p>+598 98 666 555</p>
        <a href="mailto:ibiradopta@gmail.com?subject=Consulta&body=Hola, tengo una pregunta sobre..." className="hover:underline block"> ibiradopta@gmail.com</a>
      </div>

      <div className="flex-1 flex flex-col order-3 space-y-4">
        <div className="flex justify-center lg:justify-end space-x-4">
          <FontAwesomeIcon icon={faXTwitter} className="w-6 h-6 md:w-8 md:h-8" style={{ color: "#ffffff", }} />
          <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6 md:w-8 md:h-8" style={{ color: "#ffffff", }} />
          <FontAwesomeIcon icon={faFacebook} className="w-6 h-6 md:w-8 md:h-8" style={{ color: "#ffffff", }} />
          <FontAwesomeIcon icon={faInstagram} className="w-6 h-6 md:w-8 md:h-8" style={{ color: "#ffffff", }} />
        </div>
        <span className="text-center lg:text-end">© Fundación Dream Tree</span>
      </div>
    </footer>
  );
}

export default Footer;
