import type { IBuild } from "./IBuild.ts";
import type { IWhere } from "./IWhere.ts";
import type { IJoin } from "./IJoin.ts";
import type { IBind } from "./IBind.ts";
import type { QueryOrder } from "../enumerator/QueryOrder.ts";

/**
 * Interface for SELECT query builders.
 */
export interface ISelectQueryBuilder
  extends
    IBuild,
    IWhere<ISelectQueryBuilder>,
    IJoin<ISelectQueryBuilder>,
    IBind<ISelectQueryBuilder> {
  /**
   * Sets the table to select from.
   * @param table - The table name (can include alias, e.g., "table t")
   * @returns The builder instance for method chaining
   */
  from(table: string): ISelectQueryBuilder;

  /**
   * Sets the columns to select.
   * @param columns - Column names or expressions to select
   * @returns The builder instance for method chaining
   */
  columns(...columns: string[]): ISelectQueryBuilder;

  /**
   * Sets the maximum number of rows to return.
   * @param limit - The maximum number of rows
   * @returns The builder instance for method chaining
   */
  limit(limit: number): ISelectQueryBuilder;

  /**
   * Sets the number of rows to skip.
   * @param offset - The number of rows to skip
   * @returns The builder instance for method chaining
   */
  offset(offset: number): ISelectQueryBuilder;

  /**
   * Adds an ORDER BY clause to the query.
   * @param column - The column to order by
   * @param order - The sort direction (ASC or DESC)
   * @returns The builder instance for method chaining
   */
  orderBy(column: string, order: QueryOrder): ISelectQueryBuilder;
}
