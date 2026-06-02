import type { Join } from "../enumerator/Join.ts";
import type ISqlBind from "../interface/ISqlBind.ts";
import type ISqlBuild from "../interface/ISqlBuild.ts";
import type ISqlJoin from "../interface/ISqlJoin.ts";
import type ISqlWhere from "../interface/ISqlWhere.ts";
import ISqlWhereBuilder from "../interface/ISqlWhereBuilder.ts";

/**
 * @todo
 */
export default abstract class SqlUpdateQueryBuilder
  implements
    ISqlBuild,
    ISqlBind<SqlUpdateQueryBuilder>,
    ISqlJoin<SqlUpdateQueryBuilder>,
    ISqlWhere<SqlUpdateQueryBuilder> {

  /**
   * @todo
   */
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
  public abstract build(): string;

  /**
   * @todo
   */
  public abstract bind(value: unknown): string;

  /**
   * @todo
   * @param column
   * @param value
   */
  public abstract set(column: string, value: unknown): SqlUpdateQueryBuilder;

  /**
   * @todo
   */
  public abstract setWhere(clause: string): void;

  /**
   * @todo
   */
  public abstract where(condition: string): ISqlWhereBuilder<this>;

  /**
   * @todo
   */
  public abstract join(
    type: Join,
    rightTable: string,
    leftColumn: string,
    rightColumn: string,
  ): SqlUpdateQueryBuilder;
}
