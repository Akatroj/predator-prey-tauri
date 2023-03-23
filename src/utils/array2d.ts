export function forEach2D<T>(arr: T[][], iter: (el: T, x: number, y: number) => void) {
  arr.forEach((row, y) => row.forEach((el, x) => iter(el, x, y)));
}

export function map2D<T, U = T>(
  arr: T[][],
  mapper: (el: T, x: number, y: number) => U,
): U[][] {
  return arr.map((row, y) => row.map((el, x) => mapper(el, x, y)));
}

export function init2DArray<T>(size: number, mapper: (x: number, y: number) => T): T[][] {
  const emptyRow = Array<undefined>(size).fill(undefined);
  const emptyArr = Array<undefined[]>(size).fill(emptyRow);

  // console.log(emptyArr);

  return map2D(emptyArr, (_, x, y) => mapper(x, y));
}
