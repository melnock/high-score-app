import React from 'react';

const ScoreGenerator = ({currentScore, getNewCurrentScore}) => {
  return (
    <div className="score-generator">
      <h3>Current Score:</h3>
      <h5>{currentScore}</h5>
      <button onClick={getNewCurrentScore}> Generate New Score </button>
    </div>
  );
};

export default ScoreGenerator;
