export const DEFAULT_CLICK_LIMIT = 10;

export const formatAvgPointsPerClick = value => {
  if (value.clicks) {
    return (value.totalPoints / value.clicks).toFixed(2)
  }
  return 0;
};

export const TOTAL_POINTS_SORT = {
  key: 'totalPoints',
  title: 'Total Points',
  dataFormatter: value => value.totalPoints
};

export const AVG_POINTS_PER_CLICK_SORT = {
  key: 'avgPointsPerClick',
  title: 'Avg Points Per Click',
  dataFormatter: formatAvgPointsPerClick
};
