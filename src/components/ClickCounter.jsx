import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {DEFAULT_CLICK_LIMIT} from '../constants/constants';

const ClickCounter = ({clickCount}) => {
  const clickArray = Array.from({length: DEFAULT_CLICK_LIMIT}, (_, i) => i + 1);
  const ClickCountIndicators = clickArray.map(item => {
    const indicatorClass = classnames({
      'indicator-item': true,
      'click-reached': item <= clickCount
    });

    return <div key={item} className={indicatorClass}>{item}</div>
  });
  return (
    <div className="click-counter">
      <p>Click Count:</p>
      <div>
        {ClickCountIndicators}
      </div>
    </div>
  );
};

ClickCounter.propTypes = {
  clickCount: PropTypes.number
};

export default ClickCounter;
