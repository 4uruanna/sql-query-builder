import SqlSelectQueryBuilder from "../abstract/SqlSelectQueryBuilder.ts";
import { type Join, JoinEnumerator } from "../enumerator/Join.ts";
import { type QueryOrder, QueryOrderEnumerator } from "../enumerator/QueryOrder.ts";
import PgSqlWhereBuilder from "./PgSqlWhereBuilder.ts";
import type ISqlWhereBuilder from "../interface/ISqlWhereBuilder.ts";

/**
 * @todo
 */
export default class PgSqlSelectQueryBuilder extends SqlSelectQueryBuilder {

  /**
   * @todo
   */
  private _limit: number | undefined = undefined;

  /**
   * @todo
   */
  private _offset: number | undefined = undefined;

  /**
   * @todo
   */
  private _columns: string = "*";

  /**
   * @todo
   */
  private _orderArray: string[] = [];

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
  public get values() {
    return this._bindValueArray;
  }

  /**
   * @todo
   */
  private get _paging() {
    let paging = "";

    if (this._limit !== undefined) {
      paging = paging.concat(`\r\nLIMIT ${this._limit}`);
    }

    if (this._offset !== undefined) {
      paging = paging.concat(`\r\nOFFSET ${this._offset}`);
    }

    return paging;
  }

  /**
   * @todo
   */
  private get _orderBy() {
    let orderBy = "";

    if (this._orderArray.length) {
      orderBy = `ORDER BY ${this._orderArray.join(", ")}`;
    }

    return orderBy;
  }

  /**
   * @todo
   */
  public override limit(limit: number): SqlSelectQueryBuilder {
    this._limit = limit;
    return this;
  }

  /**
   * @todo
   */
  public override offset(offset: number): SqlSelectQueryBuilder {
    this._offset = offset;
    return this;
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
  public override columns(...columns: string[]): SqlSelectQueryBuilder {
    this._columns = columns.join(", ");
    return this;
  }

  /**
   * @todo
   */
  public override orderBy(
    column: string,
    order: QueryOrder,
  ): SqlSelectQueryBuilder {
    this._orderArray.push(`${column} ${QueryOrderEnumerator[order]}`);
    return this;
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
  ): SqlSelectQueryBuilder {
    this._joins = this._joins.concat(
      `\r\n${
        JoinEnumerator[type]
      } JOIN ${rightTable} ON ${leftColumn} = ${rightColumn}`,
    );
    return this;
  }

  /**
   * @todo
   */
  public override build(): string {
    return `SELECT ${this._columns} FROM ${this._table} ${this._joins}
${this._where} ${this._paging}
${this._orderBy}`;
  }
}
