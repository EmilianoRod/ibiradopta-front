import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons/faXTwitter";

function Footer() {
  return (
    <footer className="flex bg-moss-green p-8 text-center text-white font-Poppins justify-between">
     <div className="flex flex-col text-left space-y-3 order-1">
        <Link href="#">Plantá un árbol con nosotros</Link>
        <Link href="#">Sobre nosotros</Link>
        <Link href="#">Dónde plantamos nuestros árboles</Link>
        <Link href="#">Contacto</Link>
      </div>
      <div className="flex flex-col space-y-3 text-left align-center order-2">
        <span>Ibiradoptá</span>
        <span>Calle 7 esq. Calle 6</span>
        <span>Montevideo, Uruguay</span>
        <span>+598 98 666 555</span>
        <span>info@ibiradopta.org.uy</span>
      </div>
      <div className="flex flex-col order-3 space-y-8 pt-10">
        <div className="flex space-x-8 ">
        <FontAwesomeIcon icon={faXTwitter} style={{color: "#ffffff",}} />
        <FontAwesomeIcon icon={faLinkedin} style={{color: "#ffffff",}} />
        <FontAwesomeIcon icon={faFacebook} style={{color: "#ffffff",}} />
        <FontAwesomeIcon icon={faInstagram} style={{color: "#ffffff",}} />
        </div>
        <span>© Fundación Dream Tree</span>
      </div>
    </footer>
  );
}

export default Footer;
