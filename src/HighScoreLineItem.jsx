import React from 'react';
import classnames from 'classnames';

const HighScoreLineItem = ({highScore, isHeader}) => {
  const highScoreLineItemClass = classnames({
    'high-score-line-item': true,
    'is-header': isHeader
  });

  return (
    <div className={highScoreLineItemClass}>
      <p className="name">{highScore.name}</p>
      <p className="total-score">{highScore.totalPoints}</p>
      <p className="clicks">{highScore.clicks}</p>
    </div>
  );
};

export default HighScoreLineItem;
