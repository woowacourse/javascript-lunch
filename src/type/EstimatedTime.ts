const ESTIMATED_TIME_LIST = ["5", "10", "15", "20", "30"] as const;

type EstimatedTime = typeof ESTIMATED_TIME_LIST[number];

const getEstimatedTimeMemberList = () => [...ESTIMATED_TIME_LIST];

const isValidEstimatedTime = (estimtedTime: string): estimtedTime is EstimatedTime => (
  ESTIMATED_TIME_LIST.includes(<EstimatedTime>estimtedTime)
);

export { EstimatedTime, getEstimatedTimeMemberList, isValidEstimatedTime };
