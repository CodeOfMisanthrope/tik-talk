export function timeAgo() {

}

export function calcDiffTime(pastDate: Date) {
  const dateNow = Date.now();
  // console.log(pastDate.getTime());
  // console.log(dateNow, pastDate.getTime());
  const diffMilliseconds = dateNow - pastDate.getTime();
  // console.log(diffMilliseconds);
  const seconds = millisecondsToSecond(diffMilliseconds);
  // console.log(seconds);
  const minutes = secondsToMinutes(seconds);
  // console.log(minutes);
  const hours = minutesToHours(minutes);
  console.log(hours);
  // const dateDiff = new Date(diffMilliseconds);
  // console.log(dateDiff);
}

export function millisecondsToSecond(milliseconds: number) {
  return milliseconds / 1000;
}

export function secondsToMinutes(seconds: number) {
  return seconds / 60;
}

export function minutesToHours(minutes: number) {
  return minutes / 60;
}

// export function convertToValidDateStr(date: string) {
//
// }
