import React from 'react';
import ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import {DEFAULT_CLICK_LIMIT, formatAvgPointsPerClick, TOTAL_POINTS_SORT} from "./constants/constants";

import App from './App';
import ScoreGenerator from "./components/ScoreGenerator";
import ClickCounter from "./components/ClickCounter";
import HighScoresChart from "./components/HighScoreChart";
import LoadingState from "./components/LoadingState";
import HighScoreLineItem from "./components/HighScoreLineItem";

const mockScoresUnsorted = [
  {"name": "Jane Doe", "totalPoints": 157, "clicks": 5, "id": 1},
  {"name": "Lily Allen", "totalPoints": 234, "clicks": 8, "id": 2},
  {"name": "Katara", "totalPoints": 390, "clicks": 10, "id": 3},
  {"name": "Aang", "totalPoints": 232, "clicks": 10, "id": 4},
  {"name": "Appa", "totalPoints": 395, "clicks": 10, "id": 5},
  {"name": "Mo Mo", "totalPoints": 109, "clicks": 9, "id": 6},
  {"name": "Korra", "totalPoints": 505, "clicks": 10, "id": 7},
  {"name": "Sakka", "totalPoints": 423, "clicks": 6, "id": 8},
  {"name": "Gran Gran", "totalPoints": 222, "clicks": 7, "id": 9},
  {"name": "Uncle Iro", "totalPoints": 480, "clicks": 8, "id": 10},
  {"name": "Toph", "totalPoints": 100, "clicks": 8, "id": 11}
];

const mockScoresSorted = [
  {"name": "Korra", "totalPoints": 505, "clicks": 10, "id": 7},
  {"name": "Uncle Iro", "totalPoints": 480, "clicks": 8, "id": 10},
  {"name": "Sakka", "totalPoints": 423, "clicks": 6, "id": 8},
  {"name": "Appa", "totalPoints": 395, "clicks": 10, "id": 5},
  {"name": "Katara", "totalPoints": 390, "clicks": 10, "id": 3},
  {"name": "Lily Allen", "totalPoints": 234, "clicks": 8, "id": 2},
  {"name": "Aang", "totalPoints": 232, "clicks": 10, "id": 4},
  {"name": "Gran Gran", "totalPoints": 222, "clicks": 7, "id": 9},
  {"name": "Jane Doe", "totalPoints": 157, "clicks": 5, "id": 1},
  {"name": "Mo Mo", "totalPoints": 109, "clicks": 9, "id": 6},
  {"name": "Toph", "totalPoints": 100, "clicks": 8, "id": 11}
];

const mockSortMethod = (a, b) => {
  const aValue = TOTAL_POINTS_SORT.dataFormatter(a);
  const bValue = TOTAL_POINTS_SORT.dataFormatter(b);
  return aValue - bValue;
};

describe('Initial load of High Score App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
  });
});

async function promiseSetProps(component, props) {
  return new Promise(resolve => {
    component.setProps(props, () => {
      resolve();
    });
  });
}

describe('ScoreGenerator', () => {
  let scoreGenerator;
  beforeAll(() => {
    scoreGenerator = mount(
      <ScoreGenerator
        clickCount={0}
        currentScore={0}
        getNewCurrentScore={()=>{}}
        resetGame={()=>{}}
      />
    );
  });

  // testing the default value as a way to ensure that the props are passed correctly
  // and that there are no breaking changes impeding mount
  it('renders with an initial value of zero', () => {
    expect.assertions(1);
    expect(scoreGenerator.find('.current-score').text()).toBe('0');
  });

  // testing below to ensure that the reset button only appears if there is something to reset
  // future changes that might affect the default click count
  // ought to take into consideration when the reset button appears
  it('renders the reset button if the click count is greater than zero', async () => {
    expect.assertions(2);
    expect(scoreGenerator.find('.reset-game-button')).toHaveLength(0);
    await promiseSetProps(scoreGenerator, {
      clickCount: 1
    });
    expect(scoreGenerator.find('.reset-game-button')).toHaveLength(1);
  })
});

