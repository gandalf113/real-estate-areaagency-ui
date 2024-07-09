'use client';

import { Navigation, Pagination, Scrollbar, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/thumbs';
import { useState } from "react";
import './ListingPageCarousel.css'

interface ListingPageCarouselProps {
    images: { url: string }[];
}

const ListingPageCarousel = ({ images }: ListingPageCarouselProps) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    return (
        <div>
            {/* Main Swiper */}
            <Swiper
                modules={[Navigation, Scrollbar, Thumbs]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                thumbs={{ swiper: thumbsSwiper }}
                className={`w-full`}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={image.url} alt={`Image ${index}`} className={`w-full`} />
                    </SwiperSlide>
                ))}
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
                    <SwiperSlide key={index} className="swiper-slide-thumb">
                        <img src={image.url} alt={`Thumb ${index}`} className={`w-full cursor-pointer`} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ListingPageCarousel;
