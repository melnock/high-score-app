import React from 'react';
import PropTypes from 'prop-types';
import HighScoreLineItem from "./HighScoreLineItem";
import LoadingState from "./LoadingState";

const headerLabels = {
  name: 'Name',
  totalPoints: 'Total Score',
  clicks: 'Clicks'
};

const HighScoresChart = ({highScores, currentGame, sortMethod, isHighScoresChartLoading}) => {
  // spread the high scores from the api to avoid mutating the original array
  // sort the values by score or avg score / clicks
  // adding in the current game to show current ranking of the current game
  const sortedHighScores = [...highScores, currentGame].sort(sortMethod).reverse().slice(0, 10);
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
      {isHighScoresChartLoading && <LoadingState/>}
    </div>
  );
};

HighScoresChart.propTypes = {
  highScores: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      totalPoints: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      clicks: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
  currentGame: PropTypes.shape({
    name: PropTypes.string,
    totalPoints: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    clicks: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isCurrentGame: PropTypes.bool
  }),
  sortMethod: PropTypes.func,
  isHighScoresChartLoading: PropTypes.bool
};

export default HighScoresChart;
