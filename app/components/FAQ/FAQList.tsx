"use client";
import React, { useState } from 'react';
import FAQItem from './FAQItem';


const faqs = [
    {
      question: "¿Cómo contribuye la plantación de árboles al medio ambiente?",
      answer:
        "Los árboles absorben dióxido de carbono y liberan oxígeno, ayudando a reducir el efecto invernadero y mejorar la calidad del aire. También conservan la biodiversidad, evitan la erosión del suelo, y son hogar de numerosas especies.",
    },
    {
      question: "¿Dónde se plantan los árboles y cómo eligen las ubicaciones?",
      answer:
        "Las ubicaciones se eligen en función del impacto ambiental y la necesidad de reforestación. Se plantan en áreas afectadas por la deforestación, en reservas naturales, y a veces en zonas urbanas para mejorar la calidad de vida en las ciudades.",
    },
    {
      question: "¿Cómo se asegura la supervivencia de los árboles plantados?",
      answer:
        "Trabajamos con organizaciones locales que monitorean los árboles regularmente, asegurando que se mantengan y cuiden adecuadamente durante los primeros años, cuando son más vulnerables.",
    },
    {
      question: "Puedo ver el impacto de mi donación o plantación de árboles?",
      answer:
        "Sí, te proporcionamos actualizaciones sobre los proyectos de reforestación en los que participas, incluyendo fotos y datos del área restaurada. Algunos proyectos incluso ofrecen mapas para que sigas el progreso.",
    },
  ];

export default function FAQList() {
    const [focusedIndex, setFocusedIndex] = useState(0);

    const handleFocus = (index: React.SetStateAction<number>) => {
        setFocusedIndex(index);
    };

    /**
     * Handles keyboard navigation for the FAQ list.
     *
     * @param {Object} event - The keyboard event object.
     * @param {string} event.key - The key that was pressed.
     * @param {Function} setFocusedIndex - Function to update the focused index.
     * @param {number} faqs.length - The length of the FAQ list.
     */
    const handleKeyDown = (event: { key: string; }) => {
        if (event.key === 'ArrowDown') {
            setFocusedIndex((prevIndex) => (prevIndex + 1) % faqs.length);
        } else if (event.key === 'ArrowUp') {
            setFocusedIndex((prevIndex) => (prevIndex - 1 + faqs.length) % faqs.length);
        }
    };


    return (
        <div className='divide-y divide-gray-400 max-w-4xl mx-auto' onKeyDown={handleKeyDown}>
            {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer}
                    isFocused={focusedIndex === index}
                    onFocus={() => handleFocus(index)}
                    onToggle={() => { }} />
            ))}
        </div>
    );
}
