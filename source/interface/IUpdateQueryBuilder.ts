import type { IBuild } from "./IBuild.ts";
import type { IWhere } from "./IWhere.ts";
import type { IJoin } from "./IJoin.ts";
import type { IBind } from "./IBind.ts";

/**
 * Interface for UPDATE query builders.
 */
export interface IUpdateQueryBuilder
  extends
    IBuild,
    IWhere<IUpdateQueryBuilder>,
    IJoin<IUpdateQueryBuilder>,
    IBind<IUpdateQueryBuilder> {
  /**
   * Sets the table to update.
   * @param table - The table name
   * @returns The builder instance for method chaining
   */
  from(table: string): IUpdateQueryBuilder;

  /**
   * Sets a column to update with a new value.
   * @param column - The column name to update
   * @param value - The new value for the column
   * @returns The builder instance for method chaining
   */
  set(column: string, value: unknown): IUpdateQueryBuilder;
}
