const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
}

const getSevenDaysBackDate = () => {
  let d = new Date();
  d.setDate(d.getDate() - 7);
  return d.toISOString().split('T')[0];
}

const convertDate = (givenDate) => {
  const date = new Date(givenDate);
  const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
  return date.getDate() + ' ' + months[date.getMonth()] + ', ' + date.getFullYear();
}


export { getTodayDate, getSevenDaysBackDate, convertDate };