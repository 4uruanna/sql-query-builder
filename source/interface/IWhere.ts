/**
 * Interface for query builders that support WHERE conditions.
 */
export interface IWhere<T> {
  /**
   * Adds a WHERE condition to the query.
   * @param condition - The condition string (e.g., "t.name = $1")
   * @returns The builder instance for method chaining
   */
  where(condition: string): T;

  /**
   * Adds an AND condition to the current WHERE clause.
   * @param condition - The condition string to AND with existing conditions
   * @returns The builder instance for method chaining
   */
  and(condition: string): T;

  /**
   * Adds an OR condition to the WHERE clause.
   * @param condition - The condition string for the OR clause
   * @returns The builder instance for method chaining
   */
  or(condition: string): T;
}
