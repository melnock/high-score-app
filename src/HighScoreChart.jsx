import React from 'react';
import HighScoreLineItem from "./HighScoreLineItem";

const headerLabels = {
  name: 'Name',
  totalPoints: 'Total Score',
  clicks: 'Clicks'
};

const HighScoresChart = ({highScores, cumulativeScore, sortMethod}) => {
  // spread the high scores from the api to avoid mutating the original array
  // sort the values by score or avg score / clicks
  const sortedHighScores = [...highScores].sort(sortMethod).reverse();
  // Convert the sorted scores from the api request into line items for the high score chart
  const HighScores = sortedHighScores.map( score => {
    return <HighScoreLineItem key={score.name + score.totalPoints} highScore={score}/>
  });

  // Add our header into the chart
  HighScores.unshift(
    <HighScoreLineItem key="header" highScore={headerLabels} isHeader/>
  );
  return (
    <div className="high-score-chart">
      {HighScores}
    </div>
  );
};

export default HighScoresChart;
