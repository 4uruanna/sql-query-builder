import type { Join } from "../enumerator/Join.ts";
import type { QueryOrder } from "../enumerator/QueryOrder.ts";
import type ISqlBind from "../interface/ISqlBind.ts";
import type ISqlBuild from "../interface/ISqlBuild.ts";
import type ISqlJoin from "../interface/ISqlJoin.ts";
import type ISqlWhere from "../interface/ISqlWhere.ts";
import type ISqlWhereBuilder from "../interface/ISqlWhereBuilder.ts";

/**
 * Class to implement for your select sql builder
 */
export default abstract class SqlSelectQueryBuilder
  implements
    ISqlBuild,
    ISqlWhere<SqlSelectQueryBuilder>,
    ISqlBind<SqlSelectQueryBuilder>,
    ISqlJoin<SqlSelectQueryBuilder> {

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
  public abstract join(
    type: Join,
    rightTable: string,
    leftColumn: string,
    rightColumn: string,
  ): SqlSelectQueryBuilder;

  /**
   * @todo
   */
  public abstract bind(value: unknown): string;

  /**
   * @todo
   */
  public abstract where(condition: string): ISqlWhereBuilder<this>;

  /**
   * @todo
   */
  public abstract setWhere(clause: string): void;

  /**
   * @todo
   */
  public abstract columns(...columns: string[]): SqlSelectQueryBuilder;

  /**
   * Defines the limit
   * @param limit
   */
  public abstract limit(limit: number): SqlSelectQueryBuilder;

  /**
   * Defines the offset
   * @param offset
   */
  public abstract offset(offset: number): SqlSelectQueryBuilder;

  /**
   * Defines the order
   * @param column
   * @param order
   */
  public abstract orderBy(column: string, order: QueryOrder): SqlSelectQueryBuilder;

  /**
   * Return raw query
   */
  public abstract build(): string;
}
