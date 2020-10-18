import React, {useState} from 'react';
import PropTypes from "prop-types";

const ScoreSubmission = ({cumulativeScore, clickCount, addNewHighScore}) => {
  const [userName, setUserName] = useState('');
  const [submitError, setSubmitError] = useState('');

  const submitScore = () => {
    // check that the user has input a name of at least one character
    if (userName.length) {
      // format the game data into what the "api" is expecting
      const gameData = {
        name: userName,
        totalPoints: cumulativeScore,
        clicks: clickCount,
        // make a random id for now
        id: Math.round(Math.random() * 100)
      };
      // no errors that the user needs to address, so we'll reset if they had some.
      setSubmitError('');

      // post the new score to the server
      fetch('https://cors-anywhere.herokuapp.com/https://my-json-server.typicode.com/melnock/high-score-app/data', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameData)
      }).then(resp => {
        return resp.json()
      }).then(newScore => {
        addNewHighScore(newScore);
      }).catch(error => {
        console.error(error);
      });
    } else {
      setSubmitError('Please add a name');
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
      <button onClick={submitScore}> Send it! </button>
    </div>
  );
};

ScoreSubmission.propTypes = {
  cumulativeScore: PropTypes.number,
  clickCount: PropTypes.number,
  addNewHighScore: PropTypes.func
};

export default ScoreSubmission;
