import React from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useState } from "react";

export default function Carousel({ slides }) {
    
    let [current, setCurrent] = useState();

    let previousSlide = () => {
        if(current === 0) {
            setCurrent(slides.length-1);
        }
        else {
            setCurrent(current-1);
        }
    };

    let nextSlide = () => {
        if(current === slides.length-1) {
            setCurrent(0);
        }
        else {
            setCurrent(current+1);
        }
    };
    
    return (
        <div className="">
            <div 
             className={`flex transition ease-out duration-40 gap-20`}
             style={{
                transform: `translateX(-${current * 100}%)`,
             }}
            >
                {slides.map((s) => {
                    return s;
                })}
            </div>


        </div>
    );
}

/*
            <div className="absolute top-0 h-full w-full justify-between items-center flex text-8xl">
                <button onClick={previousSlide}>
                    <BsFillArrowLeftCircleFill></BsFillArrowLeftCircleFill>
                </button>
                <button onClick={nextSlide}>
                    <BsFillArrowRightCircleFill></BsFillArrowRightCircleFill>
                </button>
            </div>
*/