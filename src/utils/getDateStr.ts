const makeDateStr = (date: string) => {
  const temp = new Date(date);

  const year = temp.getFullYear();
  const month = temp.getMonth() + 1;
  const day = temp.getDate();
  const hour = temp.getHours();
  const minute = temp.getMinutes();

  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
};

export default makeDateStr;
