import type ISqlBind from "../interface/ISqlBind.ts";
import type ISqlBuild from "../interface/ISqlBuild.ts";

/**
 * @todo
 */
export default abstract class SqlInsertQueryBuilder
  implements ISqlBuild, ISqlBind<SqlInsertQueryBuilder> {
  protected readonly _table: string;

  /**
   * @todo
   */
  public abstract get values(): unknown[];

  /**
   * @todo
   */
  public constructor(table: string) {
    this._table = table;
  }

  /**
   * @todo
   */
  public abstract bind(value: unknown): string;

  /**
   * @todo
   */
  public abstract columns(...columns: string[]): SqlInsertQueryBuilder;

  /**
   * @todo
   */
  public abstract rows(...values: unknown[][]): SqlInsertQueryBuilder;

  /**
   * @todo
   */
  public abstract build(): string;
}
