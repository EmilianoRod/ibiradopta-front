import FAQList from "./FAQList";

function FAQSection() {
    return (
      <section id="FAQ" className="bg-gray-100 py-10 px-4 lg:px-20 text-center">
        
        <h1 className="text-moss-green text-3xl sm:text-4xl font-bold pb-8">Preguntas Frecuentes</h1>
        <FAQList />
      </section>
    );
  }

  export default FAQSection;
