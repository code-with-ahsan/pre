export const MAX_NUM = 5; 

export const getRandomValue = () => {
  return Math.floor(Math.random() * MAX_NUM + 1).toString();
}