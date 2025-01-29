import React from "react";
import "./Box.css";

const Box = () => {
  return (
    <div className="relative inset-0 h-[85vh] md:h-screen w-full overflow-x-hidden">
      <div className="h-full w-full bg-[#D2D1D3] flex-col items-center justify-center">
        <p className="text-center h-auto pt-16 bento-title !capitalize text-[2.1rem] sm:text-[4.5rem] !font-Sleepy-Moody !leading-[3rem] px-4">
          I'm Inside The Box 🙇‍♀️
        </p>
        <p className="text-center pt-4 font-general !text-[1.1rem] text-[#1D1D1D]">
          Hover to open the Box 📦
        </p>

        <div className="flex justify-center h-[50vh] md:h-[80vh] my-10 sm:my-0 items-center">
          <div
            className="relative h-[360px] md:h-[420px] w-[260px] md:w-[320px] border-[5px] mb-3 border-[#452e20] perspective-[1000px]"
            id="wrapper"
          >
            {/* Image background */}
            <img
              src="/images/nezuko.webp"
              alt="nezuko"
              className="absolute w-full h-full object-cover"
            />
            {/* Door with hover rotation */}
            <div
              className="absolute h-full w-full bg-[#785138] flex justify-evenly items-center transform transition-transform duration-700 origin-right border-l border-black"
              id="door"
            >
              {/* Shapes inside door */}
              <div className="h-full border-[4px] border-[#222324]"></div>
              <div className="h-full border-[4px] border-[#222324]"></div>
              <div className="h-full border-[4px] border-[#222324]"></div>
              <div className="h-full border-[4px] border-[#222324]"></div>
              {/* Door knob */}
              <div className="absolute top-[40%] left-3 w-[10px] h-[50px] bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box;
