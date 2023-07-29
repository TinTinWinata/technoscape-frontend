import { useEffect, useState } from "react";

export function RegisterSlider() {
    const imageData = [
        {
            src: "/bluejacket-team-2.png",
            alt: "Image 1 for carousel",
        },
        {
            src: "/bluejacket-team-3.png",
            alt: "Image 2 for carousel",
        },
        {
            src: "/bluejacket-team-4.png",
            alt: "Image 3 for carousel",
        },
    ];

    const [slide, setSlide] = useState(0);
    const [percentage, setPercentage] = useState(0);

    const nextSlide = () => {
        setSlide((prev) => (prev + 1) % imageData.length);
        // setPercentage(
        //     (percentage) => ((slide * 100) % (imageData.length * 100)) - 100
        // );

        // setPercentage((prev) => prev + 100);

        // console.log(slide);

        // console.log(percentage);
    };

    // const moveSlide = () => {
    //     setSlide((prev) => (prev + 1) % imageData.length);
    //     const percentage =

    //     return `translateX(${percentage}%)`;
    // };

    useEffect(() => {
        const intervalId = setInterval(() => {
            nextSlide();
        }, 2000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="border-t border-l border-b border-gray-500 border-opacity-30 hidden h-[625px] relative md:flex justify-center items-center overflow-hidden rounded-l-lg col-span-2 ">
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
