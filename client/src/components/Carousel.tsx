/* 
    Component to scroll through the latest calls
    Authors: Daniel
*/

import React, { useRef } from 'react';
import { ContactCardBig } from './ContactCardBig';

import leftCarouselButton from '../icons/carousel-button-left.svg';
import rightCarouselButton from '../icons/carousel-button-right.svg';

import '../css/carousel.css';


export const Carousel = () => {
    const carouselRef = useRef<HTMLDivElement>(null);

    const scrollCarousel = (scrollRight: Boolean) => {
        let scrollLeft;

        if (scrollRight) {
            if (carouselRef.current) {
                scrollLeft = carouselRef.current.scrollLeft;
                carouselRef.current.scroll({ left: scrollLeft + 200, behavior: "smooth"});
            }
        } else {
            if (carouselRef.current) {
                scrollLeft = carouselRef.current.scrollLeft;
                carouselRef.current.scroll({ left: scrollLeft - 200, behavior: "smooth"});
            }
        }
    }

    return (
        <div className="carousel-container">
            <div onClick={() => scrollCarousel(false)}><img src={leftCarouselButton} alt="Button to scroll the carousel to the left" className="carousel-scroll-button"/></div>
            <div ref={carouselRef} className="carousel-scroll-container">
                <ContactCardBig className="carousel-contact-card" />
                <ContactCardBig className="carousel-contact-card" />
                <ContactCardBig className="carousel-contact-card" />
                <ContactCardBig className="carousel-contact-card" />
                <ContactCardBig className="carousel-contact-card" />
                <ContactCardBig className="carousel-contact-card" />
                <ContactCardBig className="carousel-contact-card" />
                <ContactCardBig className="carousel-contact-card" />
                <ContactCardBig className="carousel-contact-card" />
                <ContactCardBig className="carousel-contact-card" />
                <ContactCardBig className="carousel-contact-card" />
                <ContactCardBig className="carousel-contact-card" />
                <ContactCardBig className="carousel-contact-card" />
                <ContactCardBig className="carousel-contact-card" />
            </div>
            <div onClick={() => scrollCarousel(true)}><img src={rightCarouselButton} alt="Button to scroll the carousel to the right" className="carousel-scroll-button"/></div>
        </div>
    );

}

