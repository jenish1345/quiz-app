import React from 'react'
import './Quiz.css'
import { data } from '../../assets/data'
import { useState } from 'react'
const Quiz = () => {

    let[ index , setIndex] = useState(0);
    let [questions , setQuestions] = useState (data[index]);
    let [lock,setLock] = useState(false);



    const checkAns = (e,ans) => {
        if (lock === false){
        if(questions.ans === ans){  
            e.target.classList.add("correct");
            setLock(true);
        }
        else{
            e.target.classList.add("wrong");
            setLock(true);
        }
        }

    }
  return (
    <div className="container">
        <h1>Quiz Application</h1>
        <hr />
        <h2>{index+1}.{questions.questions}</h2>
        <ul>
            <li onClick={(e)=>{checkAns(e,1)}}>{questions.option1}</li>
            <li onClick={(e)=>{checkAns(e,2)}}>{questions.option2}</li>
            <li onClick={(e)=>{checkAns(e,3)}}>{questions.option3}</li>
            <li onClick={(e)=>{checkAns(e,4)}}>{questions.option4}</li>
        </ul>
        <button>Next</button> 
        <div className="index">1 of 5 questions</div>
      
    </div>
  )
}

export default Quiz
