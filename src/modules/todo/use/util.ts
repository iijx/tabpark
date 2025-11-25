export const isToday = (time: number) => {
  return new Date(time).toDateString() === new Date().toDateString();
}

// 判断是否是本自然周内
export const isToWeek = (time: number) => {
  if (time < Date.now()) return false;

  const lasttime = getCurWeekLastTime();
  return time <= lasttime;
}

// 判断是否在 7 天内
export const isTo7Days = (time: number) => {
  if (time < Date.now()) return false;
  const lasttime = Date.now() + 7 * 24 * 60 * 60 * 1000;
  return time <= lasttime;
}

// 判断是否是本月内
export const isToMonth = (time: number) => {
  if (time < Date.now()) return false;
  const lasttime = getCurMonthLastTime();
  return time <= lasttime;
}

// 判断是否是本年内
export const isToYear = (time: number) => {
  if (time < Date.now()) return false;
  const lasttime = getCurYearLastTime();
  return time <= lasttime;
}

// 本周的最后一天 23:59:59 的时间戳
let curWeekLastTime: number;
export const getCurWeekLastTime = () => {
  if (!curWeekLastTime) {
    const now = new Date();
    now.setDate(now.getDate() + 6)
    now.setHours(23, 59, 59);
    curWeekLastTime = now.getTime();
  }
  return curWeekLastTime;
}
// 本月最后一天 23:59:59 的时间戳
let curMonthLastTime: number;
export const getCurMonthLastTime = () => {
  if (!curMonthLastTime) {
    const now = new Date();
    now.setDate(1);
    now.setMonth(now.getMonth() + 1); // 此时为：下一个月的第一天
    now.setDate(0); // 会将日期设置为上个月的最后一天
    now.setHours(23, 59, 59);
    curMonthLastTime = now.getTime();
  }
  return curMonthLastTime;
}

// 本年的最后一天 23:59:59 的时间戳
let curYearLastTime: number;
export const getCurYearLastTime = () => {
  if (!curYearLastTime)  {
    const now = new Date();
    const year = now.getFullYear();
    const lastDayOfYear = new Date(year, 11, 31, 23, 59, 59);
    curYearLastTime = lastDayOfYear.getTime();
  }
  return curYearLastTime;
}
