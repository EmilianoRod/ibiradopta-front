const HeroSection = () => {
    return (  
      <main className="py-10 bg-cover bg-center bg-no-repeat font-Poppins" style={{ backgroundImage: "url('/arbol.webp')" }}>
        <div className="pl-24 pr-96 flex flex-col space-y-8 pt-28 drop-shadow-2xl">
          <h1 className="text-white text-3xl font-bold">Plantá un árbol, transformá el futuro</h1>
          <p className="text-white text-2xl">
            Un pequeño gesto puede crear un cambio gigante. Adopta un árbol hoy y forma parte de un movimiento global para restaurar nuestro planeta...
          </p>
          <button className="bg-moss-green text-white text-3xl w-80 h-16 rounded-full hover:bg-green-700">QUIERO PLANTAR</button>
        </div>
      </main>
    );
  };
  
  export default HeroSection;
  