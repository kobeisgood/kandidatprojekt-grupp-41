/* 
    Component to scroll through the latest calls
    Authors: Daniel
*/

import React, { useRef, useEffect, useState } from 'react';
import { ContactCardBig } from './ContactCardBig';
import { Contact } from '../Types';

import leftCarouselButton from '../icons/carousel-button-left.svg';
import rightCarouselButton from '../icons/carousel-button-right.svg';

import '../css/carousel.css';


interface Props {
    callEntries: Contact[];
    onCall: Function;
    setPeer: Function;
    profilePic: Function
}

export const Carousel = (props: Props) => {
    const [showCarouselArrows, setShowCarouselArrows] = useState(true);

    const carouselRef = useRef<HTMLDivElement>(null);

    const scrollCarousel = (scrollRight: Boolean) => {
        let scrollLeft;

        if (scrollRight) {
            if (carouselRef.current) {
                scrollLeft = carouselRef.current.scrollLeft;
                carouselRef.current.scroll({ left: scrollLeft + 200, behavior: "smooth" });
            }
        } else {
            if (carouselRef.current) {
                scrollLeft = carouselRef.current.scrollLeft;
                carouselRef.current.scroll({ left: scrollLeft - 200, behavior: "smooth" });
            }
        }
    }

    window.addEventListener('resize', changeCarouselStyleOnFewCalls);

    useEffect(() => {
        changeCarouselStyleOnFewCalls();
    });

    function changeCarouselStyleOnFewCalls() {
        let carousel = carouselRef.current;
        if (!carousel) {
            return;
        }

        let carouselIsScrollable = carousel.clientWidth < carousel.scrollWidth;
        if (!carouselIsScrollable) {
            carousel.style.border = "none";
            setShowCarouselArrows(false);
        } else {
            carousel.style.borderLeft = "3px solid darkgrey";
            carousel.style.borderRight = "3px solid darkgrey";
            setShowCarouselArrows(true);
        }
    }

    return (
        <div className="carousel-container">
            {showCarouselArrows &&
                <div onClick={() => scrollCarousel(false)}>
                    <img src={leftCarouselButton} alt="Button to scroll the carousel to the left" className="carousel-scroll-button" />
                </div>
            }

            <div ref={carouselRef} className="carousel-scroll-container">
                {props.callEntries &&
                    props.callEntries.map((contact, index) =>
                        <ContactCardBig
                            className="carousel-contact-card"
                            key={index}
                            contact={contact}
                            onCall={(phoneNbr: number) => { props.setPeer({ number: contact.phoneNbr, name: contact.firstName + " " + contact.lastName, profilePic: contact.profilePic }); props.onCall(phoneNbr); }}
                            profilePic={props.profilePic} />
                    )
                }
            </div>
            {showCarouselArrows &&
                <div onClick={() => scrollCarousel(true)}>
                    <img src={rightCarouselButton} alt="Button to scroll the carousel to the right" className="carousel-scroll-button" />
                </div>
            }
        </div>
    );

}

