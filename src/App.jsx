import { useState, useEffect } from 'react';
import Quiz from './components/Quiz';

function App() {
  const [quizKey, setQuizKey] = useState(0); // used to reload quiz

  return (
    <div className="app">
      <h1>Trivia Quiz</h1>
      <Quiz key={quizKey} onRetake={() => setQuizKey(prev => prev + 1)} />
    </div>
  );
}

export default App;
