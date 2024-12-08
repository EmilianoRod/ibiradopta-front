/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";

import React from "react";
import TreeCard from "./TreeCard"

interface Tree {
    id: number;
    imageSrc: string;
    title: string;
    adoptionDate: string;
    location: string;
}

interface AdoptedTreesCarouselProps {
    trees: Tree[];
}


const AdoptedTreesCarousel: React.FC<AdoptedTreesCarouselProps> = ({ trees }) => {
    return (
        <section className="mb-12 w-full animate-fade-in">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={"auto"}
                navigation={true}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="swiper-container"
            >
                {trees.map((tree) => (
                    <SwiperSlide key={tree.id} className="w-auto">
                        <TreeCard
                            id={tree.id}
                            imageSrc={tree.imageSrc}
                            title={tree.title}
                            adoptionDate={tree.adoptionDate}
                            location={tree.location}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default AdoptedTreesCarousel;
