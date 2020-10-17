const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
}

const getSevenDaysBackDate = () => {
  let d = new Date();
  d.setDate(d.getDate() - 7);
  return d.toISOString().split('T')[0];
}

export { getTodayDate, getSevenDaysBackDate };