import React from "react";
import { Link } from "react-router-dom";
import back from "../assets/bg.png"
const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="p-[6rem] border bg-[#938484]"style={{backgroundImage:`url(${back})`,backgroundSize:"100% 100%"}}>

      <h1 className="font-bold font-mono text-[#bc1313] text-center">QUIZ</h1>
      <div className="flex flex-col justify-center align-center">
      <div className="">
        <Link to="/quiz">
          <button className=" hover:bg-[#e6090955]" >
            Play Quiz
          </button>
        </Link>
      </div>
      <div>
        <Link to="/multi">
          <button className=" hover:bg-[#e6090955]" >
            Multiplier 1 to 1
          </button>
        </Link>
      </div>
      <div>
        <button className=" hover:bg-[#e6090955]"  >
          More Categories
        </button>
      </div>
      <div>
        <Link to="/about">
          <button className=" hover:bg-[#e6090955]"  >
            About
          </button>
        </Link>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Home;
