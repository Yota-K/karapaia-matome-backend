export const createTime = () => {
  const dt = new Date();
  const year = dt.getFullYear();
  const date = dt.getDate();
  const hours = dt.getHours();
  const minutes = dt.getMinutes();

  return `${year}-${date}-${hours}:${minutes}`;
};
