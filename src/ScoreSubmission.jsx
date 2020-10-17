import React, {useState} from 'react';

const ScoreSubmission = ({cumulativeScore, clickCount}) => {
  const [userName, setUserName] = useState('');
  const [submitError, setSubmitError] = useState('');

  const submitScore = () => {
    if (userName.length) {
      const gameData = {
        name: userName,
        totalPoints: cumulativeScore,
        totalClicks: clickCount
      };
      setSubmitError('');
      fetch('/saveUserScore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameData)
      }).then(resp => {
        console.log(resp);
      });
    } else {
      setSubmitError('Need to add a name');
    }
  };

  const handleOnChange = (event) => {
    const newName = event.target.value;
    setUserName(newName);
  };

  return (
    <div className="score-submission">
      {Boolean(submitError.length) && <p className="submit-error">{submitError}</p> }
      <input placeholder="Enter your name to submit score" value={userName} onChange={handleOnChange}/>
      <button onClick={submitScore}> Submit Score </button>
    </div>
  );
};

export default ScoreSubmission;
