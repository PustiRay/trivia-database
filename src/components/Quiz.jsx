import { useEffect, useState } from 'react';
import he from 'he';
import Question from './Question';

const API_URL = 'https://opentdb.com/api.php?amount=5&type=multiple';

function Quiz({ onRetake }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const formatted = data.results.map((q, idx) => {
          const answers = [...q.incorrect_answers];
          const randomIndex = Math.floor(Math.random() * 4);
          answers.splice(randomIndex, 0, q.correct_answer);
          return {
            id: idx,
            question: he.decode(q.question),
            correct: he.decode(q.correct_answer),
            answers: answers.map(a => he.decode(a))
          };
        });
        setQuestions(formatted);
        setSubmitted(false);
        setAnswers({});
        setScore(0);
      });
  }, []);

  const handleSelect = (qid, answer) => {
    setAnswers(prev => ({ ...prev, [qid]: answer }));
  };

  const handleSubmit = () => {
    let sc = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) sc++;
    });
    setScore(sc);
    setSubmitted(true);
  };

  return (
    <div className="quiz">
      {questions.map(q => (
        <Question
          key={q.id}
          data={q}
          selected={answers[q.id]}
          onSelect={a => handleSelect(q.id, a)}
          submitted={submitted}
        />
      ))}

      {!submitted ? (
        <button onClick={handleSubmit} disabled={Object.keys(answers).length !== 5}>
          Submit Quiz
        </button>
      ) : (
        <div>
          <h2>Your score: {score} / 5</h2>
          <button onClick={onRetake}>Retake Quiz</button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
