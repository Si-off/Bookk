const makeDateStr = (date: string) => {
  const temp = new Date(date);

  let year, month, day, hour, minute;
  year = temp.getFullYear();
  month = temp.getMonth() + 1;
  day = temp.getDate();
  hour = temp.getHours();
  minute = temp.getMinutes();

  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
};

export default makeDateStr;
