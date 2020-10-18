import React from 'react';
import PropTypes from 'prop-types';
import HighScoreLineItem from "./HighScoreLineItem";
import HighScoreChartHeader from "./HighScoreChartHeader";
import LoadingState from "./LoadingState";
import {AVG_POINTS_PER_CLICK_SORT, TOTAL_POINTS_SORT} from "../constants/constants";

const HighScoresChart = ({
  highScores,
  currentGame,
  sortMethod,
  isHighScoresChartLoading,
  setHighScoreChartSort,
  highScoreChartSort
}) => {
  // spread the high scores from the api to avoid mutating the original array
  // sort the values by score or avg score / clicks
  // adding in the current game to show current ranking of the current game
  // slice to get the top ten if there are more than 10 items in the list
  const sortedHighScores = [...highScores, currentGame].sort(sortMethod).reverse().slice(0, 10);
  // Convert the sorted scores from the api request into line items for the high score chart
  const HighScores = sortedHighScores.map( score => {
    return <HighScoreLineItem
      key={score.name + score.totalPoints}
      highScore={score}
      dataFormatter={highScoreChartSort.dataFormatter}
    />
  });

  return (
    <div className="high-score-chart">
      <HighScoreChartHeader setHighScoreChartSort={setHighScoreChartSort} highScoreChartSort={highScoreChartSort}/>
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
  setHighScoreChartSort: PropTypes.func,
  highScoreChartSort: PropTypes.oneOf([TOTAL_POINTS_SORT, AVG_POINTS_PER_CLICK_SORT]),
  sortMethod: PropTypes.func,
  isHighScoresChartLoading: PropTypes.bool
};

export default HighScoresChart;
