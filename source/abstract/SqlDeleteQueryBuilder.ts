import type { Join } from "../enumerator/Join.ts";
import type ISqlBind from "../interface/ISqlBind.ts";
import type ISqlBuild from "../interface/ISqlBuild.ts";
import type ISqlJoin from "../interface/ISqlJoin.ts";
import type ISqlWhere from "../interface/ISqlWhere.ts";
import ISqlWhereBuilder from "../interface/ISqlWhereBuilder.ts";

/**
 * @todo
 */
export default abstract class SqlDeleteQueryBuilder
  implements
    ISqlBuild,
    ISqlWhere<SqlDeleteQueryBuilder>,
    ISqlBind<SqlDeleteQueryBuilder>,
    ISqlJoin<SqlDeleteQueryBuilder> {
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
  public abstract bind(value: unknown): string;

  /**
   * @todo
   */
  public abstract build(): string;

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
  public abstract join(
    type: Join,
    rightTable: string,
    leftColumn: string,
    rightColumn: string,
  ): SqlDeleteQueryBuilder;
}
