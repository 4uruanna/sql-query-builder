/**
 * Enumerator for SQL ORDER BY directions.
 */
export const QueryOrderEnumerator = {
  /** Ascending order */
  ASC: "ASC",
  /** Descending order */
  DESC: "DESC",
};

/**
 * Type representing valid ORDER BY directions.
 */
export type QueryOrder = keyof typeof QueryOrderEnumerator;
