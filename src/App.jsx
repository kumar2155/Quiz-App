
import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home.jsx";
import Quiz from "./pages/Quiz.jsx";
import About from "./pages/about.jsx";
import Multi from "./pages/Multiple.jsx";
function App() {
  

  return (
    
       <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/quiz" element={<Quiz />}/>
          <Route path="/multi" element={<Multi/>}/>
          <Route path="/about" element={<About/>}/>
       </Routes>
    
    
  )
}

export default App;
