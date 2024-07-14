'use client';

import { Scrollbar, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/thumbs';
import React, {useCallback, useEffect, useRef, useState} from "react";
import './ListingPageCarousel.css'
import Image from "next/image";

interface ListingPageCarouselProps {
    images: { url: string }[];
}

const ListingPageCarousel = ({ images }: ListingPageCarouselProps) => {
    const sliderRef = useRef<{ swiper: any }>(null);
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

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

    useEffect(() => {
        if (sliderRef.current && sliderRef.current.swiper) {
            sliderRef.current.swiper.update();
        }
    }, [images]);

    return (
        <div>
            {/* Main Swiper */}
            <Swiper
                modules={[Scrollbar, Thumbs]}
                spaceBetween={10}
                slidesPerView={1}
                ref={sliderRef}
                pagination={{clickable: true}}
                scrollbar={{draggable: true}}
                thumbs={{swiper: thumbsSwiper}}
                className={`w-full relative rounded-lg overflow-hidden shadow-lg `}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <Image width={1280} height={720} src={image.url} alt={`Image ${index}`} className={`w-full rounded-lg shadow-2xl`}/>
                    </SwiperSlide>
                ))}

                <button
                    onClick={handlePrev}
                    className={`absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-r-md bg-opacity-50 hover:bg-opacity-100 z-20`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6`} fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M15 19l-7-7 7-7"/>
                    </svg>
                </button>
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

            {/* Thumbs Swiper */}
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={6}
                freeMode
                watchSlidesProgress
                className={`mt-4`}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={image.url} alt={`Thumb ${index}`} className={`w-full cursor-pointer`}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ListingPageCarousel;
