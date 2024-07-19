'use client';

import {Pagination, Scrollbar, Thumbs} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/thumbs';
import React, {useCallback, useEffect, useRef, useState} from "react";
import './ListingPageCarousel.css';

interface ListingPageCarouselProps {
    images: { url: string }[];
}

const ListingPageCarousel = ({images}: ListingPageCarouselProps) => {
    const sliderRef = useRef<{ swiper: any }>(null);
    const fullScreenSliderRef = useRef<{ swiper: any }>(null);
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [fullScreen, setFullScreen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

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

    useEffect(() => {
        if (fullScreen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [fullScreen]);

    const handleSlideChange = (swiper: any) => {
        setActiveIndex(swiper.activeIndex);
        if (fullScreenSliderRef.current) {
            fullScreenSliderRef.current.swiper.slideTo(swiper.activeIndex);
        }
    };

    const handleFullScreenSlideChange = (swiper: any) => {
        setActiveIndex(swiper.activeIndex);
        if (sliderRef.current) {
            sliderRef.current.swiper.slideTo(swiper.activeIndex);
        }
    };

    return (
        <>
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
                    className={`w-full relative rounded-lg h-full overflow-hidden shadow-lg `}
                    onSlideChange={handleSlideChange}
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index} className={`h-full`}>
                            <img width={640} height={480} src={image.url} alt={`Image ${index}`}
                                   className={`w-full h-[32rem] object-cover rounded-lg shadow-2xl cursor-pointer`}
                                   onClick={() => setFullScreen(!fullScreen)}/>
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
                    {thumbsSwiper ? images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img width={40} height={30} src={image.url} alt={`Thumb ${index}`}
                                   className={`w-full cursor-pointer h-20 object-cover`}/>
                        </SwiperSlide>
                    )) : null}
                </Swiper>
            </div>

            {/* Full Screen Swiper */}
            <div
                className={`${fullScreen ? 'fixed' : 'hidden'} top-0 left-0 w-full h-screen flex items-center justify-center bg-black bg-opacity-80 z-[9999]`}
                onClick={() => setFullScreen(false)}
            >
                <button
                    className={`absolute top-4 right-4 p-2 z-30 bg-white bg-opacity-50 hover:bg-opacity-100 rounded-lg`}
                    onClick={() => setFullScreen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6`} fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>

                <div
                    className="w-10/12 aspect-video bg-black"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Swiper
                        modules={[Scrollbar, Thumbs]}
                        spaceBetween={10}
                        slidesPerView={1}
                        ref={fullScreenSliderRef}
                        scrollbar={{draggable: true}}
                        className={`w-full h-full rounded-lg overflow-hidden shadow-lg relative`}
                        initialSlide={activeIndex}
                        onSlideChange={handleFullScreenSlideChange}
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index} className={`h-full`}>
                                <img src={image.url} alt={`Image ${index}`}
                                       className={`w-full h-full object-contain rounded-lg shadow-2xl`}
                                />
                            </SwiperSlide>
                        ))}

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePrev(e);
                            }}
                            className={`absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-r-md bg-opacity-50 hover:bg-opacity-100 z-20`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6`} fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M15 19l-7-7 7-7"/>
                            </svg>
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNext(e);
                            }}
                            className={`absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 rounded-l-md bg-opacity-50 hover:bg-opacity-100 z-20`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6`} fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </Swiper>
                </div>
            </div>
        </>
    );
};

export default ListingPageCarousel;
