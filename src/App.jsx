import React, {useState} from 'react';

import ScoreGenerator from './ScoreGenerator';
import ScoreSubmission from './ScoreSubmission';
import HighScoreChart from './HighScoreChart';

import mockScores from './mockScores';

import './App.css';

function App() {
  // currentScore is the visible score
  const [currentScore, setCurrentScore] = useState(0);
  // cumulativeScore is the total score from all clicks
  const [cumulativeScore, setCumulativeScore] = useState(0);
  // number of times the user has clicked the new score button
  const [clickCount, setClickCount] = useState(0);
  const [highScores, setHighScores] = useState([]);

  const getNewCurrentScore = () => {
    // verify the click count is less than 10
    // if it reaches 10, we've given the user too many clicks
    if (clickCount < 10) {
      const newScore = (Math.random() * 100) - 200;
      setClickCount(prevClickCount => prevClickCount++);
      setCumulativeScore(currentScore + newScore);
      setCurrentScore(newScore);
    }
  };

  const getHighScores = () => {
    fetch('/getHighScores').then( resp => {
      console.log(resp.json());

      setHighScores(JSON.parse(mockScores.data));
    })
  };

  return (
    <div className="high-score-app">
      <ScoreGenerator currentScore={currentScore} getNewCurrentScore={getNewCurrentScore}/>
      <ScoreSubmission culmulativeScore={cumulativeScore}/>
      <HighScoreChart highScores={highScores}/>
    </div>
  );
}

export default App;
