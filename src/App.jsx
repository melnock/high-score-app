import React, {useEffect, useState} from 'react';

import ScoreGenerator from './ScoreGenerator';
import ScoreSubmission from './ScoreSubmission';
import HighScoreChart from './HighScoreChart';

import './App.scss';

const TOTAL_POINTS_SORT = 'totalPoints';
const AVG_POINTS_PER_CLICK_SORT = 'avgPointsPerClick';

function App() {
  // currentScore is the visible score
  const [currentScore, setCurrentScore] = useState(0);
  // cumulativeScore is the total score from all clicks
  const [cumulativeScore, setCumulativeScore] = useState(0);
  // number of times the user has clicked the new score button
  const [clickCount, setClickCount] = useState(0);
  const [highScores, setHighScores] = useState([]);
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
    fetch('https://cors-anywhere.herokuapp.com/https://my-json-server.typicode.com/melnock/high-score-app/data')
      .then( resp => {
        return resp.json()
      }).then(data => {
          console.log(data);
        setHighScores(data);
      }).catch(error => console.error(error));
  };

  const sortMethod = (a, b) => {
    let aValue;
    let bValue;
    if (highScoresChartSort === TOTAL_POINTS_SORT) {
      aValue = a.totalPoints;
      bValue = b.totalPoints;
    } else if (highScoresChartSort === AVG_POINTS_PER_CLICK_SORT) {
      aValue = a.totalPoints / a.clicks;
      bValue = b.totalPoints / b.clicks;
    } else {
      throw new Error('Unsupported sort type');
    }
     return aValue - bValue;
  };

  return (
    <div className="high-score-app">
      <ScoreGenerator currentScore={currentScore} getNewCurrentScore={getNewCurrentScore}/>
      <ScoreSubmission culmulativeScore={cumulativeScore}/>
      <HighScoreChart
        highScores={highScores}
        cumulativeScore={cumulativeScore}
        sortMethod={sortMethod}
        setHighScoreChartSort={setHighScoresChartSort}
      />
    </div>
  );
}

export default App;
