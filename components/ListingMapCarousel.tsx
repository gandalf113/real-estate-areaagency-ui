'use client'

import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {fetchListingImages} from "@/app/actions";

const ListingMapCarousel = ({locationId}: { locationId: number }) => {
    const sliderRef = useRef<{swiper: any}>(null);

    const [images, setImages] = useState<{ url: string }[]>();

    useEffect(() => {
        const fetchImages = async () => {
            const images = await fetchListingImages(locationId);
            setImages(images);
        };
        fetchImages();
    }, [locationId]);

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

    if (!images) {
        return (
            <div className={`w-full h-44 bg-gray-200 flex items-center justify-center`}>
                <svg className={`animate-spin h-10 w-10 text-gray-500`} xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24">
                    <circle className={`opacity-25`} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className={`opacity-75`} fill="currentColor"
                          d="M4 12a8 8 0 018-8V2.83a.5.5 0 011 0V4a8 8 0 018 8h1.17a.5.5 0 010 1H20a8 8 0 01-8 8v1.17a.5.5 0 01-1 0V20a8 8 0 01-8-8H4a.5.5 0 010-1H2.83a.5.5 0 010 1V12z"/>
                </svg>
            </div>
        )
    }

    return (
        <div className={`w-full h-44 overflow-hidden`}>
            <Swiper
                modules={[Pagination]}
                ref={sliderRef}
                spaceBetween={10}
                slidesPerView={1}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                className={`w-full h-full relative`}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={image.url} alt={`Image ${index}`} className={`group-hover:scale-105 duration-200 w-full h-full object-cover`} />
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
    )
}


export default ListingMapCarousel;