import SqlUpdateQueryBuilder from "../abstract/SqlUpdateQueryBuilder.ts";
import { type Join, JoinEnumerator } from "../enumerator/Join.ts";
import PgSqlWhereBuilder from "./PgSqlWhereBuilder.ts";

/**
 * @todo
 */
export default class PgSqlUpdateQueryBuilder extends SqlUpdateQueryBuilder {
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
  private readonly _setterArray: { column: string; value: unknown }[] = [];

  /**
   * @todo
   */
  private get _sets() {
    return this._setterArray.map(({ column, value }) => {
          return `\n\r\t${column} = ${this.bind(value)}`;
        });
  }

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
  public override where(condition: string): PgSqlWhereBuilder<this> {
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
  ): SqlUpdateQueryBuilder {
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
  public override set(column: string, value: unknown): SqlUpdateQueryBuilder {
    this._setterArray.push({ column, value });
    return this;
  }

  /**
   * @todo
   */
  public override build(): string {
    return `UPDATE ${this._table}
SET ${this._sets}
${this._joins}
${this._where}
    `;
  }
}
