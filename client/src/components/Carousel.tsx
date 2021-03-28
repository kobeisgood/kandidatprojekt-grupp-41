/* 
    Component to scroll through the latest calls
    Authors: Daniel
*/

import React, { useRef } from 'react';
import { ContactCardBig } from './ContactCardBig';

import leftCarouselButton from '../icons/carousel-button-left.svg';
import rightCarouselButton from '../icons/carousel-button-right.svg';

import '../css/carousel.css';

interface Props {
    
}

export const Carousel = (props: Props) => {
    const carouselRef = useRef();

    function scrollCarousel(scrollRight: Boolean) {
        if (scrollRight) {
            
        }
    }

    return (
        <div className="carousel-container">
            <div onClick={() => scrollCarousel(false)}><img src={leftCarouselButton} alt="Button to scroll the carousel to the left" className="carousel-scroll-button"/></div>
            <div className="carousel-scroll-container">
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

