import React, {useEffect, useState} from 'react';

import ScoreGenerator from './components/ScoreGenerator';
import ScoreSubmission from './components/ScoreSubmission';
import HighScoreChart from './components/HighScoreChart';

import {TOTAL_POINTS_SORT, AVG_POINTS_PER_CLICK_SORT} from "./constants/constants";

import './App.scss';

function App() {
  // currentScore is the visible score
  const [currentScore, setCurrentScore] = useState(0);
  // cumulativeScore is the total score from all clicks
  const [cumulativeScore, setCumulativeScore] = useState(0);
  // number of times the user has clicked the new score button
  const [clickCount, setClickCount] = useState(0);
  // retrieved scores from api
  const [highScores, setHighScores] = useState([]);
  // while waiting for the values for high score chart to populate, indicate to the user that they are waiting
  const [isHighScoresChartLoading, setIsHighScoresChartLoading] = useState(false);
  // configuration determining how the score chart should be sorted
  const [highScoresChartSort, setHighScoresChartSort] = useState(TOTAL_POINTS_SORT);

  useEffect(() => {
    getHighScores();
  }, []);

  const getNewCurrentScore = () => {
    // verify the click count is less than 10
    // if it reaches 10, we've given the user too many clicks
    if (clickCount < 10) {
      const newScore = Math.round(Math.random() * 200) - 100;
      setClickCount(clickCount + 1);
      setCumulativeScore(currentScore + newScore);
      setCurrentScore(newScore);
    }
  };

  const getHighScores = () => {
    // look at the mock server to retrieve the scores
    setIsHighScoresChartLoading(true);
    fetch('https://cors-anywhere.herokuapp.com/https://my-json-server.typicode.com/melnock/high-score-app/data')
      .then( resp => {
        return resp.json()
      }).then(data => {
        setIsHighScoresChartLoading(false);
        setHighScores(data);
      }).catch(error => console.error(error));
  };

  const sortMethod = (a, b) => {
    const aValue = highScoresChartSort.dataFormatter(a);
    const bValue = highScoresChartSort.dataFormatter(b);
    return aValue - bValue;
  };

  // when a user saves a score, add it to our existing scores for the chart and reset the game.
  const addNewHighScore = newScore => {
    const copyHighScores = [...highScores];
    copyHighScores.push(newScore);
    setHighScores(copyHighScores);
    // once a user has added the score to our high scores,
    // it is time to reset the values in order to play again
    resetGame();
  };

  const resetGame = () => {
    // set all values back to default/initial values
    setCurrentScore(0);
    setClickCount(0);
    setCumulativeScore(0);
  };

  return (
    <div className="high-score-app">
      <img
        alt="number game header image"
        className="game-header"
        src="https://images.pexels.com/photos/1314529/pexels-photo-1314529.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      />
      <ScoreGenerator
        currentScore={currentScore}
        getNewCurrentScore={getNewCurrentScore}
        clickCount={clickCount}
        resetGame={resetGame}
      />
      <ScoreSubmission
        cumulativeScore={cumulativeScore}
        clickCount={clickCount}
        addNewHighScore={addNewHighScore}
      />
      <HighScoreChart
        highScores={highScores}
        currentGame={{
          name: 'You',
          totalPoints: cumulativeScore,
          isCurrentGame: true,
          clicks: clickCount
        }}
        sortMethod={sortMethod}
        setHighScoreChartSort={setHighScoresChartSort}
        highScoreChartSort={highScoresChartSort}
        isHighScoresChartLoading={isHighScoresChartLoading}
      />
    </div>
  );
}

export default App;
