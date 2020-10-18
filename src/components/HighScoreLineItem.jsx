import React from 'react';
import classnames from 'classnames';
import PropTypes from "prop-types";

const HighScoreLineItem = ({highScore, isHeader}) => {
  const highScoreLineItemClass = classnames({
    'high-score-line-item': true,
    'is-header': isHeader,
    'is-current-game': highScore.isCurrentGame
  });

  return (
    <div className={highScoreLineItemClass}>
      <p className="name">{highScore.name}</p>
      <p className="total-score">{highScore.totalPoints}</p>
      <p className="clicks">{highScore.clicks}</p>
    </div>
  );
};

HighScoreLineItem.propTypes = {
  highScore: PropTypes.shape({
    name: PropTypes.string,
    totalPoints: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    clicks: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isCurrentGame: PropTypes.bool
  }),
  isHeader: PropTypes.bool
};

export default HighScoreLineItem;
