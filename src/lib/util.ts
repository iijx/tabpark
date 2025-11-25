
/**
 * 字符串数组，内容是否相等
 */
export const stringArringIsEqual = (strArr1: string[], strArr2: string[]) => {
  if (strArr1.length !== strArr2.length) {
    return false;
  }

  for (let i = 0; i < strArr1.length; i++) {
    if (strArr1[i] !== strArr2[i]) {
      return false;
    }
  }

  return true;
}