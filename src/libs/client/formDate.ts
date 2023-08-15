const ONE_MINUTE_MS = 1000 * 60;
const ONE_HOUR_MS = ONE_MINUTE_MS * 60;
const ONE_DAY_MS = ONE_HOUR_MS * 24;
const ONE_WEEK_MS = ONE_DAY_MS * 7;

const formatDate = (inputDate: Date | undefined) => {
  if (!inputDate) return;

  const createdAt = new Date(inputDate);

  if (isNaN(createdAt.getTime())) {
    return '잘못된 날짜 입니다.';
  }

  const createdAt_MS = createdAt.getTime();
  const currentTime = Date.now();
  const timeDifference = currentTime - createdAt_MS;

  if (timeDifference < ONE_MINUTE_MS) {
    return '방금전';
  }
  if (timeDifference < ONE_HOUR_MS) {
    const minutes = Math.floor(timeDifference / ONE_MINUTE_MS);
    return `${minutes}분 전`;
  }
  if (timeDifference < ONE_DAY_MS) {
    const hours = Math.floor(timeDifference / ONE_HOUR_MS);
    return `${hours}시간 전`;
  }
  if (timeDifference < ONE_WEEK_MS) {
    const days = Math.floor(timeDifference / ONE_DAY_MS);
    return `${days}일 전`;
  }
  return createdAt.toLocaleString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' });
};

export default formatDate;
