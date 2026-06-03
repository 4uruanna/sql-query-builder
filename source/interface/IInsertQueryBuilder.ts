import type IBuild from "./IBuild.ts";

/**
 * @todo
 */
export default interface IInsertQueryBuilder extends IBuild {
  /**
   * @todo
   * @param table
   */
  into(table: string): IInsertQueryBuilder;

  /**
   * @todo
   * @param columns
   */
  columns(...columns: string[]): IInsertQueryBuilder;

  /**
   * @todo
   * @param values
   */
  values(...values: unknown[]): IInsertQueryBuilder;
}
