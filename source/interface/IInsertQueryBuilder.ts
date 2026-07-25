import type { IBuild } from "./IBuild.ts";

/**
 * Interface for INSERT query builders.
 */
export interface IInsertQueryBuilder extends IBuild {
  /**
   * Sets the table to insert into.
   * @param table - The table name
   * @returns The builder instance for method chaining
   */
  into(table: string): IInsertQueryBuilder;

  /**
   * Sets the columns to insert values into.
   * @param columns - Column names to insert into
   * @returns The builder instance for method chaining
   */
  columns(...columns: string[]): IInsertQueryBuilder;

  /**
   * Sets the values to insert.
   * @param values - Values to insert (will be bound as parameters)
   * @returns The builder instance for method chaining
   */
  values(...values: unknown[]): IInsertQueryBuilder;

  /**
   * Adds a RETURNING clause to return specified columns.
   * @param columns - Column names to return
   * @returns The builder instance for method chaining
   */
  returning(...columns: string[]): IInsertQueryBuilder;
}
