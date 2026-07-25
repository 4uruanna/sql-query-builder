/**
 * Enumerator for SQL JOIN types.
 */
export const JoinEnumerator = {
  /** Inner join */
  INNER: "INNER",
  /** Left join */
  LEFT: "LEFT",
  /** Right join */
  RIGHT: "RIGHT",
  /** Full outer join */
  FULL: "FULL",
};

/**
 * Type representing valid JOIN types.
 */
export type Join = keyof typeof JoinEnumerator;
