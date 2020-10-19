import React from 'react';
import classnames from 'classnames';
import PropTypes from "prop-types";
import {TOTAL_POINTS_SORT, AVG_POINTS_PER_CLICK_SORT} from "../constants/constants";


const HighScoreChartHeader = ({setHighScoreChartSort, highScoreChartSort}) => {
  const highScoreLineItemClass = classnames({
    'high-score-line-item': true,
    'is-header': true
  });

  const totalScoreClass = classnames({
    'total-score': true,
    selected: highScoreChartSort.key === TOTAL_POINTS_SORT.key
  });

  const avgPointsPerClickClass = classnames({
    'avg-points-per-click': true,
    selected: highScoreChartSort.key === AVG_POINTS_PER_CLICK_SORT.key
  });

  const handleSwapChartSort = () => {
    const newSort = highScoreChartSort.key === TOTAL_POINTS_SORT.key ? AVG_POINTS_PER_CLICK_SORT : TOTAL_POINTS_SORT;
    setHighScoreChartSort(newSort);
  };

  return (
    <div className={highScoreLineItemClass}>
      <p className="name">Name</p>
      <p className={totalScoreClass}>{TOTAL_POINTS_SORT.title}
        <button className="chart-sort-toggle" onClick={handleSwapChartSort}/>
      </p>
      <p className={avgPointsPerClickClass}>{AVG_POINTS_PER_CLICK_SORT.title}</p>
      <p className="clicks">Total Clicks</p>
    </div>
  );
};

HighScoreChartHeader.propTypes = {
  setHighScoreChartSort: PropTypes.func,
  highScoreChartSort: PropTypes.oneOf([TOTAL_POINTS_SORT, AVG_POINTS_PER_CLICK_SORT])
};

export default HighScoreChartHeader;
