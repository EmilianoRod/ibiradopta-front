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
    endDate: string;
    location: string;
}

interface AdoptedTreesCarouselProps {
    projectsList: ProjectList[];
}


const AdoptedTreesCarousel: React.FC<AdoptedTreesCarouselProps> = ({ projectsList }) => {
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
                {projectsList.map((project) => (
                    <SwiperSlide key={project.id} className="w-auto">
                        <TreeCard
                            id={project.id}
                            imageSrc={project.imageUrl}
                            title={project.name}
                            endDate={project.date}
                            location={project.location}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default AdoptedTreesCarousel;
