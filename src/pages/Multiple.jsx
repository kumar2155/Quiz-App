import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import end from "../assets/end.png"
import back from "../assets/bg.png"
import Lottie from "lottie-react";

import confettiAnimation from "../assets/success.json";
const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [finished, setFinished] = useState(false);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState(1); 

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=10&category=18&type=multiple")
      .then((res) => {
        const formatted = res.data.results.map((q) => {
          const options = [...q.incorrect_answers, q.correct_answer];
          return {
            question: q.question,
            options: options.sort(() => Math.random() - 0.5),
            answer: q.correct_answer,
          };
        });
        setQuestions(formatted);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      if (currentPlayer === 1) {
        setPlayer1Score((prev) => prev + 1);
      } else {
        setPlayer2Score((prev) => prev + 1);
      }
    }

    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    } else {
      setFinished(true);
    }
  };

  if (loading) return <h2 className="flex justify-center items-center">Loading questions...</h2>;

  return (
    <div>
      {finished ? (
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <div className='p-[6rem] border bg-[#938484] flex flex-col w-fit' >
            {(player1Score !== player2Score) && (
      <Lottie 
        animationData={confettiAnimation} 
        loop={false} 
        className="absolute   pointer-events-none"
      />
    )}
          <img src={end} style={{width:"150px" ,height:"150px"} } className='blink'/> 
          <h3>Player 1 Score: {player1Score}</h3>
          <h3>Player 2 Score: {player2Score}</h3>
          <h2 className="text-[#ea4003] font-extrabold">
            {player1Score > player2Score
              ? " Player 1 Wins"
              : player2Score > player1Score
              ? " Player 2 Wins"
              : " It's a Tie"}
          </h2>
         {/* <Lottie className="w-fit z-40" animationData={confettiAnimation} loop={false} /> */}
          <button className="w-fit hover:bg-[#e6090955]"onClick={() => window.location.reload()}>Restart</button>
          <Link to="/"><button className=" hover:bg-[#e6090955]">Go Home</button></Link>
          </div>
        </div>
      ) : (
        <><div className="w-full h-screen flex flex-col justify-center items-center">
        <div className='p-[6rem] border bg-[#938484] flex flex-col w-fit 'style={{backgroundImage:`url(${back})`,backgroundSize:"100% 100%"}}>
          <h3>
            Question {current + 1}/{questions.length}
          </h3>
          <h2
            dangerouslySetInnerHTML={{ __html: questions[current].question }}
          ></h2>
          <h3> Player {currentPlayer}'s Turn</h3>

          {questions[current].options.map((opt) => (
            <button
              className="w-fit hover:bg-[#07ef4155]"
              key={opt}
              onClick={() => handleAnswer(opt)}
              dangerouslySetInnerHTML={{ __html: opt }}
            ></button>
          ))}
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
