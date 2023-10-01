/**
 * @returns an array of consecutive integers from 0 to n-1
 * @example range(4) // [0, 1, 2, 3]
 */
const range = (n) => Array.from(Array(n).keys());

const combination = (a1, a2) => a1.flatMap((e1) => a2.map((e2) => [e1, e2]));

/**
 * @returns The combination of two ranges n1 and n2
 * @example range2d(2, 2) // [[0, 0], [0, 1], [1, 0], [1, 1]]
 */
const range2d = (n1, n2) => combination(range(n1), range(n2));

const partition = (arr, predicate) => {
  const yes = [];
  const no = [];

  arr.forEach((element) => {
    if (predicate(element)) yes.push(element);
    else no.push(element);
  });

  return [yes, no];
};

const randomInteger = (n) => Math.floor(Math.random() * n);

const randomElement = (arr) => arr[randomInteger(arr.length)];

export { range, combination, range2d, partition, randomInteger, randomElement };
