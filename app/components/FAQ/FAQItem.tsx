"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface FAQItemProps {
    question: string;
    answer: string;
    isFocused: boolean;
    onFocus: () => void;
    onToggle: () => void;
}

export default function FAQItem({ question, answer, isFocused, onFocus, onToggle }: FAQItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen)
        onToggle();
    };

    const handleKeyDown = (event: { key: string; preventDefault: () => void; }) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleOpen();
        }
    };

    return (
        <div
            className="p-4 cursor-pointer focus:outline-none focus:bg-gray-100"
            tabIndex={0}
            onFocus={onFocus}
            onKeyDown={handleKeyDown}
            style={{
                cursor: 'pointer',
            }}>
            <div className={`flex justify-between items-center ${isFocused ? 'text-green-500' : 'text-moss-green'} hover:text-green-500`} onClick={toggleOpen} style={{ fontWeight: 'bold' }}> 
            <span className="text-left text-lg lg:text-xl">{question}</span>

                <Image className="" src={isOpen ? "/icon-minus.svg" : "/plus.png"} alt="icon" width={isOpen ? 24 : 20} height={isOpen ? 24 : 20} className="lg:w-10 lg:h-10" />
            </div>
            {isOpen && <p className="mt-2 text-moss-green text-left text-base lg:text-lg ">{answer}</p>}
        </div>
    );
} 
