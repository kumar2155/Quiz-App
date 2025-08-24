import React from 'react';
import {useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import end from "../assets/end.png"
import back from "../assets/bg.png"
import Lottie from "lottie-react";
import confettiAnimation from "../assets/success.json";

const Quiz = () => {
   const [questions,setquestions]=useState([]);
    const [score, setScore] = useState(0);
    const [finished,setfinished] =useState(false);
    const [current,setcurrent]=useState(0);
    const [loading,setloading]=useState(true);

    useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=5&category=18&type=multiple")
      .then((res) => {
        // Transform API data into {question, options, answer}
        const formatted = res.data.results.map((q) => {
          const options = [...q.incorrect_answers, q.correct_answer];
          // Shuffle options
          return {
            question: q.question,
            options: options.sort(() => Math.random() - 0.5),
            answer: q.correct_answer,
          };
        });
        setquestions(formatted);
        setloading(false);
      })
      .catch((err) => console.error(err));
  }, []);

    const handleanswer=(option)=>{
        if(option==questions[current].answer){
          setScore(score+1);
        }
        const next=current+1;
        if(next<questions.length){
          setcurrent(next);
        }else{
          setfinished(true);
        }
    };
    if(loading) return <h2 className=''>question loading....</h2>
  return (
    <div>
    {finished?(
  <div className="w-full h-screen flex flex-col justify-center items-center">
          <div className='p-[6rem] border bg-[#938484] flex flex-col w-fit '>
            <Lottie 
        animationData={confettiAnimation} 
        loop={false} 
        className="absolute   pointer-events-none"
      />
         <img src={end} style={{width:"150px" ,height:"150px"} } className='blink'/>   
        <h2>you scored {score} / {questions.length}</h2>
        <button className='w-fit hover:bg-[#e6090955]' onClick={()=>window.location.reload()}>Restart</button>
        <Link to="/"><button className=" hover:bg-[#e6090955]">Goto Home</button></Link> 
        </div>
  </div>
    ):(
      <><div className="w-full h-screen flex flex-col justify-center items-center">
      <div className='p-[6rem] border bg-[#938484] flex flex-col w-fit' style={{backgroundImage:`url(${back})`,backgroundSize:"100% 100%"}}>
        <h3>
          Question{current+1}/{questions.length};
        </h3>
        <h2 dangerouslySetInnerHTML={{ __html: questions[current].question }} />
        {questions[current].options.map((opt)=>(
          <button
            className='w-fit  hover:bg-[#07ef4155]'
            key={opt}
            onClick={()=>handleanswer(opt)}
            dangerouslySetInnerHTML={{ __html: opt }}
            >
          </button>
          
        ))}
        </div>
        </div>
      </>
    )}
</div>
  )
}

export default Quiz
