import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { Carousel } from "react-responsive-carousel";

export function RegisterSlider() {
    const imageData = [
        {
            src: "https://picsum.photos/seed/img1/600/400",
            alt: "Image 1 for carousel",
        },
        {
            src: "https://picsum.photos/seed/img2/600/400",
            alt: "Image 2 for carousel",
        },
        {
            src: "https://picsum.photos/seed/img3/600/400",
            alt: "Image 3 for carousel",
        },
    ];

    const [slide, setSlide] = useState(0);
    const nextSlide = () => {
        setSlide((prev) => (prev + 1) % imageData.length);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            nextSlide();
        }, 2000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="relative flex justify-center items-center overflow-hidden rounded-l-lg col-span-2 w-full ">
            <div
                className="w-full h-full flex duration-500 "
                style={{
                    transform: `translateX(${
                        ((slide * 100) % (imageData.length * 100)) - 200
                    }%)`,
                }}
            >
                {imageData.map((item, idx) => {
                    return (
                        <img
                            src={item.src}
                            alt={item.alt}
                            key={idx}
                            className="w-full h-full object-cover"
                        />
                    );
                })}
            </div>
            <span className="flex absolute bottom-2">
                {imageData.map((_, idx) => {
                    return (
                        <button
                            key={idx}
                            className={
                                slide === idx
                                    ? "bg-white h-2 w-2 rounded m-2 cursor-pointer"
                                    : "h-2 w-2 rounded m-2 cursor-pointer bg-gray-500"
                            }
                            onClick={() => setSlide(idx)}
                        ></button>
                    );
                })}
            </span>
        </div>
    );
}
