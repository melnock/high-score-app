import React from 'react';
import classnames from 'classnames';
import PropTypes from "prop-types";

const HighScoreLineItem = ({highScore, dataFormatter}) => {
  const highScoreLineItemClass = classnames({
    'high-score-line-item': true,
    'is-current-game': highScore.isCurrentGame
  });

  return (
    <div className={highScoreLineItemClass}>
      <p className="name">{highScore.name}</p>
      <p className="total-score">{dataFormatter(highScore)}</p>
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
  dataFormatter: PropTypes.func
};

export default HighScoreLineItem;