describe('ClickCounter', () => {
  let clickCounter;
  beforeAll(() => {
    clickCounter = mount(
      <ClickCounter
        clickCount={0}
      />
    );
  });
  // track that if the default number of clicks changes, it is appropriately reflected in the counter
  // also verifies that the click counter loads
  it('displays a list of a number for each number in the allowed clicks', () => {
    expect.assertions(1);
    expect(clickCounter.find('.indicator-item')).toHaveLength(DEFAULT_CLICK_LIMIT);
  });
  it('adjusts the indicator when the click count changes', async () => {
    expect.assertions(2);
    expect(clickCounter.find('.click-reached')).toHaveLength(0);
    await promiseSetProps(clickCounter, {
      clickCount: 3
    });
    expect(clickCounter.find('.click-reached')).toHaveLength(3);
  })
});

describe('HighScoreChart', () => {
  let highScoreChart;
  beforeAll(() => {
    highScoreChart = mount(
      <HighScoresChart
        highScores={mockScoresUnsorted}
        currentGame={{
          name: 'You',
          totalPoints: 0,
          isCurrentGame: true,
          clicks: 0
        }}
        sortMethod={mockSortMethod}
        setHighScoreChartSort={() => {}}
        highScoreChartSort={TOTAL_POINTS_SORT}
        isHighScoresChartLoading={true}
      />
    );
  });
  // verify the loading state triggers
  it('loads with the loading state', () => {
    expect.assertions(1);
    expect(highScoreChart.find(LoadingState)).toHaveLength(1);
  });
  it('displays no more than 10 items in the chart', async () => {
    expect.assertions(1);
    await promiseSetProps(highScoreChart, {
      isHighScoresChartLoading: false
    });
    expect(highScoreChart.find(HighScoreLineItem)).toHaveLength(10);
  });
  it('properly sorts the unsorted items for display', () => {
    expect.assertions(3);
    expect(highScoreChart.find(HighScoreLineItem).at(0).prop('highScore')).toMatchObject(mockScoresSorted[0]);
    expect(highScoreChart.find(HighScoreLineItem).at(5).prop('highScore')).toMatchObject(mockScoresSorted[5]);
    expect(highScoreChart.find(HighScoreLineItem).at(7).prop('highScore')).toMatchObject(mockScoresSorted[7]);
  });
  it('displays the current game if the score is high enough', async () => {
    expect.assertions(1);
    await promiseSetProps(highScoreChart, {
      currentGame: {
        name: 'You',
        totalPoints: 400,
        isCurrentGame: true,
        clicks: 10
      }
    });
    expect(highScoreChart.find('.is-current-game')).toHaveLength(1);
  });
});

// utils are important building blocks to be tested
describe('formatAvgPointsPerClick util', () => {
  // verify util does not attempt to divide by zero
  it('returns zero if there have been no clicks', () => {
    const mockHighScore = {
      name: 'Test',
      totalPoints: 0,
      clicks: 0
    };
    const testFormattedAvg = formatAvgPointsPerClick(mockHighScore);
    expect.assertions(1);
    expect(testFormattedAvg).toBe(0);
  });
  it('averages the clicks by the total points', () => {
    const mockHighScore = {
      name: 'Test',
      totalPoints: 250,
      clicks: 5
    };
    const testFormattedAvg = formatAvgPointsPerClick(mockHighScore);
    expect.assertions(1);
    expect(testFormattedAvg).toBe('50.00');
  });
  it('averages the clicks by the total points and only has two decimal places', () => {
    const mockHighScore = {
      name: 'Test',
      totalPoints: 100,
      clicks: 3
    };
    const testFormattedAvg = formatAvgPointsPerClick(mockHighScore);
    expect.assertions(1);
    expect(testFormattedAvg).toBe('33.33');
  });
});
