import React from 'react';
import PropTypes from "prop-types";
import ClickCounter from './ClickCounter';

const ScoreGenerator = ({currentScore, getNewCurrentScore, clickCount}) => {
  return (
    <div className="score-generator">
      <ClickCounter clickCount={clickCount}/>
      <h3>Current Score:</h3>
      <h1>{currentScore}</h1>
      <button onClick={getNewCurrentScore}> Generate New Score </button>
    </div>
  );
};

ScoreGenerator.propTypes = {
  clickCount: PropTypes.number,
  currentScore: PropTypes.number,
  getNewCurrentScore: PropTypes.func
};

export default ScoreGenerator;
