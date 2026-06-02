import SqlDeleteQueryBuilder from "../abstract/SqlDeleteQueryBuilder.ts";
import { type Join, JoinEnumerator } from "../enumerator/Join.ts";
import PgSqlWhereBuilder from "./PgSqlWhereBuilder.ts";
import type ISqlWhereBuilder from "../interface/ISqlWhereBuilder.ts";

/**
 * @todo
 */
export default class PgSqlDeleteQueryBuilder extends SqlDeleteQueryBuilder {
  /**
   * @todo
   */
  private _bindIndex = 0;

  /**
   * @todo
   */
  private readonly _bindValueArray: unknown[] = [];

  /**
   * @todo
   */
  private _where: string = "";

  /**
   * @todo
   */
  private _joins: string = "";

  /**
   * @todo
   */
  public override get values() {
    return this._bindValueArray;
  }

  /**
   * @todo
   */
  public override bind(value: unknown): string {
    this._bindIndex = this._bindIndex + 1;
    this._bindValueArray.push(value);
    return `$${this._bindIndex}`;
  }

  /**
   * @todo
   */
  public override build(): string {
    return `DELETE FROM ${this._table} ${this._joins}
${this._where}`;
  }

  /**
   * @todo
   */
  public override where(condition: string): ISqlWhereBuilder<this> {
    return new PgSqlWhereBuilder(this, condition);
  }

  /**
   * @todo
   */
  public override setWhere(clause: string): void {
    this._where = clause;
  }

  /**
   * @todo
   */
  public override join(
    type: Join,
    leftColumn: string,
    rightTable: string,
    rightColumn: string,
  ): SqlDeleteQueryBuilder {
    this._joins = this._joins.concat(
      `\r\n${
        JoinEnumerator[type]
      } JOIN ${rightTable} ON ${leftColumn} = ${rightColumn}`,
    );
    return this;
  }
}
