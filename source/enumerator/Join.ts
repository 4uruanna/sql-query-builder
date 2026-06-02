/**
 * @todo
 */
export const JoinEnumerator = {
  INNER: "INNER",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  FULL: "FULL",
};

/**
 * @todo
 */
export type Join = keyof typeof JoinEnumerator;
