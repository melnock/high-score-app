import React, {useState} from 'react';

const ScoreSubmission = ({cumulativeScore, clickCount}) => {
  const [userName, setUserName] = useState('');

  const submitScore = () => {
    const gameData = {
      userName,
      cumulativeScore,
      totalClicks: clickCount
    };

    fetch('/saveUserScore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(gameData)
    }).then( resp => {
      console.log(resp.json());
    });
  };

  const handleOnChange = (event) => {
    const newName = event.target.value;
    setUserName(newName);
  };

  return (
    <div className="score-generator">
      <input placeholder="Enter your name to submit score" value={userName} onChange={handleOnChange}/>
      <button onClick={submitScore}> Generate New Score </button>
    </div>
  );
};

export default ScoreSubmission;
