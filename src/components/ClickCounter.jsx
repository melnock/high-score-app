import React from 'react';
import classnames from 'classnames';

const ClickCounter = ({clickCount}) => {
  const clickArray = Array.from({length: 10}, (_, i) => i + 1);
  console.log(clickArray);
  const ClickCountIndicators = clickArray.map(item => {
    const indicatorClass = classnames({
      'indicator-item': true,
      'click-reached': item <= clickCount
    });

    return <div className={indicatorClass}>{item}</div>
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

export default ClickCounter;
