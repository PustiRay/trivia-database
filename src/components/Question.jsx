function Question({ data, selected, onSelect, submitted }) {
  return (
    <div className="question">
      <h3>{data.question}</h3>
      <ul>
        {data.answers.map((answer, idx) => {
          const isCorrect = submitted && answer === data.correct;
          const isWrong = submitted && answer === selected && answer !== data.correct;

          return (
            <li key={idx}>
              <label style={{
                color: isCorrect ? 'green' : isWrong ? 'red' : 'black',
                fontWeight: selected === answer ? 'bold' : 'normal'
              }}>
                <input
                  type="radio"
                  name={`q-${data.id}`}
                  value={answer}
                  checked={selected === answer}
                  disabled={submitted}
                  onChange={() => onSelect(answer)}
                />
                {answer}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Question;
 