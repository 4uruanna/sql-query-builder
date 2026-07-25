import type { Join } from "../enumerator/Join.ts";

/**
 * Interface for query builders that support JOIN operations.
 */
export interface IJoin<T> {
  /**
   * Adds a JOIN clause to the query.
   * @param type - The type of JOIN (INNER, LEFT, RIGHT, FULL)
   * @param leftColumn - The column from the left table to join on
   * @param rightTable - The right table to join
   * @param rightColumn - The column from the right table to join on
   * @returns The builder instance for method chaining
   */
  join(
    type: Join,
    leftColumn: string,
    rightTable: string,
    rightColumn: string,
  ): T;
}
