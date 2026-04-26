import React, { useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data'

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);

    const checkAns = (e, ans) => {
        if (lock === false) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("wrong");
            }
            setLock(true);
        }
    }

    const next = () => {
        if (lock === true) {
            if (index === data.length - 1) {
                setResult(true);
                return;
            }
            setIndex(index + 1);
            setQuestion(data[index + 1]);
            setLock(false);
            const options = document.querySelectorAll("li");
            options.forEach((option) => {
                option.classList.remove("wrong");
                option.classList.remove("correct");
            });
        }
    }

    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }

    return (
        <div className="container">
            <h1>Quiz App</h1>
            <hr />
            {result ? (
                <>
                    <h2>Your Score: {score} out of {data.length}</h2>
                    <p className="result-text">
                        {score === data.length ? "Perfect! 🎉" : 
                         score >= data.length / 2 ? "Good job! 👍" : "Keep practicing! 💪"}
                    </p>
                    <button onClick={reset}>Restart Quiz</button>
                </>
            ) : (
                <>
                    <h2>{index + 1}. {question.questions}</h2>
                    <ul>
                        <li onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
                        <li onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
                        <li onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
                        <li onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
                    </ul>
                    <button onClick={next} disabled={!lock}>Next</button>
                    <div className="index">{index + 1} of {data.length} questions</div>
                </>
            )}
        </div>
    )
}

export default Quiz
