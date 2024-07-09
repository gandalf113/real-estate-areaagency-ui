'use client';

import {Navigation, Pagination, Scrollbar, Thumbs} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/thumbs';
import Image from "next/image";
import './ListingCardCarousel.css';
import React, {useCallback, useRef} from "react";

interface ListingPageCarouselProps {
    images: { url: string }[];
}

const ListingPageCarousel = ({ images }: ListingPageCarouselProps) => {
    const sliderRef = useRef<{swiper: any}>(null);

    const handlePrev = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);
    return (
        <div className={``}>
            {/* Main Swiper */}
            <Swiper
                modules={[Pagination]}
                ref={sliderRef}
                spaceBetween={10}
                slidesPerView={1}
                pagination={{clickable: true}}
                scrollbar={{draggable: true}}
                className={`w-full relative`}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <Image src={image.url} width={600} height={400} alt={`Image ${index}`} className={`w-full`}/>
                    </SwiperSlide>
                ))}

                {/* Custom Navigation Buttons */}
                <button
                    onClick={handlePrev}
                    className={`absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-r-md bg-opacity-50 hover:bg-opacity-100 z-20`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6`} fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M15 19l-7-7 7-7"/>
                    </svg>
                </button>
                {/*<div className="swiper-button-prev custom-button">Prev</div>*/}
                <button
                    onClick={handleNext}
                    className={`absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 rounded-l-md bg-opacity-50 hover:bg-opacity-100 z-20`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6`} fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M9 5l7 7-7 7"/>
                    </svg>
                </button>

            </Swiper>
        </div>
    );
};

export default ListingPageCarousel;
