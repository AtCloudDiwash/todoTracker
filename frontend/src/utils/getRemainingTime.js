export default function getTimeRemaining(deadline) {
  if (deadline === null) {
    return null;
  }
  const deadlineDate = new Date(deadline);
  const now = new Date();

  const diffMs = deadlineDate - now;

  if (diffMs <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true,
    };
  }

  const totalSeconds = Math.floor(diffMs / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
    expired: false,
  };
}

