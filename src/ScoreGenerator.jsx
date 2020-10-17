import React from 'react';
import PropTypes from "prop-types";

const ScoreGenerator = ({currentScore, getNewCurrentScore}) => {
  return (
    <div className="score-generator">
      <h3>Current Score:</h3>
      <h1>{currentScore}</h1>
      <button onClick={getNewCurrentScore}> Generate New Score </button>
    </div>
  );
};

ScoreGenerator.propTypes = {
  currentScore: PropTypes.number,
  getNewCurrentScore: PropTypes.func
};

export default ScoreGenerator;
